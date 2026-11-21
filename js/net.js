/* Game Night – verbinding tussen TV en telefoons.
   Standaard: PeerJS (WebRTC, gratis, geen eigen server nodig).
   Reserveweg: lukt rechtstreeks niet (gastenwifi, vakantiepark, mobiel netwerk), dan lopen de
   berichten via gratis openbare MQTT-servers over WebSocket. De TV luistert altijd op allebei.
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

  // ---------------- RESERVEWEG (MQTT over WebSocket) ----------------
  const RELAYS = ['wss://mqtt.eclipseprojects.io/mqtt', 'wss://broker.emqx.io:8084/mqtt', 'wss://broker.hivemq.com:8884/mqtt', 'wss://test.mosquitto.org:8081/mqtt'];
  const RTOPIC = (code) => 'gamenight-nl1/' + code.toUpperCase();
  const NO_RELAY = params.get('relay') === '0';
  const ONLY_RELAY = params.get('relay') === '1'; // om de reserveweg te testen
  const relayOK = () => !NO_RELAY && typeof WebSocket !== 'undefined' && typeof TextEncoder !== 'undefined';
  // piepkleine MQTT 3.1.1-client: verbinden, abonneren, publiceren (QoS 0)
  function Mq(url, h) {
    const te = new TextEncoder(), td = new TextDecoder();
    let ws = null, buf = new Uint8Array(0), ready = false, dead = false, pingT = null, pid = 1;
    const str = (x) => { const b = te.encode(x); const o = new Uint8Array(b.length + 2); o[0] = b.length >> 8; o[1] = b.length & 255; o.set(b, 2); return o; };
    const pkt = (head, parts) => {
      let n = 0; parts.forEach((q) => (n += q.length));
      const len = []; let x = n;
      do { let d = x % 128; x = Math.floor(x / 128); if (x > 0) d |= 128; len.push(d); } while (x > 0);
      const o = new Uint8Array(1 + len.length + n); o[0] = head; o.set(len, 1);
      let i = 1 + len.length; parts.forEach((q) => { o.set(q, i); i += q.length; });
      return o;
    };
    const raw = (q) => { try { if (ws && ws.readyState === 1) ws.send(q); } catch (e) {} };
    const kill = () => {
      if (dead) return;
      dead = true; ready = false; clearInterval(pingT); clearTimeout(to);
      try { if (ws) ws.close(); } catch (e) {}
      try { if (h.close) h.close(); } catch (e) {}
    };
    const to = setTimeout(() => { if (!ready) kill(); }, 7000);
    const api = {
      sub: (t) => raw(pkt(0x82, [new Uint8Array([0, (pid++ % 250) + 1]), str(t), new Uint8Array([0])])),
      pub: (t, x) => raw(pkt(0x30, [str(t), te.encode(x)])),
      close: kill, isReady: () => ready, url,
    };
    try { ws = new WebSocket(url, 'mqtt'); } catch (e) { setTimeout(kill, 0); return api; }
    ws.binaryType = 'arraybuffer';
    ws.onopen = () => raw(pkt(0x10, [str('MQTT'), new Uint8Array([4, 2, 0, 30]), str('gn' + Math.random().toString(36).slice(2, 12))]));
    ws.onmessage = (e) => {
      if (dead || typeof e.data === 'string') return;
      const d = new Uint8Array(e.data); const nb = new Uint8Array(buf.length + d.length); nb.set(buf); nb.set(d, buf.length); buf = nb;
      for (;;) {
        if (buf.length < 2) return;
        let mul = 1, len = 0, i = 1, b;
        do { if (i >= buf.length) return; if (i > 4) { kill(); return; } b = buf[i++]; len += (b & 127) * mul; mul *= 128; } while (b & 128);
        if (buf.length < i + len) return;
        const type = buf[0] >> 4, flags = buf[0] & 15, body = buf.slice(i, i + len);
        buf = buf.slice(i + len);
        if (type === 2) {
          if (body[1] === 0) { ready = true; pingT = setInterval(() => raw(new Uint8Array([0xC0, 0])), 20000); try { if (h.open) h.open(); } catch (x) {} }
          else { kill(); return; }
        } else if (type === 3) {
          const tl = (body[0] << 8) | body[1];
          const topic = td.decode(body.subarray(2, 2 + tl));
          let o = 2 + tl; if (flags & 6) o += 2;
          try { if (h.msg) h.msg(topic, td.decode(body.subarray(o))); } catch (x) {}
        }
      }
    };
    ws.onclose = () => kill();
    ws.onerror = () => kill();
    return api;
  }

  // TV-kant: luistert op alle servers tegelijk, elke telefoon wordt een eigen 'verbinding'
  function relayHost(code, on) {
    if (!relayOK()) return { send() {}, drop() {}, has: () => false, destroy() {} };
    const base = RTOPIC(code);
    const vcs = new Map(); // id -> {mq, cid, last}
    let stop = false;
    const close = (id, quiet) => {
      const v = vcs.get(id);
      if (!v) return;
      vcs.delete(id);
      if (!quiet) v.mq.pub(base + '/dn/' + v.cid, '{"t":"_bye"}');
      on.close(id);
    };
    RELAYS.forEach((url, li) => {
      const open = () => {
        if (stop) return;
        const mq = Mq(url, {
          open() { mq.sub(base + '/up/+'); on.up(); },
          msg(topic, txt) {
            const cid = topic.slice(topic.lastIndexOf('/') + 1);
            let m; try { m = JSON.parse(txt); } catch (e) { return; }
            if (!m || typeof m !== 'object' || !cid || cid.length > 16) return;
            const id = 'r' + li + ':' + cid;
            let v = vcs.get(id);
            if (m.t === '_bye') { if (v) close(id, true); return; }
            if (m.t === '_open') {
              if (!v) { if (vcs.size > 40) return; v = { mq, cid, last: Date.now() }; vcs.set(id, v); on.open(id); }
              v.last = Date.now();
              return mq.pub(base + '/dn/' + cid, '{"t":"_ok"}');
            }
            if (!v) return mq.pub(base + '/dn/' + cid, '{"t":"_who"}');
            v.last = Date.now();
            if (m.t === 'ping') return mq.pub(base + '/dn/' + cid, '{"t":"pong"}');
            on.data(id, m);
          },
          close() {
            [...vcs.entries()].forEach(([id, v]) => { if (v.mq === mq) close(id, true); });
            if (!stop) setTimeout(open, 5000);
          },
        });
      };
      open();
    });
    const sweep = setInterval(() => { const now = Date.now(); [...vcs.entries()].forEach(([id, v]) => { if (now - v.last > 16000) close(id); }); }, 4000);
    return {
      has: (id) => vcs.has(id),
      send(id, msg) { const v = vcs.get(id); if (v) v.mq.pub(base + '/dn/' + v.cid, JSON.stringify(msg)); },
      drop(id) { const v = vcs.get(id); if (v) { vcs.delete(id); v.mq.pub(base + '/dn/' + v.cid, '{"t":"_bye"}'); } },
      destroy() { stop = true; clearInterval(sweep); [...new Set([...vcs.values()].map((v) => v.mq))].forEach((m) => m.close()); },
    };
  }

  // telefoonkant: de eerste server waarop de TV antwoordt, wint
  function relayLink(code, on) {
    const cid = Math.random().toString(36).slice(2, 12);
    const base = RTOPIC(code), up = base + '/up/' + cid;
    const mqs = [], order = [];
    let got = false, closed = false, cur = null, tryT = null, last = Date.now();
    const fin = () => {
      if (closed) return;
      closed = true; clearInterval(pingT); clearTimeout(tryT); clearTimeout(giveT);
      setTimeout(() => mqs.forEach((m) => { try { m.close(); } catch (e) {} }), 50);
    };
    const lost = () => { if (closed) return; fin(); on.lost(got); };
    const next = () => {
      clearTimeout(tryT);
      if (closed || got) return;
      const m = order.shift();
      if (!m) { cur = null; return; }
      cur = m; m.sub(base + '/dn/' + cid); m.pub(up, '{"t":"_open"}');
      tryT = setTimeout(() => { if (!got && !closed) next(); }, 3500);
    };
    RELAYS.forEach((url) => {
      const m = Mq(url, {
        open() { if (closed || got) return; order.push(m); if (!cur) next(); },
        msg(topic, txt) {
          if (closed || m !== cur) return;
          let o; try { o = JSON.parse(txt); } catch (e) { return; }
          if (!o) return;
          last = Date.now();
          if (o.t === '_ok') {
            if (!got) { got = true; clearTimeout(tryT); clearTimeout(giveT); mqs.forEach((x) => { if (x !== m) { try { x.close(); } catch (e) {} } }); }
            return on.open();
          }
          if (o.t === 'pong') return;
          if (o.t === '_who') return m.pub(up, '{"t":"_open"}');
          if (o.t === '_bye') return lost();
          if (got) on.data(o);
        },
        close() { if (m === cur && !closed) { if (got) lost(); else next(); } },
      });
      mqs.push(m);
    });
    const giveT = setTimeout(() => { if (!got) lost(); }, 11000);
    const pingT = setInterval(() => {
      if (closed || !got) return;
      cur.pub(up, '{"t":"ping"}');
      if (Date.now() - last > 15000) lost();
    }, 5000);
    return {
      isOpen: () => got && !closed,
      send(msg) { if (got && !closed && cur) { cur.pub(up, JSON.stringify(msg)); return true; } return false; },
      close() { if (got && !closed && cur) { try { cur.pub(up, '{"t":"_bye"}'); } catch (e) {} } fin(); },
    };
  }

  // ---------------- HOST ----------------
  function createHost(code, ev) {
    if (LOCAL) return localHost(code, ev);
    const conns = new Map(); // connId -> {conn, last}
    let peer = null;
    let tries = 0;
    let dead = false;
    let p2pUp = false;
    let relayUp = false;
    // zolang de reserveweg open is, kunnen telefoons erbij: de TV is dan gewoon bereikbaar
    const status = (x) => { if (x === 'online') p2pUp = true; else if (x !== 'waiting-id') p2pUp = false; ev.status(x !== 'online' && x !== 'waiting-id' && x !== 'taken' && relayUp ? 'online' : x); };
    const relay = relayHost(code, {
      up() { relayUp = true; setTimeout(() => { if (!dead && !p2pUp) ev.status('online'); }, 3500); },
      open: (id) => ev.open(id),
      data: (id, m) => ev.data(id, m),
      close: (id) => ev.close(id),
    });

    const start = () => {
      if (ONLY_RELAY) return;
      ensurePeer().then(() => {
        if (dead) return;
        peer = new root.Peer(PREFIX + code.toLowerCase(), { debug: 0 });
        peer.on('open', () => { tries = 0; status('online'); });
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
          status('reconnecting');
          setTimeout(() => { if (!dead && peer && !peer.destroyed) peer.reconnect(); }, 1500);
        });
        peer.on('error', (e) => {
          if (e.type === 'unavailable-id') {
            // de vorige TV-sessie is nog niet vrijgegeven: even wachten
            tries++;
            status(tries > 20 ? 'taken' : 'waiting-id');
            peer.destroy();
            if (tries <= 20) setTimeout(start, 3000);
          } else if (['network', 'server-error', 'socket-error', 'socket-closed'].includes(e.type)) {
            status('reconnecting');
            peer.destroy();
            setTimeout(start, 3000);
          }
        });
      }).catch(() => { status('nolib'); setTimeout(start, 5000); });
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
      send(id, msg) { if (relay.has(id)) return relay.send(id, msg); const c = conns.get(id); if (c && c.conn.open) { try { c.conn.send(msg); } catch (e) {} } },
      drop(id) { if (relay.has(id)) return relay.drop(id); const c = conns.get(id); if (c) { conns.delete(id); try { c.conn.close(); } catch (e) {} } },
      destroy() { dead = true; clearInterval(reaper); relay.destroy(); if (peer) peer.destroy(); },
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
    let useRelay = ONLY_RELAY; // blijft aan zodra de omweg een keer gewerkt heeft
    let link = null;
    let p2pFails = 0;

    const cleanup = () => {
      if (conn) { try { conn.close(); } catch (e) {} conn = null; }
      if (link) { const l = link; link = null; l.close(); }
    };
    const setVia = (on) => { try { document.body.classList.toggle('viarelay', on); } catch (e) {} };
    // rechtstreeks lukt niet: probeer de omweg
    const detour = () => {
      if (dead || !relayOK()) return false;
      if (conn) { const c = conn; conn = null; try { c.close(); } catch (e) {} }
      if (link) { const l = link; link = null; l.close(); }
      connecting = true;
      ev.status('detour');
      const l = (link = relayLink(code, {
        open() { if (link !== l) return; connecting = false; useRelay = true; lastHeard = Date.now(); setVia(true); ev.status('open'); ev.open(); },
        data(d) { if (link === l) ev.data(d); },
        lost(worked) {
          if (link !== l) return;
          link = null; connecting = false;
          if (!worked && !ONLY_RELAY) { useRelay = false; ev.status('nohost'); }
          retry();
        },
      }));
      return true;
    };
    const connect = () => {
      if (dead || connecting) return;
      if (useRelay && detour()) return;
      connecting = true;
      ev.status('connecting');
      ensurePeer().then(() => {
        const go = () => {
          cleanup();
          const c = peer.connect(PREFIX + code.toLowerCase(), { reliable: true });
          conn = c;
          const fail = setTimeout(() => { if (conn === c && !c.open) { connecting = false; if (!detour()) retry(); } }, 5000);
          c.on('open', () => {
            clearTimeout(fail);
            connecting = false;
            p2pFails = 0;
            setVia(false);
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
          if (link) return; // de omweg is al bezig
          connecting = false;
          // TV niet te vinden via PeerJS: misschien kan de TV er zelf niet bij, dus ook de omweg proberen
          if (detour()) return;
          if (e.type === 'peer-unavailable') ev.status('nohost');
          retry();
        });
        peer.on('disconnected', () => { try { peer.reconnect(); } catch (e) {} });
      }).catch(() => { connecting = false; if (detour()) return; ev.status('nolib'); retry(); });
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
        if (Date.now() - lastHeard > 10000) { cleanup(); connecting = false; if (++p2pFails >= 2) useRelay = relayOK(); retry(); }
      }
    }, 3000);
    connect();
    return {
      send(msg) { if (link) return link.send(msg); if (conn && conn.open) { try { conn.send(msg); return true; } catch (e) {} } return false; },
      isOpen() { return link ? link.isOpen() : !!(conn && conn.open); },
      kick() { if (link ? !link.isOpen() && !connecting : !(conn && conn.open)) { connecting = false; connect(); } },
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
