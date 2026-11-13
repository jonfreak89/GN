/* Game Night – de show op de TV: presentator Joep de Maan, bewegende achtergrond en confetti.
   Alles in CSS/SVG/canvas, geen plaatjes om te laden. */
(function () {
  const GN = (window.GN = window.GN || {});
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- Joep de Maan ----------
  const SVG = `<svg viewBox="0 0 200 220" class="joep" aria-hidden="true">
    <defs>
      <radialGradient id="jm" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fff3c4"/><stop offset=".6" stop-color="#ffd46b"/><stop offset="1" stop-color="#f0a83a"/></radialGradient>
    </defs>
    <g class="j-body">
      <circle cx="100" cy="100" r="78" fill="url(#jm)"/>
      <circle cx="58" cy="62" r="9" fill="#f2b44a" opacity=".55"/><circle cx="140" cy="140" r="12" fill="#f2b44a" opacity=".5"/><circle cx="150" cy="78" r="6" fill="#f2b44a" opacity=".5"/><circle cx="66" cy="148" r="5" fill="#f2b44a" opacity=".5"/>
      <ellipse cx="60" cy="118" rx="11" ry="7" fill="#ff7aa8" opacity=".55"/><ellipse cx="140" cy="118" rx="11" ry="7" fill="#ff7aa8" opacity=".55"/>
      <g class="j-brows"><path d="M62 72 q12 -9 24 0" stroke="#5a3410" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M114 72 q12 -9 24 0" stroke="#5a3410" stroke-width="5" fill="none" stroke-linecap="round"/></g>
      <g class="j-eyes">
        <g class="j-eye"><ellipse cx="74" cy="94" rx="12" ry="14" fill="#fff"/><circle class="j-pupil" cx="76" cy="96" r="7" fill="#2a1a3a"/><circle cx="79" cy="92" r="2.5" fill="#fff"/></g>
        <g class="j-eye"><ellipse cx="126" cy="94" rx="12" ry="14" fill="#fff"/><circle class="j-pupil" cx="128" cy="96" r="7" fill="#2a1a3a"/><circle cx="131" cy="92" r="2.5" fill="#fff"/></g>
      </g>
      <g class="j-mouth">
        <path class="m-smile" d="M78 128 q22 22 44 0" stroke="#5a3410" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path class="m-open" d="M80 126 q20 30 40 0 z" fill="#5a1a2a" stroke="#5a3410" stroke-width="4" stroke-linejoin="round"/>
        <ellipse class="m-o" cx="100" cy="134" rx="9" ry="12" fill="#5a1a2a" stroke="#5a3410" stroke-width="4"/>
        <path class="m-sad" d="M80 140 q20 -16 40 0" stroke="#5a3410" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>
      <g class="j-tie"><path d="M100 176 l-22 -12 v24 z M100 176 l22 -12 v24 z" fill="#ff4f8b"/><circle cx="100" cy="176" r="6" fill="#d93a72"/></g>
    </g>
    <g class="j-hand"><rect x="150" y="150" width="12" height="34" rx="5" fill="#444" transform="rotate(-20 156 167)"/><circle cx="162" cy="146" r="12" fill="#666"/><circle cx="152" cy="176" r="10" fill="#ffd46b" stroke="#f0a83a" stroke-width="2"/></g>
    <g class="j-hat"><path d="M100 4 l-26 44 h52 z" fill="#4cc9f0"/><circle cx="100" cy="6" r="7" fill="#ffb627"/><path d="M80 38 l40 0" stroke="#ff4f8b" stroke-width="5"/></g>
  </svg>`;

  let root = null;
  let bubble = null;
  let hideT = null;
  let talkT = null;
  const queue = [];
  let busy = false;

  function mount(parent) {
    if (root) return;
    root = document.createElement('div');
    root.id = 'joep';
    root.innerHTML = `${SVG}<div class="bubble hidden"><b>Joep</b><span></span></div>`;
    parent.appendChild(root);
    bubble = root.querySelector('.bubble');
    // af en toe knipperen
    if (!reduce) setInterval(() => { root.classList.add('blink'); setTimeout(() => root.classList.remove('blink'), 160); }, 4200);
  }
  function setFace(face) {
    if (!root) return;
    root.dataset.face = face || 'smile';
  }
  // praat: tekst in een ballon, mond beweegt, gezicht kiezen
  function say(text, face = 'happy', ms) {
    if (!root || !text) return;
    queue.length = 0; // nieuwste zin wint, geen achterstand opbouwen
    queue.push({ text, face, ms });
    if (!busy) next();
  }
  function next() {
    const it = queue.shift();
    if (!it) { busy = false; return; }
    busy = true;
    clearTimeout(hideT);
    clearTimeout(talkT);
    bubble.querySelector('span').innerHTML = esc(it.text);
    bubble.classList.remove('hidden');
    bubble.classList.remove('in');
    void bubble.offsetWidth;
    bubble.classList.add('in');
    setFace(it.face);
    root.classList.add('talk');
    const ms = it.ms || Math.min(7000, 2600 + it.text.length * 45);
    talkT = setTimeout(() => root.classList.remove('talk'), Math.min(ms - 600, 900 + it.text.length * 40));
    hideT = setTimeout(() => {
      bubble.classList.add('hidden');
      setFace('smile');
      busy = false;
      if (queue.length) next();
    }, ms);
  }
  function hush() {
    queue.length = 0;
    clearTimeout(hideT);
    clearTimeout(talkT);
    if (bubble) bubble.classList.add('hidden');
    if (root) root.classList.remove('talk');
    busy = false;
  }

  // ---------- achtergrond ----------
  // kleuren per ronde (drie vlekken)
  const PAL = {
    lobby: ['#ff4f8b', '#9b7bff', '#4cc9f0'],
    mc: ['#ff4f8b', '#9b7bff', '#4cc9f0'], tf: ['#4cc9f0', '#3ddc97', '#9b7bff'], num: ['#ffb627', '#ff4f8b', '#9b7bff'],
    hl: ['#3ddc97', '#4cc9f0', '#ffb627'], lingo: ['#3ddc97', '#ffb627', '#4cc9f0'], bluff: ['#9b7bff', '#ff4f8b', '#ff5d5d'],
    echt: ['#ffb627', '#9b7bff', '#4cc9f0'], order: ['#4cc9f0', '#ffb627', '#ff4f8b'], puzzel: ['#4cc9f0', '#9b7bff', '#3ddc97'],
    invul: ['#ffb627', '#ff4f8b', '#3ddc97'], teken: ['#ff4f8b', '#ffb627', '#4cc9f0'], persoonlijk: ['#ff4f8b', '#ff5d5d', '#9b7bff'],
    top5: ['#ffb627', '#3ddc97', '#ff4f8b'], leugen: ['#9b7bff', '#ff5d5d', '#ffb627'], ketting: ['#ffb627', '#4cc9f0', '#9b7bff'],
    wiezei: ['#9b7bff', '#3ddc97', '#ff4f8b'], final: ['#ffb627', '#ffd46b', '#ff4f8b'], end: ['#ffb627', '#ff4f8b', '#3ddc97'],
  };
  let bg = null;
  function mountBg(parent) {
    if (bg) return;
    bg = document.createElement('div');
    bg.id = 'bg';
    bg.innerHTML = '<i></i><i></i><i></i><b></b>';
    parent.insertBefore(bg, parent.firstChild);
    setBg('lobby');
  }
  function setBg(key, intensity) {
    if (!bg) return;
    const p = PAL[key] || PAL.lobby;
    p.forEach((c, i) => bg.style.setProperty('--b' + (i + 1), c));
    bg.dataset.k = key;
    bg.classList.toggle('hot', !!intensity);
  }

  // ---------- confetti ----------
  let cv = null;
  let parts = [];
  let raf = null;
  const COLORS = ['#ff4f8b', '#ffb627', '#3ddc97', '#4cc9f0', '#9b7bff', '#fff8ec'];
  function confetti(amount = 120, opts = {}) {
    if (reduce) return;
    if (!cv) {
      cv = document.createElement('canvas');
      cv.id = 'confetti';
      document.body.appendChild(cv);
    }
    const W = (cv.width = innerWidth), H = (cv.height = innerHeight);
    const ox = opts.x != null ? opts.x * W : W / 2;
    for (let i = 0; i < amount; i++) {
      const a = (-Math.PI / 2) + (Math.random() - 0.5) * 1.6;
      const sp = (opts.power || 1) * (H / 70) * (0.6 + Math.random() * 0.8);
      parts.push({ x: ox + (Math.random() - 0.5) * W * 0.2, y: H * (opts.y != null ? opts.y : 0.85), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, s: 6 + Math.random() * 8, c: COLORS[i % COLORS.length], life: 0 });
    }
    if (parts.length > 400) parts = parts.slice(-400);
    if (!raf) raf = requestAnimationFrame(tickConfetti);
  }
  function tickConfetti() {
    const g = cv.getContext('2d');
    g.clearRect(0, 0, cv.width, cv.height);
    const H = cv.height;
    parts = parts.filter((p) => p.y < H + 30 && p.life < 260);
    parts.forEach((p) => {
      p.life++;
      p.vy += H / 3000;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.r);
      g.fillStyle = p.c;
      g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2 * (0.4 + Math.abs(Math.sin(p.life / 6))));
      g.restore();
    });
    if (parts.length) raf = requestAnimationFrame(tickConfetti);
    else { raf = null; g.clearRect(0, 0, cv.width, cv.height); }
  }

  GN.Show = { mount, say, hush, setFace, mountBg, setBg, confetti, reduce };
})();
