/* Game Night – verbinding tussen TV en telefoons.
   Standaard: PeerJS (WebRTC, gratis, geen eigen server nodig).
   Met ?local=1: BroadcastChannel, om alles in één browser te testen. */
(function (root) {
  const GN = (root.GN = root.GN || {});
  const PREFIX = 'gamenight-nl-v1-';
  const PEER_SRC = [
    'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js',
    'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js',
  ];

  const params = new URLSearchParams(root.location ? root.location.search : '');
  const LOCAL = params.get('local') === '1';

  function loadScript(urls) {
    return new Promise((resolve, reject) => {
      const tryOne = (i) => {
        if (i >= urls.length) return reject(new Error('script laden mislukt'));
        const s = document.createElement('script');
        s.src = urls[i];
        s.onload = () => resolve();
        s.onerror = () => { s.remove(); tryOne(i + 1); };
        document.head.appendChild(s);
      };
      tryOne(0);
    });
  }
  let peerLib = null;
  function ensurePeer() {
    if (root.Peer) return Promise.resolve();
    if (!peerLib) peerLib = loadScript(PEER_SRC);
    return peerLib;
  }

  // ---------------- HOST ----------------
  function createHost(code, ev) {
    if (LOCAL) return localHost(code, ev);
    const conns = new Map(); // connId -> {conn, last}
    let peer = null;
    let tries = 0;
    let dead = false;

    const start = () => {
      ensurePeer().then(() => {
        if (dead) return;
        peer = new root.Peer(PREFIX + code.toLowerCase(), { debug: 0 });
        peer.on('open', () => { tries = 0; ev.status('online'); });
        peer.on('connection', (conn) => {
          conn.on('open', () => {
            conns.set(conn.connectionId, { conn, last: Date.now() });
            ev.open(conn.connectionId);
          });
          conn.on('data', (d) => {
            const c = conns.get(conn.connectionId);
            if (c) c.last = Date.now();
            if (d && d.t === 'ping') { try { conn.send({ t: 'pong' }); } catch (e) {} return; }
            ev.data(conn.connectionId, d);
          });
          const gone = () => {
            if (!conns.has(conn.connectionId)) return;
            conns.delete(conn.connectionId);
            ev.close(conn.connectionId);
          };
          conn.on('close', gone);
          conn.on('error', gone);
        });
        peer.on('disconnected', () => {
          ev.status('reconnecting');
          setTimeout(() => { if (!dead && peer && !peer.destroyed) peer.reconnect(); }, 1500);
        });
        peer.on('error', (e) => {
          if (e.type === 'unavailable-id') {
            // de vorige TV-sessie is nog niet vrijgegeven: even wachten
            tries++;
            ev.status(tries > 20 ? 'taken' : 'waiting-id');
            peer.destroy();
            if (tries <= 20) setTimeout(start, 3000);
          } else if (['network', 'server-error', 'socket-error', 'socket-closed'].includes(e.type)) {
            ev.status('reconnecting');
            peer.destroy();
            setTimeout(start, 3000);
          }
        });
      }).catch(() => { ev.status('nolib'); setTimeout(start, 5000); });
    };
    start();

    // telefoons die niks meer laten horen, afsluiten
    const reaper = setInterval(() => {
      const now = Date.now();
      conns.forEach((c, id) => {
        if (now - c.last > 12000) {
          conns.delete(id);
          try { c.conn.close(); } catch (e) {}
          ev.close(id);
        }
      });
    }, 3000);

    return {
      send(id, msg) { const c = conns.get(id); if (c && c.conn.open) { try { c.conn.send(msg); } catch (e) {} } },
      drop(id) { const c = conns.get(id); if (c) { conns.delete(id); try { c.conn.close(); } catch (e) {} } },
      destroy() { dead = true; clearInterval(reaper); if (peer) peer.destroy(); },
    };
  }

  // ---------------- CLIENT ----------------
  function createClient(code, ev) {
    if (LOCAL) return localClient(code, ev);
    let peer = null;
    let conn = null;
    let lastHeard = 0;
    let timer = null;
    let connecting = false;
    let dead = false;

    const cleanup = () => {
      if (conn) { try { conn.close(); } catch (e) {} conn = null; }
    };
    const connect = () => {
      if (dead || connecting) return;
      connecting = true;
      ev.status('connecting');
      ensurePeer().then(() => {
        const go = () => {
          cleanup();
          const c = peer.connect(PREFIX + code.toLowerCase(), { reliable: true });
          conn = c;
          const fail = setTimeout(() => { if (conn === c && !c.open) { connecting = false; retry(); } }, 8000);
          c.on('open', () => {
            clearTimeout(fail);
            connecting = false;
            lastHeard = Date.now();
            ev.status('open');
            ev.open();
          });
          c.on('data', (d) => {
            lastHeard = Date.now();
            if (d && d.t === 'pong') return;
            ev.data(d);
          });
          c.on('close', () => { if (conn === c) { conn = null; connecting = false; retry(); } });
          c.on('error', () => { if (conn === c) { conn = null; connecting = false; retry(); } });
        };
        if (peer && !peer.destroyed && peer.open) return go();
        if (peer) { try { peer.destroy(); } catch (e) {} }
        peer = new root.Peer({ debug: 0 });
        peer.on('open', go);
        peer.on('error', (e) => {
          connecting = false;
          if (e.type === 'peer-unavailable') ev.status('nohost');
          retry();
        });
        peer.on('disconnected', () => { try { peer.reconnect(); } catch (e) {} });
      }).catch(() => { connecting = false; ev.status('nolib'); retry(); });
    };
    let retryT = null;
    const retry = () => {
      if (dead || retryT) return;
      ev.status('lost');
      retryT = setTimeout(() => { retryT = null; connect(); }, 2000);
    };
    // hartslag
    timer = setInterval(() => {
      if (conn && conn.open) {
        try { conn.send({ t: 'ping' }); } catch (e) {}
        if (Date.now() - lastHeard > 10000) { cleanup(); connecting = false; retry(); }
      }
    }, 3000);
    connect();
    return {
      send(msg) { if (conn && conn.open) { try { conn.send(msg); return true; } catch (e) {} } return false; },
      isOpen() { return !!(conn && conn.open); },
      kick() { if (!(conn && conn.open)) { connecting = false; connect(); } },
      destroy() { dead = true; clearInterval(timer); cleanup(); if (peer) peer.destroy(); },
    };
  }

  // ---------------- LOKAAL (testen) ----------------
  function localHost(code, ev) {
    const bc = new BroadcastChannel('gn-' + code);
    const conns = new Set();
    bc.onmessage = (e) => {
      const m = e.data;
      if (m.to !== 'host') return;
      if (m.type === 'open') { conns.add(m.from); bc.postMessage({ to: m.from, type: 'welcome' }); ev.open(m.from); }
      else if (m.type === 'data') { if (!conns.has(m.from)) return; if (m.data && m.data.t === 'ping') return bc.postMessage({ to: m.from, type: 'data', data: { t: 'pong' } }); ev.data(m.from, m.data); }
      else if (m.type === 'close') { if (conns.delete(m.from)) ev.close(m.from); }
    };
    setTimeout(() => ev.status('online'), 50);
    bc.postMessage({ to: '*', type: 'hostup' });
    return {
      send(id, msg) { bc.postMessage({ to: id, type: 'data', data: msg }); },
      drop(id) { conns.delete(id); bc.postMessage({ to: id, type: 'kick' }); },
      destroy() { bc.close(); },
    };
  }
  function localClient(code, ev) {
    const bc = new BroadcastChannel('gn-' + code);
    const me = 'c' + Math.random().toString(36).slice(2);
    let open = false;
    bc.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'hostup') { open = false; return hello(); }
      if (m.to !== me) return;
      if (m.type === 'welcome') { open = true; ev.status('open'); ev.open(); }
      else if (m.type === 'data') { if (m.data && m.data.t === 'pong') return; ev.data(m.data); }
    };
    const hello = () => { ev.status('connecting'); bc.postMessage({ to: 'host', from: me, type: 'open' }); };
    addEventListener('beforeunload', () => bc.postMessage({ to: 'host', from: me, type: 'close' }));
    hello();
    const iv = setInterval(() => { if (!open) hello(); }, 2000);
    return {
      send(msg) { bc.postMessage({ to: 'host', from: me, type: 'data', data: msg }); return true; },
      isOpen() { return open; },
      kick() { if (!open) hello(); },
      destroy() { clearInterval(iv); bc.close(); },
    };
  }

  GN.Net = { createHost, createClient, LOCAL };
})(typeof window !== 'undefined' ? window : globalThis);
