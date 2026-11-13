/* Game Night – geluid. Alles wordt in de browser opgewekt (Web Audio): niets te downloaden.
   GN.Sound.mood('lobby' | 'think' | 'reveal' | 'party' | 'calm' | 'off')
   GN.Sound.sfx('tick' | 'whoosh' | 'pop' | 'drumroll' | 'ding' | 'aww' | 'fanfare' | 'applause' | 'cash' | 'swoosh' | 'boing' | 'dice') */
(function () {
  const GN = (window.GN = window.GN || {});
  const AC = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let master, musicBus, sfxBus, noiseBuf;
  let musicOn = true;
  let sfxOn = true;
  let theme = '';
  let unlocked = false;
  const listeners = [];

  function init() {
    if (ctx || !AC) return;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(comp).connect(ctx.destination);
    musicBus = ctx.createGain();
    musicBus.gain.value = 0;
    musicBus.connect(master);
    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.8;
    sfxBus.connect(master);
    // witte ruis, 2 seconden, hergebruikt voor drums en effecten
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  function unlock() {
    init();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (!unlocked) {
      unlocked = true;
      listeners.forEach((f) => f());
      applyMusicLevel();
      startScheduler();
    }
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach((e) => window.addEventListener(e, unlock, { passive: true }));

  // ---------- bouwstenen ----------
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  function env(g, t, a, peak, dec, sus = 0) {
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, sus || 0.0001), t + a + dec);
  }
  function tone(bus, { t, f, type = 'sine', a = 0.005, peak = 0.3, dec = 0.3, f2 = null, cut = null, q = 0.7, detune = 0 }) {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + a + dec);
    if (detune) o.detune.value = detune;
    const g = ctx.createGain();
    let node = o;
    if (cut) {
      const fl = ctx.createBiquadFilter();
      fl.type = 'lowpass';
      fl.frequency.value = cut;
      fl.Q.value = q;
      node.connect(fl);
      node = fl;
    }
    node.connect(g).connect(bus);
    env(g, t, a, peak, dec);
    o.start(t);
    o.stop(t + a + dec + 0.05);
  }
  function noise(bus, { t, dur = 0.1, peak = 0.3, type = 'highpass', f = 6000, q = 0.7, a = 0.002, f2 = null }) {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf;
    const fl = ctx.createBiquadFilter();
    fl.type = type;
    fl.frequency.setValueAtTime(f, t);
    if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur);
    fl.Q.value = q;
    const g = ctx.createGain();
    s.connect(fl).connect(g).connect(bus);
    env(g, t, a, peak, dur);
    s.start(t, Math.random() * 1.5);
    s.stop(t + a + dur + 0.05);
  }

  // ---------- muziek ----------
  // Elke stemming: tempo, akkoorden (midi-grondtoon + intervallen), drumpatroon, volume
  const MAJ7 = [0, 4, 7, 11], MIN7 = [0, 3, 7, 10], DOM7 = [0, 4, 7, 10], MAJ = [0, 4, 7, 12], MIN = [0, 3, 7, 12];
  const MOODS = {
    lobby: { bpm: 96, vol: 0.32, chords: [[60, MAJ7], [57, MIN7], [62, MIN7], [55, DOM7]], drums: 'lounge', bass: 'walk', keys: 'comp' },
    think: { bpm: 84, vol: 0.18, chords: [[57, MIN], [57, MIN], [53, MAJ], [55, MAJ]], drums: 'tick', bass: 'pulse', keys: 'pad' },
    calm: { bpm: 80, vol: 0.16, chords: [[60, MAJ7], [65, MAJ7]], drums: 'none', bass: 'long', keys: 'pad' },
    reveal: { bpm: 112, vol: 0.26, chords: [[60, MAJ], [55, MAJ], [57, MIN], [53, MAJ]], drums: 'pop', bass: 'eighth', keys: 'stab' },
    party: { bpm: 122, vol: 0.32, chords: [[60, MAJ], [65, MAJ], [57, MIN], [55, DOM7]], drums: 'disco', bass: 'octave', keys: 'stab' },
    off: null,
  };
  let mood = 'off';
  let nextMood = 'off';
  let step = 0; // zestienden
  let nextT = 0;
  let timer = null;
  let duck = 1;

  function keysType() { return theme === 'nerd' ? 'square' : theme === 'retro' ? 'sawtooth' : 'triangle'; }
  function applyMusicLevel() {
    if (!ctx) return;
    const m = MOODS[mood];
    const target = musicOn && m ? m.vol * duck : 0;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setTargetAtTime(target, ctx.currentTime, 0.4);
  }
  function startScheduler() {
    if (timer || !ctx) return;
    nextT = ctx.currentTime + 0.1;
    timer = setInterval(schedule, 60);
  }
  function schedule() {
    if (!ctx || ctx.state !== 'running') return;
    // muziek ducken als de TV voorleest
    const speaking = 'speechSynthesis' in window && speechSynthesis.speaking;
    const want = speaking ? 0.35 : 1;
    if (want !== duck) { duck = want; applyMusicLevel(); }
    while (nextT < ctx.currentTime + 0.25) {
      if (step % 16 === 0 && nextMood !== mood) { mood = nextMood; applyMusicLevel(); }
      const m = MOODS[mood];
      const sixteenth = 60 / (m ? m.bpm : 100) / 4;
      if (m && musicOn) playStep(m, step, nextT, sixteenth);
      nextT += sixteenth;
      step = (step + 1) % 64;
    }
  }
  function playStep(m, s, t, six) {
    const bar = Math.floor(s / 16) % m.chords.length;
    const [root, iv] = m.chords[bar];
    const b = s % 16;
    const swing = m.drums === 'lounge' && b % 2 ? six * 0.28 : 0;
    t += swing;
    // drums
    const kick = () => tone(musicBus, { t, f: 120, f2: 42, type: 'sine', a: 0.002, peak: 0.55, dec: 0.22 });
    const snare = (p = 0.12) => noise(musicBus, { t, dur: 0.12, peak: p, type: 'bandpass', f: 1800, q: 0.8 });
    const hat = (p = 0.05, d = 0.03) => noise(musicBus, { t, dur: d, peak: p, type: 'highpass', f: 8000 });
    switch (m.drums) {
      case 'lounge': if (b === 0 || b === 10) kick(); if (b === 4 || b === 12) snare(0.06); if (b % 2 === 0) hat(0.035, 0.05); break;
      case 'tick': if (b % 4 === 0) hat(0.03, 0.02); if (b === 0) kick(); break;
      case 'pop': if (b % 8 === 0) kick(); if (b === 4 || b === 12) snare(0.1); if (b % 2 === 0) hat(0.04); break;
      case 'disco': if (b % 4 === 0) kick(); if (b === 4 || b === 12) snare(0.12); if (b % 4 === 2) hat(0.07, 0.08); break;
    }
    // bas
    const bf = mtof(root - 24);
    const bass = (f, d = six * 1.8) => tone(musicBus, { t, f, type: 'triangle', a: 0.01, peak: 0.32, dec: d, cut: 900 });
    switch (m.bass) {
      case 'walk': if (b % 4 === 0) bass(mtof(root - 24 + [0, iv[1], iv[2], iv[1]][b / 4]), six * 3.5); break;
      case 'pulse': if (b % 4 === 0) bass(bf, six * 2.5); break;
      case 'long': if (b === 0) bass(bf, six * 14); break;
      case 'eighth': if (b % 2 === 0) bass(bf); break;
      case 'octave': if (b % 2 === 0) bass(b % 4 === 0 ? bf : bf * 2); break;
    }
    // akkoorden
    const chord = (peak, dec, type = keysType(), cut = 2200) => iv.forEach((x, i) => tone(musicBus, { t: t + i * 0.008, f: mtof(root + x), type, a: 0.01, peak, dec, cut, detune: i % 2 ? 4 : -4 }));
    switch (m.keys) {
      case 'comp': if (b === 0 || b === 6 || b === 10) chord(0.05, six * 3, keysType(), 2400); break;
      case 'pad': if (b === 0) chord(0.04, six * 15, 'sine', 1400); break;
      case 'stab': if (b === 2 || b === 6 || b === 10 || b === 14) chord(0.045, six * 1.5); break;
    }
    // klein melodietje in de lobby en op feestjes
    if ((mood === 'lobby' || mood === 'party') && (s % 64 === 48 || s % 64 === 52 || s % 64 === 56)) {
      const n = [12, 14, 16, 19][Math.floor(Math.random() * 4)];
      tone(musicBus, { t, f: mtof(root + n), type: theme === 'nerd' ? 'square' : 'sine', a: 0.01, peak: 0.06, dec: six * 2.5, cut: 3000 });
    }
  }

  // ---------- effecten ----------
  const SFX = {
    tick(t) { tone(sfxBus, { t, f: 1500, type: 'sine', a: 0.001, peak: 0.25, dec: 0.05 }); },
    tock(t) { tone(sfxBus, { t, f: 900, type: 'sine', a: 0.001, peak: 0.3, dec: 0.08 }); },
    whoosh(t) { noise(sfxBus, { t, dur: 0.45, peak: 0.22, type: 'bandpass', f: 400, f2: 4000, q: 1.2, a: 0.08 }); },
    swoosh(t) { noise(sfxBus, { t, dur: 0.35, peak: 0.18, type: 'bandpass', f: 3000, f2: 600, q: 1.5, a: 0.05 }); },
    pop(t, n = 0) { tone(sfxBus, { t, f: 520 * Math.pow(1.06, n % 12), f2: 900 * Math.pow(1.06, n % 12), type: 'sine', a: 0.003, peak: 0.28, dec: 0.12 }); },
    boing(t) { tone(sfxBus, { t, f: 180, f2: 520, type: 'triangle', a: 0.01, peak: 0.3, dec: 0.35 }); },
    dice(t) { for (let i = 0; i < 5; i++) noise(sfxBus, { t: t + i * 0.06 + Math.random() * 0.02, dur: 0.03, peak: 0.25, type: 'bandpass', f: 2500 + Math.random() * 2000, q: 3 }); },
    drumroll(t, dur = 1.3) {
      const n = Math.floor(dur * 22);
      for (let i = 0; i < n; i++) noise(sfxBus, { t: t + i / 22, dur: 0.06, peak: 0.05 + (0.18 * i) / n, type: 'bandpass', f: 1200, q: 0.9 });
    },
    crash(t) { noise(sfxBus, { t, dur: 1.4, peak: 0.25, type: 'highpass', f: 5000, a: 0.002 }); tone(sfxBus, { t, f: 90, f2: 40, a: 0.002, peak: 0.5, dec: 0.3 }); },
    ding(t) {
      [76, 81, 88].forEach((m, i) => tone(sfxBus, { t: t + i * 0.09, f: mtof(m), type: 'sine', a: 0.004, peak: 0.25, dec: 0.7 }));
      [76, 81, 88].forEach((m, i) => tone(sfxBus, { t: t + i * 0.09, f: mtof(m) * 2, type: 'sine', a: 0.004, peak: 0.06, dec: 0.4 }));
    },
    aww(t) { [0, 0.3, 0.6].forEach((d, i) => tone(sfxBus, { t: t + d, f: mtof(58 - i), f2: mtof(i === 2 ? 50 : 57 - i), type: 'sawtooth', a: 0.02, peak: 0.12, dec: i === 2 ? 0.9 : 0.28, cut: 1100 })); },
    buzz(t) { tone(sfxBus, { t, f: 110, type: 'sawtooth', a: 0.01, peak: 0.18, dec: 0.4, cut: 900 }); },
    fanfare(t) {
      const seq = [[60, 0, 0.18], [64, 0.15, 0.18], [67, 0.3, 0.18], [72, 0.45, 0.9]];
      seq.forEach(([m, d, l]) => { tone(sfxBus, { t: t + d, f: mtof(m), type: 'sawtooth', a: 0.02, peak: 0.13, dec: l, cut: 2600 }); tone(sfxBus, { t: t + d, f: mtof(m - 12), type: 'square', a: 0.02, peak: 0.06, dec: l, cut: 1500 }); });
      SFX.crash(t + 0.45);
    },
    applause(t, dur = 2.4) {
      for (let i = 0; i < dur * 30; i++) noise(sfxBus, { t: t + Math.random() * dur, dur: 0.04 + Math.random() * 0.05, peak: 0.05 + Math.random() * 0.06, type: 'bandpass', f: 1500 + Math.random() * 2500, q: 1.5 });
    },
    cash(t) { [0, 0.07, 0.14].forEach((d, i) => tone(sfxBus, { t: t + d, f: mtof(88 + i * 3), type: 'square', a: 0.002, peak: 0.07, dec: 0.18, cut: 6000 })); },
  };

  GN.Sound = {
    get ready() { return unlocked; },
    supported: !!AC,
    onUnlock(f) { listeners.push(f); if (unlocked) f(); },
    unlock,
    setEnabled(music, fx) {
      musicOn = !!music;
      sfxOn = !!fx;
      applyMusicLevel();
    },
    setTheme(t) { theme = t || ''; },
    mood(m) {
      if (!MOODS.hasOwnProperty(m)) return;
      nextMood = m;
      // vanuit stilte of naar stilte meteen wisselen, anders op de maat
      if (mood === 'off' || m === 'off') { mood = m; step = 0; applyMusicLevel(); }
    },
    sfx(name, delay = 0, arg) {
      if (!sfxOn || !unlocked || !ctx || !SFX[name]) return;
      try { SFX[name](ctx.currentTime + 0.02 + delay, arg); } catch (e) {}
    },
  };
})();
