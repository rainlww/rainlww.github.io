/* 院长的棋局 — table UI, dialogue, and the three ways to sit down. */
(function () {
  'use strict';

  const C = window.Chess;
  const T = window.TABLE;
  const $ = (id) => document.getElementById(id);

  const G = {
    mode: 'narrative',
    charId: 'ispera',
    state: null,
    legal: [],
    selected: null,
    lastMove: null,
    busy: false,
    over: false,
    history: [],      // { before, move, by }
    plies: [],
    moveNo: 0,
    flags: { playerCapture: false, deanCapture: false, firstCheck: false, deanCheck: false, castle: false, promo: false },
    abilityUses: 0,
    difficulty: 'normal',
    hints: 3,
    hintSquares: [],
    hintTimer: null,
    armed: false,
    filePreview: false,
    previewMove: null,
    read: false,
    turnStart: 0,
    startedAt: 0,
    captures: { w: 0, b: 0 },
    sound: true,
    modeLocked: false,
    dlg: [],
    transcript: [],
    lastLine: null,
    dlgActive: false,
    dlgTimer: null,
    clockEnabled: false,
    playerMs: 600000,
    deanMs: 600000,
    clockTimer: null,
    endTimer: null,
    pendingEnd: null,
    review: { active: false, index: 0, states: [], liveState: null, liveLastMove: null, liveLegal: null, fromEnd: false },
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const DIFF_LABEL = { gentle: '陪你走', normal: '认真', hard: '不留情' };

  let audioCtx = null;

  init();

  function init() {
    window.__ERRORS__ = [];
    window.addEventListener('error', (e) => {
      window.__ERRORS__.push((e.message || 'error') + ' @' + (e.lineno || '?') + ':' + (e.colno || '?'));
    });
    buildSeats();
    bindIntro();
    bindGame();
    bindDifficulty();
    loadDifficulty();
    window.addEventListener('resize', sizeBoard);
    document.addEventListener('pointerdown', initAudio, { once: true });

    const params = new URLSearchParams(location.search);
    if (params.get('autostart') === '1') {
      const mode = params.get('mode');
      const char = params.get('char');
      if (mode && T.MODES[mode]) G.mode = mode;
      if (char && T.CHARACTERS[char]) G.charId = char;
      document.querySelectorAll('.mode-card').forEach((c) => {
        const on = c.dataset.mode === G.mode;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      document.querySelectorAll('.seat').forEach((el) => {
        const on = el.dataset.char === G.charId;
        el.classList.toggle('is-on', on);
        el.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      if (G.mode === 'serious') $('serious-options').classList.remove('hidden');
      setTimeout(startGame, 30);
      if (params.get('demo') === '1') setTimeout(runDemo, 500);
      if (params.get('demo') === 'select') setTimeout(() => onSquareClick(52), 900);
      if (params.get('demo') === 'check') setTimeout(setupCheckDemo, 700);
      if (params.get('demo') === 'capture') setTimeout(setupCaptureDemo, 400);
      if (params.get('demo') === 'chat') setTimeout(() => { const b = $('chat-btn'); if (b) b.click(); }, 1500);
      if (params.get('demo') === 'hint') setTimeout(() => { const b = $('hint-btn'); if (b) b.click(); }, 1200);
      if (params.get('demo') === 'review') setTimeout(async () => {
        await runDemo();
        await waitFor(() => !G.busy, 8000).catch(() => {});
        const b = $('log-btn');
        if (b) b.click();
        const spans = document.querySelectorAll('#move-log [data-ply]');
        if (spans[3]) spans[3].click();
      }, 500);
      if (params.get('demo') === 'end') setTimeout(() => finish({ result: 'white', reason: 'collect' }), 1500);
      if (params.get('demo') === 'endcard') {
        setTimeout(() => {
          finish({ result: 'white', reason: 'collect' });
          const tryClick = () => {
            const btn = $('continue-btn');
            if (btn && !btn.classList.contains('hidden')) btn.click();
            else setTimeout(tryClick, 400);
          };
          setTimeout(tryClick, 4000);
        }, 1200);
      }
    }
    if (new URLSearchParams(location.search).get('selftest') === '1') {
      runSelftest();
    }
  }

  /* ---------------- intro ---------------- */

  function buildSeats() {
    const row = $('seat-row');
    row.innerHTML = '';
    Object.values(T.CHARACTERS).forEach((ch) => {
      const b = document.createElement('button');
      b.className = 'seat' + (ch.id === G.charId ? ' is-on' : '');
      b.dataset.char = ch.id;
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', ch.id === G.charId ? 'true' : 'false');
      b.innerHTML = '<img src="' + ch.img + '" alt="" /><span class="seat-name">' + ch.name + '</span>';
      b.addEventListener('click', () => selectChar(ch.id));
      row.appendChild(b);
    });
  }

  function selectChar(id) {
    if (G.modeLocked) return;
    G.charId = id;
    document.querySelectorAll('.seat').forEach((el) => {
      const on = el.dataset.char === id;
      el.classList.toggle('is-on', on);
      el.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  function bindIntro() {
    document.querySelectorAll('.mode-card').forEach((card) => {
      card.addEventListener('click', () => {
        if (G.modeLocked) return;
        G.mode = card.dataset.mode;
        document.querySelectorAll('.mode-card').forEach((c) => {
          const on = c === card;
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-checked', on ? 'true' : 'false');
        });
        $('serious-options').classList.toggle('hidden', G.mode !== 'serious');
      });
    });

    $('sit-btn').addEventListener('click', startGame);
  }

  /* ---------------- game start ---------------- */

  function startGame() {
    const ch = T.CHARACTERS[G.charId];
    G.modeLocked = true;
    G.state = C.initialState();
    G.legal = C.legalMoves(G.state);
    G.selected = null;
    G.lastMove = null;
    G.busy = false;
    G.over = false;
    G.history = [];
    G.plies = [];
    G.moveNo = 0;
    G.flags = { playerCapture: false, deanCapture: false, firstCheck: false, deanCheck: false, castle: false, promo: false };
    G.abilityUses = ch.ability.max;
    G.hints = 3;
    G.hintSquares = [];
    clearTimeout(G.hintTimer);
    G.armed = false;
    G.filePreview = false;
    G.previewMove = null;
    G.read = false;
    G.captures = { w: 0, b: 0 };
    G.dlg = [];
    G.chatBag = [];
    G.transcript = [];
    G.lastLine = null;
    G.dlgActive = false;
    $('transcript').innerHTML = '';
    G.pendingPromo = null;
    G.pendingEnd = null;
    G.review = { active: false, index: 0, states: [], liveState: null, liveLastMove: null, liveLegal: null, fromEnd: false };
    const footReset = document.querySelector('.board-foot');
    if (footReset) footReset.classList.remove('is-review');
    clearTimeout(G.dlgTimer);
    $('continue-btn').classList.add('hidden');
    const moveLayer = $('move-layer');
    if (moveLayer) moveLayer.innerHTML = '';
    clearTimeout(G.endTimer);
    clearInterval(G.clockTimer);
    G.clockTimer = null;
    G.startedAt = Date.now();
    G.turnStart = Date.now();

    G.clockEnabled = G.mode === 'serious' && $('clock-toggle').checked;
    G.playerMs = 600000;
    G.deanMs = 600000;

    $('char-img').src = ch.img;
    $('char-img').alt = ch.name;
    $('dean-img').classList.remove('speaking');
    $('char-img').classList.remove('speaking');
    $('char-name').textContent = ch.name;
    $('char-role').textContent = ch.role;
    $('char-seat').textContent = ch.seat;
    $('seat-chip').textContent = '你执白 · ' + ch.name;
    $('game').style.setProperty('--char-tint', ch.tint);

    $('intro').classList.add('hidden');
    $('game').classList.remove('hidden');
    $('endcard').classList.add('hidden');
    $('promo').classList.add('hidden');
    $('whisper').classList.add('hidden');
    $('move-log').classList.add('hidden');
    $('log-btn').textContent = '棋谱';

    $('ability-panel').classList.toggle('hidden', G.mode !== 'duel');
    $('chat-panel').classList.toggle('hidden', G.mode !== 'narrative');
    $('clocks').classList.toggle('hidden', !G.clockEnabled);
    $('collect-btn').textContent = G.mode === 'serious' ? '认输' : '收棋';
    $('ply-count').textContent = '第 1 手';

    updateAbility();
    updateHint();
    updateClocks();
    renderBoard();
    renderLog();
    renderArrows();
    updateTurn();
    sizeBoard();

    if (G.clockEnabled) {
      startClock();
    }

    if (G.mode === 'serious') {
      queue(T.SERIOUS.start);
    } else {
      queue(ch.script.start);
    }
    G.turnStart = Date.now();
  }

  function backToIntro() {
    clearInterval(G.clockTimer);
    clearTimeout(G.dlgTimer);
    clearTimeout(G.endTimer);
    G.modeLocked = false;
    G.over = true;
    G.review.active = false;
    const footBack = document.querySelector('.board-foot');
    if (footBack) footBack.classList.remove('is-review');
    $('endcard').classList.add('hidden');
    $('continue-btn').classList.add('hidden');
    const moveLayer = $('move-layer');
    if (moveLayer) moveLayer.innerHTML = '';
    $('game').classList.add('hidden');
    $('intro').classList.remove('hidden');
    G.dlg = [];
    G.dlgActive = false;
  }

  /* ---------------- board ---------------- */

  function sizeBoard() {
    const b = $('board');
    if (!b) return;
    const w = b.clientWidth || b.getBoundingClientRect().width;
    if (w) b.style.setProperty('--board-size', w + 'px');
  }

  function isPlayerTurn() {
    return G.state && G.state.turn === 'w' && !G.busy && !G.over && !G.review.active;
  }

  function svgNode(name, attrs) {
    const el = document.createElementNS(SVG_NS, name);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function squarePoint(sq) {
    return { x: (sq & 7) * 100 + 50, y: Math.floor(sq / 8) * 100 + 50 };
  }

  function drawMoveArrow(svg, fromSq, toSq, color, opts) {
    const o = opts || {};
    const a = squarePoint(fromSq);
    const b = squarePoint(toSq);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const startPad = o.small ? 14 : 22;
    const headLen = o.small ? 26 : 46;
    const headW = o.small ? 10 : 18;
    const tipPad = o.small ? 20 : 28;
    const width = o.small ? 4 : 11;

    const sx = a.x + ux * startPad;
    const sy = a.y + uy * startPad;
    const tip = { x: b.x - ux * tipPad, y: b.y - uy * tipPad };
    const base = { x: tip.x - ux * headLen, y: tip.y - uy * headLen };
    const d = 'M ' + sx + ' ' + sy + ' L ' + base.x + ' ' + base.y;

    svg.appendChild(svgNode('path', {
      d, fill: 'none', stroke: 'rgba(8, 7, 12, 0.5)',
      'stroke-width': width + 6, 'stroke-linecap': 'round'
    }));
    svg.appendChild(svgNode('path', {
      d, fill: 'none', stroke: color, 'stroke-width': width,
      'stroke-linecap': 'round'
    }));
    if (!o.small) {
      svg.appendChild(svgNode('path', {
        d, fill: 'none', stroke: '#fff6dd', 'stroke-width': 2.2,
        'stroke-linecap': 'round', opacity: '0.32'
      }));
    }

    const left = { x: base.x - uy * headW, y: base.y + ux * headW };
    const right = { x: base.x + uy * headW, y: base.y - ux * headW };
    svg.appendChild(svgNode('path', {
      d: 'M ' + tip.x + ' ' + tip.y + ' L ' + left.x + ' ' + left.y + ' L ' + right.x + ' ' + right.y + ' Z',
      fill: color, stroke: 'rgba(8, 7, 12, 0.32)', 'stroke-width': 1.5
    }));

    if (o.rings !== false) {
      svg.appendChild(svgNode('circle', {
        cx: a.x, cy: a.y, r: o.small ? 10 : 16, fill: 'none',
        stroke: color, 'stroke-width': 3, opacity: '0.8', class: 'arrow-ring'
      }));
      svg.appendChild(svgNode('circle', {
        cx: b.x, cy: b.y, r: o.small ? 18 : 29, fill: 'none',
        stroke: color, 'stroke-width': 3.5, opacity: '0.72', class: 'arrow-ring'
      }));
    }
  }

  function drawCaptureCross(svg, sq, color) {
    const p = squarePoint(sq);
    const r = 15;
    svg.appendChild(svgNode('path', {
      d: 'M ' + (p.x - r) + ' ' + (p.y - r) + ' L ' + (p.x + r) + ' ' + (p.y + r) +
         ' M ' + (p.x + r) + ' ' + (p.y - r) + ' L ' + (p.x - r) + ' ' + (p.y + r),
      fill: 'none', stroke: 'rgba(8, 7, 12, 0.5)', 'stroke-width': 8, 'stroke-linecap': 'round'
    }));
    svg.appendChild(svgNode('path', {
      d: 'M ' + (p.x - r) + ' ' + (p.y - r) + ' L ' + (p.x + r) + ' ' + (p.y + r) +
         ' M ' + (p.x + r) + ' ' + (p.y - r) + ' L ' + (p.x - r) + ' ' + (p.y + r),
      fill: 'none', stroke: color, 'stroke-width': 3.5, 'stroke-linecap': 'round'
    }));
  }

  function renderArrows() {
    const svg = $('arrows');
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!G.lastMove) return;

    const m = G.lastMove;
    const capture = !!(m.captured || m.ep);
    const color = capture ? '#f08a68' : '#ffd98a';
    drawMoveArrow(svg, m.from, m.to, color);

    if (m.castle) {
      const white = m.piece === m.piece.toUpperCase();
      const from = m.castle === 'K' ? (white ? 63 : 7) : (white ? 56 : 0);
      const to = m.castle === 'K' ? (white ? 61 : 5) : (white ? 59 : 3);
      drawMoveArrow(svg, from, to, '#c8a96a', { small: true, rings: false });
    }

    if (m.ep) {
      const white = m.piece === m.piece.toUpperCase();
      drawCaptureCross(svg, m.to + (white ? 8 : -8), color);
    }
  }

  function crackMarkup() {
    const paths = 'M 52 16 L 45 36 L 54 48 L 46 67 L 51 86 M 45 36 L 28 28 L 21 17 M 54 48 L 70 39 L 83 44 M 46 67 L 33 77 L 27 91 M 54 48 L 60 60 L 57 72';
    return '<svg class="crack" viewBox="0 0 100 100" aria-hidden="true">' +
      '<g fill="none" stroke="#2a1512" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round" opacity=".5"><path d="' + paths + '"/></g>' +
      '<g fill="none" stroke="#b03a2b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="' + paths + '"/></g>' +
      '<g fill="none" stroke="#ffb08a" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><path d="' + paths + '"/></g>' +
      '</svg>';
  }

  function renderBoard() {
    const board = $('board');
    if (!G.state) return;
    const b = G.state.board;
    const targets = new Map();
    if (G.selected !== null) {
      for (const m of G.legal) {
        if (m.from !== G.selected) continue;
        const prev = targets.get(m.to);
        const cap = !!(m.captured || m.ep);
        if (!prev || (cap && !prev.cap)) targets.set(m.to, { cap, count: (prev ? prev.count : 0) + 1 });
        else prev.count += 1;
      }
    }

    const kingSq = C.isInCheck(G.state, G.state.turn)
      ? (function () {
          const target = G.state.turn === 'w' ? 'K' : 'k';
          for (let i = 0; i < 64; i++) if (b[i] === target) return i;
          return -1;
        })()
      : -1;

    let html = '';
    for (let sq = 0; sq < 64; sq++) {
      const r = C.rowOf(sq);
      const c = C.colOf(sq);
      const cls = ['sq', (r + c) % 2 === 0 ? 'light' : 'dark'];
      if (sq === G.selected) cls.push('is-selected');
      if (G.lastMove && (sq === G.lastMove.from || sq === G.lastMove.to)) cls.push('is-last');
      if (targets.has(sq)) cls.push(targets.get(sq).cap ? 'capture' : 'move');
      if (sq === kingSq) cls.push('is-check');
      if (G.previewMove && (sq === G.previewMove.from || sq === G.previewMove.to)) cls.push('is-ghost');
      if (G.hintSquares && G.hintSquares.indexOf(sq) >= 0) {
        cls.push('hint');
        if (sq === G.hintSquares[0]) cls.push('hint-from');
        if (sq === G.hintSquares[1]) cls.push('hint-to');
      }

      const p = b[sq];
      let inner = '';
      if (p) {
        const isWhite = p === p.toUpperCase();
        inner += '<span class="piece ' + (isWhite ? 'w' : 'b') + '">' + C.GLYPH[p.toUpperCase()] + '\uFE0E</span>';
      }
      if (sq === kingSq) inner += crackMarkup();
      if (r === 7) inner += '<span class="coord file">' + 'abcdefgh'[c] + '</span>';
      if (c === 0) inner += '<span class="coord rank">' + (8 - r) + '</span>';
      if (G.hintSquares && sq === G.hintSquares[1] && !p) inner += '<span class="hint-dot"></span>';

      html += '<button class="' + cls.join(' ') + '" data-sq="' + sq + '" aria-label="' +
        'abcdefgh'[c] + (8 - r) + '">' + inner + '</button>';
    }
    board.innerHTML = html;
    sizeBoard();
    renderCaptures();
  }

  function onSquareClick(sq) {
    if (!isPlayerTurn()) return;
    const piece = G.state.board[sq];

    if (G.selected !== null) {
      const options = G.legal.filter((m) => m.from === G.selected && m.to === sq);
      if (options.length) {
        if (options.length > 1 && options[0].promo) {
          showPromotion(options);
        } else {
          playerMove(options[0]);
        }
        return;
      }
    }

    if (piece && C.colorOf(piece) === 'w') {
      G.selected = sq;
      playClick(false);
    } else {
      G.selected = null;
    }
    renderBoard();
  }

  function showPromotion(options) {
    G.pendingPromo = options;
    $('promo').classList.remove('hidden');
  }

  function bindGame() {
    $('board').addEventListener('click', (e) => {
      const button = e.target.closest('[data-sq]');
      if (!button) return;
      onSquareClick(Number(button.dataset.sq));
    });

    $('promo').addEventListener('click', (e) => {
      const b = e.target.closest('[data-promo]');
      if (!b) return;
      const letter = b.dataset.promo;
      const opts = G.pendingPromo || [];
      const move = opts.find((m) => (m.promo || '').toUpperCase() === letter) || opts[0];
      $('promo').classList.add('hidden');
      G.pendingPromo = null;
      if (move) playerMove(move);
    });

    $('ability-btn').addEventListener('click', useAbility);
    $('chat-btn').addEventListener('click', useChat);
    $('hint-btn').addEventListener('click', useHint);
    $('copy-btn').addEventListener('click', copyGame);
    $('collect-btn').addEventListener('click', () => {
      if (G.over) return;
      if (G.mode === 'narrative') finish({ result: 'draw', reason: 'collect' });
      else if (G.mode === 'serious') finish({ result: 'black', reason: 'resign' });
      else finish({ result: 'draw', reason: 'collect' });
    });
    $('leave-btn').addEventListener('click', backToIntro);
    $('log-btn').addEventListener('click', toggleLog);
    $('sound-btn').addEventListener('click', () => {
      G.sound = !G.sound;
      $('sound-btn').textContent = G.sound ? '声 · 开' : '声 · 关';
      $('sound-btn').setAttribute('aria-pressed', G.sound ? 'true' : 'false');
    });
    $('dialogue').addEventListener('click', nextLine);
    $('continue-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      $('continue-btn').classList.add('hidden');
    const moveLayer = $('move-layer');
    if (moveLayer) moveLayer.innerHTML = '';
      if (G.pendingEnd) $('endcard').classList.remove('hidden');
    });
    $('again-btn').addEventListener('click', () => {
      $('endcard').classList.add('hidden');
      startGame();
    });
    $('back-btn').addEventListener('click', backToIntro);
    $('review-end-btn').addEventListener('click', () => {
      $('endcard').classList.add('hidden');
      $('move-log').classList.remove('hidden');
      $('log-btn').textContent = '收起';
      G.review.fromEnd = true;
      enterReview(G.plies.length);
    });
    $('rev-prev').addEventListener('click', () => stepReview(-1));
    $('rev-next').addEventListener('click', () => stepReview(1));
    $('rev-exit').addEventListener('click', exitReview);
    $('move-log').addEventListener('click', (e) => {
      const el = e.target.closest('[data-ply]');
      if (!el) return;
      enterReview(Number(el.dataset.ply));
    });
    document.addEventListener('keydown', (e) => {
      if (!G.review.active) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepReview(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); stepReview(1); }
      else if (e.key === 'Escape') { e.preventDefault(); exitReview(); }
    });
  }

  /* ---------------- moving ---------------- */

  function commit(move) {
    const before = C.cloneState(G.state);
    const by = C.colorOf(G.state.board[move.from]);
    G.state = C.makeMove(G.state, move);
    G.history.push({ before, move, by });
    G.plies.push({ move, by });
    if (move.captured) G.captures[by] += 1;
    G.lastMove = move;
    G.legal = C.legalMoves(G.state);
    return by;
  }

  function animateMove(move) {
    const layer = $('move-layer');
    const board = $('board');
    if (!layer || !board || !move) return Promise.resolve();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();

    const sqEl = (sq) => board.querySelector('[data-sq="' + sq + '"]');
    const fromEl = sqEl(move.from);
    const toEl = sqEl(move.to);
    if (!fromEl || !toEl) return Promise.resolve();

    const br = board.getBoundingClientRect();
    const size = toEl.getBoundingClientRect().width;
    if (!size) return Promise.resolve();
    const center = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - br.left + r.width / 2, y: r.top - br.top + r.height / 2 };
    };
    const a = center(fromEl);
    const b = center(toEl);
    const clones = [];
    const hidden = [];

    const makeClone = (glyph, white, x, y, z) => {
      const el = document.createElement('span');
      el.className = 'fly-piece ' + (white ? 'w' : 'b');
      el.textContent = glyph + '\uFE0E';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.fontSize = (size * 0.82) + 'px';
      el.style.left = (x - size / 2) + 'px';
      el.style.top = (y - size / 2) + 'px';
      el.style.zIndex = String(z || 2);
      layer.appendChild(el);
      clones.push(el);
      return el;
    };

    const hideAt = (sq) => {
      const el = sqEl(sq);
      const p = el && el.querySelector('.piece');
      if (p) {
        p.style.opacity = '0';
        hidden.push(p);
      }
    };

    const white = move.piece === move.piece.toUpperCase();
    const dur = 290;

    if (move.captured) {
      const capSq = move.ep ? (move.to + (white ? 8 : -8)) : move.to;
      const capEl = sqEl(capSq);
      if (capEl) {
        const cp = center(capEl);
        const capWhite = move.captured === move.captured.toUpperCase();
        const cap = makeClone(C.GLYPH[move.captured.toUpperCase()], capWhite, cp.x, cp.y, 1);
        cap.animate([
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.55)' }
        ], { duration: 240, easing: 'ease-in', fill: 'forwards' });
      }
    }

    hideAt(move.to);
    const fly = makeClone(C.GLYPH[move.piece.toUpperCase()], white, a.x, a.y, 3);
    fly.animate([
      { transform: 'translate(0, 0)' },
      { transform: 'translate(' + (b.x - a.x) + 'px, ' + (b.y - a.y) + 'px)' }
    ], { duration: dur, easing: 'cubic-bezier(0.2, 0.72, 0.3, 1)' });

    if (move.castle) {
      const rookFrom = move.castle === 'K' ? (white ? 63 : 7) : (white ? 56 : 0);
      const rookTo = move.castle === 'K' ? (white ? 61 : 5) : (white ? 59 : 3);
      const rf = sqEl(rookFrom);
      const rt = sqEl(rookTo);
      if (rf && rt) {
        const ra = center(rf);
        const rb = center(rt);
        hideAt(rookTo);
        const rook = makeClone(C.GLYPH.R, white, ra.x, ra.y, 3);
        rook.animate([
          { transform: 'translate(0, 0)' },
          { transform: 'translate(' + (rb.x - ra.x) + 'px, ' + (rb.y - ra.y) + 'px)' }
        ], { duration: dur, easing: 'cubic-bezier(0.2, 0.72, 0.3, 1)' });
      }
    }

    return new Promise((resolve) => setTimeout(resolve, dur + 40)).then(() => {
      clones.forEach((c) => c.remove());
      hidden.forEach((p) => {
        p.style.opacity = '';
        p.classList.add('landed');
        setTimeout(() => p.classList.remove('landed'), 260);
      });
    });
  }

  function playerMove(move) {
    if (!isPlayerTurn()) return;

    const elapsed = Date.now() - G.turnStart;
    let read = false;
    if (G.mode === 'duel' && !G.armed && elapsed > 9000) read = true;

    if (G.mode === 'duel' && G.armed) {
      G.abilityUses = Math.max(0, G.abilityUses - 1);
      G.armed = false;
      toast('这一步，她没有听见。');
      G.read = false;
    } else {
      G.read = read;
    }

    G.selected = null;
    G.hintSquares = [];
    clearTimeout(G.hintTimer);
    commit(move);
    playClick(!!move.captured);
    renderBoard();
    const anim = animateMove(move);
    renderArrows();
    updateTurn();
    updateAbility();

    G.moveNo += 1;
    $('ply-count').textContent = '第 ' + Math.max(1, G.moveNo + 1) + ' 手';

    if (G.mode !== 'serious') {
      const ch = T.CHARACTERS[G.charId];
      if (ch.script.moves[G.moveNo]) queue(ch.script.moves[G.moveNo]);
      if (move.captured && !G.flags.playerCapture) {
        G.flags.playerCapture = true;
        queue(ch.script.playerCapture || [{ who: 'dean', text: '吃得好。' }]);
      }
      if (C.isInCheck(G.state, 'b') && !G.flags.firstCheck) {
        G.flags.firstCheck = true;
        queue(ch.script.firstCheck);
      }
      if (move.castle && !G.flags.castle) {
        G.flags.castle = true;
        queue(ch.script.castle);
      }
      if (move.promo && !G.flags.promo) {
        G.flags.promo = true;
        queue(ch.script.promotion);
      }
    }

    if (read) showWhisper('她听见了。');

    const status = C.gameStatus(G.state);
    if (status.over) {
      Promise.resolve(anim).then(() => finish(status));
      return;
    }

    G.busy = true;
    updateTurn();
    const delay = read ? 760 : 560;
    Promise.resolve(anim).then(() => {
      setTimeout(() => deanTurn(), Math.max(120, delay - 290));
    });
  }

  function deanTurn(banned) {
    if (G.over) return;
    const cfg = aiConfig();
    if (banned) cfg.banned = banned;

    let result = null;
    try {
      result = C.searchMove(G.state, cfg);
    } catch (err) {
      console.error(err);
    }
    if (!result) {
      const fallback = C.legalMoves(G.state);
      if (fallback.length) result = { move: fallback[Math.floor(Math.random() * fallback.length)] };
    }

    if (G.filePreview) {
      G.filePreview = false;
      G.previewMove = result.move;
      renderBoard();
      setTimeout(() => {
        G.previewMove = null;
        applyDean(result.move);
      }, 1600);
    } else {
      setTimeout(() => applyDean(result.move), 180);
    }
  }

  function applyDean(move) {
    if (G.over) return;
    G.hintSquares = [];
    clearTimeout(G.hintTimer);
    const by = commit(move);
    playClick(!!move.captured);
    G.selected = null;
    renderBoard();
    const anim = animateMove(move);
    renderArrows();
    updateTurn();

    if (G.mode !== 'serious') {
      const ch = T.CHARACTERS[G.charId];
      if (move.captured && !G.flags.deanCapture) {
        G.flags.deanCapture = true;
        queue(ch.script.firstCapture);
      }
      if (C.isInCheck(G.state, 'w') && !G.flags.deanCheck) {
        G.flags.deanCheck = true;
        queue(ch.script.deanCheck || [{ who: 'dean', text: '将军。' }]);
      }
      if (move.castle && !G.flags.castle) {
        G.flags.castle = true;
        queue(ch.script.castle);
      }
      if (move.promo && !G.flags.promo) {
        G.flags.promo = true;
        queue(ch.script.promotion);
      }
    }

    const status = C.gameStatus(G.state);
    Promise.resolve(anim).then(() => {
      if (status.over) {
        finish(status);
        return;
      }
      G.busy = false;
      G.turnStart = Date.now();
      updateTurn();
      updateAbility();
      renderLog();
    });
    void by;
  }

  function aiConfig() {
    const d = G.difficulty || 'normal';
    if (G.mode === 'serious') {
      if (d === 'gentle') return { depth: 2, time: 500, soft: true };
      if (d === 'hard') return { depth: 4, time: 2600 };
      return { depth: 3, time: 900 };
    }
    if (G.mode === 'duel') {
      if (d === 'gentle') return { depth: G.read ? 3 : 2, time: 600, soft: !G.read };
      if (d === 'hard') return { depth: 4, time: 2200 };
      return { depth: G.read ? 4 : 3, time: G.read ? 1200 : 800 };
    }
    if (d === 'gentle') return { depth: 2, time: 500, soft: true };
    if (d === 'hard') return { depth: 4, time: 2200 };
    return { depth: 3, time: 800 };
  }

  function loadDifficulty() {
    let v = null;
    try { v = localStorage.getItem('deanchess.difficulty'); } catch (e) { /* ignore */ }
    if (DIFF_LABEL[v]) G.difficulty = v;
    syncDifficulty();
  }

  function setDifficulty(v, announce) {
    if (!DIFF_LABEL[v]) return;
    G.difficulty = v;
    try { localStorage.setItem('deanchess.difficulty', v); } catch (e) { /* ignore */ }
    syncDifficulty();
    if (announce) toast('棋力 · ' + DIFF_LABEL[v]);
  }

  function syncDifficulty() {
    document.querySelectorAll('.diff-btn').forEach((b) => {
      const on = b.dataset.diff === G.difficulty;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    const btn = $('diff-btn');
    if (btn) btn.textContent = DIFF_LABEL[G.difficulty] || '认真';
  }

  function cycleDifficulty() {
    const order = ['gentle', 'normal', 'hard'];
    const next = order[(order.indexOf(G.difficulty) + 1) % order.length];
    setDifficulty(next, true);
  }

  function bindDifficulty() {
    document.querySelectorAll('.diff-btn').forEach((b) => {
      b.addEventListener('click', () => setDifficulty(b.dataset.diff, false));
    });
    $('diff-btn').addEventListener('click', cycleDifficulty);
  }

  function updateHint() {
    const btn = $('hint-btn');
    if (!btn) return;
    btn.textContent = '提示 · ' + G.hints;
    btn.disabled = G.over || G.busy || !G.state || G.state.turn !== 'w' || G.hints <= 0 || G.review.active;
  }

  function useHint() {
    if (G.over || G.busy || !G.state || G.state.turn !== 'w' || G.hints <= 0 || G.review.active) return;
    const res = C.searchMove(G.state, { depth: 3, time: 600 });
    if (!res) return;
    G.hints -= 1;
    G.hintSquares = [res.move.from, res.move.to];
    renderBoard();
    showWhisper('她示意：' + C.moveText(G.state, res.move));
    updateHint();
    clearTimeout(G.hintTimer);
    G.hintTimer = setTimeout(() => {
      G.hintSquares = [];
      if (G.state) renderBoard();
    }, 3600);
  }

  function plainMove(p) {
    const m = p.move;
    if (m.castle) return m.castle === 'K' ? 'O-O' : 'O-O-O';
    return C.squareName(m.from) + (m.captured ? 'x' : '-') + C.squareName(m.to) +
      (m.promo ? '=' + m.promo.toUpperCase() : '');
  }

  function buildNotation() {
    const rows = [];
    for (let i = 0; i < G.plies.length; i += 2) {
      const n = i / 2 + 1;
      rows.push(n + '. ' + plainMove(G.plies[i]) + (G.plies[i + 1] ? ' ' + plainMove(G.plies[i + 1]) : ''));
    }
    return rows.join('\n');
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); }
    catch (e) { toast('复制失败，请手动选择棋谱。'); }
    ta.remove();
  }

  function copyGame() {
    if (!G.plies.length) { toast('还没有落子。'); return; }
    const text = buildNotation();
    const done = () => toast('棋谱已复制');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  /* ---------------- abilities ---------------- */

  function useAbility() {
    if (G.mode !== 'duel' || G.over || G.busy || G.review.active) return;
    const ch = T.CHARACTERS[G.charId];
    const id = ch.ability.id;

    if (id === 'confess') {
      if (G.abilityUses <= 0) return;
      G.armed = !G.armed;
      toast(G.armed ? '你把下一步摊在桌上。' : '你把手收了回来。');
      updateAbility();
      return;
    }

    if (G.abilityUses <= 0) return;

    if (id === 'file') {
      if (G.state.turn !== 'w') return;
      G.abilityUses -= 1;
      G.filePreview = true;
      toast('你替她建了档。她落子之前，你会先看见。');
      queue([{ who: ch.id, text: ch.abilityLine }]);
      updateAbility();
      return;
    }

    if (id === 'bear') {
      const last = G.history[G.history.length - 1];
      if (!last || last.by !== 'b' || !last.move.captured) {
        toast('现在还没有落到她手里的伤。');
        return;
      }
      const key = last.move.from + '-' + last.move.to + (last.move.promo || '');
      G.state = C.cloneState(last.before);
      G.history.pop();
      G.plies.pop();
      G.captures.b = Math.max(0, G.captures.b - 1);
      G.lastMove = G.history.length ? G.history[G.history.length - 1].move : null;
      G.legal = C.legalMoves(G.state);
      G.selected = null;
      G.abilityUses -= 1;
      queue([{ who: ch.id, text: ch.abilityLine }]);
      toast('这道伤，落在他身上。她得另走一步。');
      renderBoard();
      renderArrows();
      renderLog();
      updateAbility();
      G.busy = true;
      updateTurn();
      setTimeout(() => deanTurn([key]), 500);
      return;
    }

    if (id === 'table') {
      if (G.history.length < 2) {
        toast('还没有两手可以拍回去。');
        return;
      }
      G.history.pop();
      G.history.pop();
      G.plies.pop();
      G.plies.pop();
      const anchor = G.history[G.history.length - 1];
      G.state = anchor ? C.cloneState(C.makeMove(anchor.before, anchor.move)) : C.initialState();
      G.lastMove = anchor ? anchor.move : null;
      G.captures.w = G.plies.filter((p) => p.by === 'w' && p.move.captured).length;
      G.captures.b = G.plies.filter((p) => p.by === 'b' && p.move.captured).length;
      G.moveNo = Math.max(0, G.moveNo - 1);
      G.legal = C.legalMoves(G.state);
      G.selected = null;
      G.abilityUses -= 1;
      queue([{ who: ch.id, text: ch.abilityLine }]);
      toast('棋盘被拍了一下。两步都回去了。');
      renderBoard();
      renderArrows();
      renderLog();
      updateAbility();
      updateTurn();
      $('ply-count').textContent = '第 ' + Math.max(1, G.moveNo + 1) + ' 手';
      return;
    }
  }

  function useChat() {
    if (G.mode !== 'narrative' || G.over || G.review.active) return;
    const ch = T.CHARACTERS[G.charId];
    const bag = ch.chat || [];
    if (!bag.length) return;
    if (!G.chatBag || !G.chatBag.length) {
      G.chatBag = bag.map((_, i) => i);
      for (let i = G.chatBag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [G.chatBag[i], G.chatBag[j]] = [G.chatBag[j], G.chatBag[i]];
      }
    }
    const idx = G.chatBag.pop();
    queue(bag[idx]);
  }

  function updateAbility() {
    const panel = $('ability-panel');
    if (G.mode !== 'duel') { panel.classList.add('hidden'); return; }
    panel.classList.remove('hidden');
    const ch = T.CHARACTERS[G.charId];
    $('ability-name').textContent = ch.ability.name;
    $('ability-hint').textContent = ch.ability.hint;
    $('ability-uses').textContent = G.abilityUses + ' / ' + ch.ability.max;
    const btn = $('ability-btn');
    btn.classList.toggle('is-armed', G.armed);

    let usable = G.abilityUses > 0 && !G.over && !G.busy && !G.review.active;
    if (ch.ability.id === 'bear') {
      const last = G.history[G.history.length - 1];
      usable = usable && !!last && last.by === 'b' && !!last.move.captured;
    }
    if (ch.ability.id === 'table') {
      usable = usable && G.history.length >= 2;
    }
    btn.disabled = !usable;
  }

  /* ---------------- dialogue ---------------- */

  function queue(lines) {
    if (!lines || !lines.length) return;
    for (const l of lines) G.dlg.push(l);
    if (!G.dlgActive) nextLine();
  }

  function nextLine() {
    clearTimeout(G.dlgTimer);
    if (!G.dlg.length) {
      G.dlgActive = false;
      renderDots();
      if (G.pendingEnd) showEndPrompt();
      return;
    }
    G.dlgActive = true;
    if (G.lastLine) {
      G.transcript.push(G.lastLine);
      if (G.transcript.length > 2) G.transcript.shift();
    }
    const l = G.dlg.shift();
    G.lastLine = l;
    renderTranscript();
    setSpeaker(l.who);
    speakPulse(l.who);
    $('line').textContent = l.text;
    $('line').className = 'line is-new' + (l.who === 'dean' ? ' is-dean' : '');
    renderDots();
    const ms = Math.min(9000, Math.max(3400, l.text.length * 170));
    G.dlgTimer = setTimeout(nextLine, ms);
  }

  function renderTranscript() {
    const box = $('transcript');
    box.innerHTML = '';
    for (const t of G.transcript) {
      const p = document.createElement('p');
      p.className = 't-line' + (t.who === 'dean' ? ' is-dean' : '');
      const who = document.createElement('span');
      who.className = 't-who';
      who.textContent = t.who === 'dean' ? T.DEAN.name : T.CHARACTERS[G.charId].name;
      p.appendChild(who);
      p.appendChild(document.createTextNode(t.text));
      box.appendChild(p);
    }
  }

  function showEndPrompt() {
    if (!G.pendingEnd) return;
    $('continue-btn').classList.remove('hidden');
  }

  function speakPulse(who) {
    const img = who === 'dean' ? $('dean-img') : $('char-img');
    if (!img) return;
    img.classList.remove('speaking');
    void img.offsetWidth;
    img.classList.add('speaking');
    clearTimeout(speakPulse.timer);
    speakPulse.timer = setTimeout(() => img.classList.remove('speaking'), 1000);
  }

  function setSpeaker(who) {
    const isDean = who === 'dean';
    const p = isDean ? T.DEAN : T.CHARACTERS[G.charId];
    $('dean-img').classList.toggle('is-on', isDean);
    $('char-img').classList.toggle('is-on', !isDean);
    $('char-name').textContent = p.name;
    $('char-role').textContent = p.role;
    $('char-seat').textContent = isDean ? '她执黑' : p.seat;
    $('game').style.setProperty('--char-tint', isDean ? 'rgba(200, 169, 106, 0.45)' : p.tint);
    $('speaker').textContent = p.name;
  }

  function renderDots() {
    const dots = $('line-dots');
    const n = Math.min(4, G.dlg.length);
    dots.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const d = document.createElement('i');
      if (i === 0) d.classList.add('on');
      dots.appendChild(d);
    }
  }

  /* ---------------- clocks / log / turn ---------------- */

  function startClock() {
    clearInterval(G.clockTimer);
    const tick = () => {
      if (G.over || !G.state || G.review.active) return;
      const dt = 250;
      if (G.state.turn === 'w') G.playerMs = Math.max(0, G.playerMs - dt);
      else G.deanMs = Math.max(0, G.deanMs - dt);
      updateClocks();
      if (G.playerMs <= 0) finish({ result: 'black', reason: 'time' });
      else if (G.deanMs <= 0) finish({ result: 'white', reason: 'time' });
    };
    G.clockTimer = setInterval(tick, 250);
  }

  function fmt(ms) {
    const s = Math.ceil(ms / 1000);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m + ':' + String(r).padStart(2, '0');
  }

  function updateClocks() {
    $('clock-player').textContent = fmt(G.playerMs);
    $('clock-dean').textContent = fmt(G.deanMs);
    const wrap = $('clocks');
    wrap.children[0].classList.toggle('is-active', G.state && G.state.turn === 'w');
    wrap.children[1].classList.toggle('is-active', G.state && G.state.turn === 'b');
    wrap.children[0].classList.toggle('is-low', G.playerMs < 60000);
    wrap.children[1].classList.toggle('is-low', G.deanMs < 60000);
  }

  function renderLog() {
    const log = $('move-log');
    const current = G.review.active ? G.review.index : -1;
    log.innerHTML = '';
    for (let i = 0; i < G.plies.length; i += 2) {
      const li = document.createElement('li');
      const w = G.plies[i];
      const b = G.plies[i + 1];
      const wPly = i + 1;
      const bPly = i + 2;
      li.innerHTML = '<span class="no">' + (i / 2 + 1) + '.</span>' +
        '<span data-ply="' + wPly + '" class="' + (current === wPly ? 'is-current' : '') + '">' +
          (w ? C.moveText(w.before || G.state, w.move) : '') + '</span>' +
        (b ? '<span data-ply="' + bPly + '" class="' + (current === bPly ? 'is-current' : '') + '">' + C.moveText(G.state, b.move) + '</span>' : '<span></span>');
      log.appendChild(li);
    }
    log.scrollTop = log.scrollHeight;
  }

  function renderCaptures() {
    const scope = G.review.active ? G.plies.slice(0, G.review.index) : G.plies;
    const her = scope.filter((p) => p.by === 'b' && p.move.captured).map((p) => p.move.captured);
    const you = scope.filter((p) => p.by === 'w' && p.move.captured).map((p) => p.move.captured);
    const order = 'PNBRQK';
    const sortPieces = (list) => list.slice().sort((a, b) => order.indexOf(a.toUpperCase()) - order.indexOf(b.toUpperCase()));
    const draw = (list, colorClass) => {
      if (!list.length) return '<span class="none">尚无</span>';
      return sortPieces(list).map((p) => '<span class="' + colorClass + '">' + C.GLYPH[p.toUpperCase()] + '\uFE0E</span>').join('');
    };
    $('cap-her').innerHTML = draw(her, 'w');
    $('cap-you').innerHTML = draw(you, 'b');
    const last = G.review.active
      ? (G.review.index > 0 ? G.plies[G.review.index - 1] : null)
      : G.plies[G.plies.length - 1];
    $('last-move').textContent = last
      ? (last.by === 'w' ? '你 · ' : '她 · ') + C.moveText(G.state, last.move)
      : (G.review.active ? '开局' : '棋局未开');
  }

  function buildReviewStates() {
    const states = [];
    if (G.history.length) states.push(C.cloneState(G.history[0].before));
    else states.push(C.initialState());
    for (const h of G.history) states.push(C.makeMove(h.before, h.move));
    return states;
  }

  function enterReview(index) {
    if (!G.plies.length) { toast('还没有落子。'); return; }
    if (!G.review.active) {
      if (G.busy && !G.over) { toast('等她落子再复盘。'); return; }
      G.review.liveState = G.state;
      G.review.liveLastMove = G.lastMove;
      G.review.liveLegal = G.legal;
      G.review.states = buildReviewStates();
      G.review.active = true;
      const foot = document.querySelector('.board-foot');
      if (foot) foot.classList.add('is-review');
    }
    const max = G.review.states.length - 1;
    const n = Math.max(0, Math.min(max, index));
    G.review.index = n;
    G.state = C.cloneState(G.review.states[n]);
    G.lastMove = n > 0 ? G.history[n - 1].move : null;
    G.selected = null;
    G.legal = C.legalMoves(G.state);
    renderBoard();
    renderLog();
    updateTurn();
    updateReviewBar();
  }

  function stepReview(delta) {
    if (!G.review.active) return;
    enterReview(G.review.index + delta);
  }

  function exitReview() {
    if (!G.review.active) return;
    const fromEnd = G.review.fromEnd;
    G.review.fromEnd = false;
    G.review.active = false;
    G.state = G.review.liveState || G.state;
    G.lastMove = G.review.liveLastMove;
    G.legal = G.review.liveLegal || C.legalMoves(G.state);
    G.selected = null;
    G.review.liveState = null;
    G.review.liveLastMove = null;
    G.review.liveLegal = null;
    G.review.states = [];
    G.review.index = 0;
    G.turnStart = Date.now();
    const foot = document.querySelector('.board-foot');
    if (foot) foot.classList.remove('is-review');
    renderBoard();
    renderLog();
    updateTurn();
    updateAbility();
    updateHint();
    if (fromEnd && G.over) $('endcard').classList.remove('hidden');
  }

  function updateReviewBar() {
    const label = $('rev-label');
    if (!label) return;
    label.textContent = G.review.index === 0 ? '复盘 · 开局' : '复盘 · 第 ' + G.review.index + ' 步';
    $('rev-prev').disabled = G.review.index <= 0;
    $('rev-next').disabled = G.review.index >= G.review.states.length - 1;
  }

  function toggleLog() {
    const log = $('move-log');
    const hidden = log.classList.contains('hidden');
    log.classList.toggle('hidden', !hidden);
    $('log-btn').textContent = hidden ? '收起' : '棋谱';
  }

  function updateTurn() {
    const wrap = $('turn-indicator');
    const text = $('turn-text');
    wrap.classList.remove('is-dean', 'is-thinking');
    if (G.review.active) {
      text.textContent = '复盘';
      if (G.clockEnabled) updateClocks();
      updateHint();
      return;
    }
    if (G.over) {
      text.textContent = '棋局已终';
      return;
    }
    if (G.busy || (G.state && G.state.turn === 'b')) {
      text.textContent = '她在落子';
      wrap.classList.add('is-dean', 'is-thinking');
    } else {
      text.textContent = '轮到你';
    }
    if (G.clockEnabled) updateClocks();
    updateHint();
  }

  /* ---------------- endings ---------------- */

  const REASON_TEXT = {
    checkmate: '将死',
    stalemate: '逼和',
    material: '子力不足',
    fifty: '五十回合',
    resign: '认输',
    time: '超时',
    collect: '收棋'
  };

  function finish(status) {
    if (G.over) return;
    G.over = true;
    G.busy = false;
    clearInterval(G.clockTimer);
    clearTimeout(G.endTimer);
    $('whisper').classList.add('hidden');
    G.hintSquares = [];
    clearTimeout(G.hintTimer);
    updateTurn();
    updateAbility();

    const reason = status.reason || 'collect';
    const result = status.result || 'draw';
    const ch = T.CHARACTERS[G.charId];
    const mins = Math.max(1, Math.round((Date.now() - G.startedAt) / 60000));
    const used = Math.floor((Date.now() - G.startedAt) / 1000);
    const usedText = Math.floor(used / 60) + ' 分 ' + (used % 60) + ' 秒';
    const stats = '共 ' + G.plies.length + ' 手 · 用时 ' + usedText +
      ' · 你吃掉 ' + G.captures.w + ' 子，她吃掉 ' + G.captures.b + ' 子';

    let kicker = '棋局';
    let title = '这一局，就到这里';
    let text = '';

    if (G.mode === 'narrative') {
      kicker = '棋谈 · ' + (reason === 'collect' ? '收棋' : REASON_TEXT[reason] || '终局');
      if (reason === 'collect') {
        title = ch.script.ending.title;
        text = ch.script.ending.text;
        queue(ch.script.end);
      } else if (result === 'white') {
        title = '将军';
        text = ch.script.ending.text;
        queue(ch.script.win);
      } else if (result === 'black') {
        title = '她将死了你';
        text = '棋子落定的时候，她没有立刻收手。灯还亮着，窗外的白玫瑰贴在玻璃上。';
        queue(ch.script.lose);
      } else {
        title = '和棋';
        text = ch.script.ending.text;
        queue(ch.script.end);
      }
    } else if (G.mode === 'duel') {
      kicker = '对局 · ' + (REASON_TEXT[reason] || '终局');
      title = result === 'white' ? '你赢了她' : result === 'black' ? '她赢了你' : '和棋';
      text = result === 'white'
        ? '她把手套重新戴好，说：「今晚这一局，算你的。」'
        : result === 'black'
          ? '她收棋的动作很轻：「坐得够久了。回去睡吧。」'
          : '棋盘停在这里。她没有再落子。';
    } else {
      kicker = '认真局 · ' + (REASON_TEXT[reason] || '终局');
      if (reason === 'time') {
        title = result === 'white' ? '她的钟停了' : '你的钟停了';
      } else if (reason === 'resign') {
        title = '你认输了';
      } else {
        title = result === 'white' ? '你赢了' : result === 'black' ? '她赢了' : '和棋';
      }
      text = result === 'white'
        ? '她把王放倒，看了很久。「……好棋。」'
        : result === 'black'
          ? '她收起最后一颗子。「再来。」'
          : '这一局，谁也没有多走一步。';
      if (result === 'white') queue(T.SERIOUS.win);
      else if (result === 'black') queue(T.SERIOUS.lose);
      else queue(T.SERIOUS.draw);
      saveRecord(result, reason);
    }

    $('end-kicker').textContent = kicker;
    $('end-title').textContent = title;
    $('end-text').textContent = text;
    $('end-stats').textContent = stats;
    G.pendingEnd = { kicker, title, text, stats };

    if (!G.dlg.length && !G.dlgActive) {
      setTimeout(showEndPrompt, 700);
    }

    void mins;
  }

  function saveRecord(result, reason) {
    try {
      const raw = localStorage.getItem('deanchess.record');
      const rec = raw ? JSON.parse(raw) : { games: 0, wins: 0, losses: 0, draws: 0 };
      rec.games += 1;
      if (result === 'white') rec.wins += 1;
      else if (result === 'black') rec.losses += 1;
      else rec.draws += 1;
      rec.last = { result, reason, at: Date.now() };
      localStorage.setItem('deanchess.record', JSON.stringify(rec));
    } catch (e) { /* ignore */ }
  }

  /* ---------------- small bits ---------------- */

  function showWhisper(text) {
    const w = $('whisper');
    w.textContent = text;
    w.classList.remove('hidden');
    w.style.animation = 'none';
    void w.offsetWidth;
    w.style.animation = '';
    clearTimeout(showWhisper.timer);
    showWhisper.timer = setTimeout(() => w.classList.add('hidden'), 2600);
  }

  function toast(text) {
    const t = $('toast');
    t.textContent = text;
    t.classList.remove('hidden');
    t.style.animation = 'none';
    void t.offsetWidth;
    t.style.animation = '';
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.add('hidden'), 2400);
  }

  function initAudio() {
    if (audioCtx) return;
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* optional */ }
  }

  function playClick(capture) {
    if (!G.sound || !audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(capture ? 128 : 196, t);
      o.frequency.exponentialRampToValueAtTime(capture ? 80 : 130, t + 0.07);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.055, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
      o.connect(g).connect(audioCtx.destination);
      o.start(t);
      o.stop(t + 0.12);
    } catch (e) { /* audio is optional */ }
  }

  /* ---------------- self test ---------------- */

  function waitFor(fn, timeout) {
    return new Promise((resolve, reject) => {
      const started = performance.now();
      const tick = () => {
        let ok = false;
        try { ok = fn(); } catch (e) { reject(e); return; }
        if (ok) resolve();
        else if (performance.now() - started > timeout) reject(new Error('timeout'));
        else setTimeout(tick, 60);
      };
      tick();
    });
  }

  function setupCaptureDemo() {
    const b = new Array(64).fill(null);
    b[4] = 'k'; b[60] = 'K';
    b[48] = 'P'; b[49] = 'P'; b[50] = 'P'; b[51] = 'P'; b[53] = 'P'; b[54] = 'P'; b[55] = 'P';
    b[8] = 'p'; b[9] = 'p'; b[10] = 'p'; b[13] = 'p'; b[14] = 'p'; b[15] = 'p';
    b[36] = 'P'; b[27] = 'p';
    b[56] = 'R'; b[63] = 'R'; b[0] = 'r'; b[7] = 'r';
    b[59] = 'Q'; b[3] = 'q';
    G.state = { board: b, turn: 'w', castling: { K: false, Q: false, k: false, q: false }, ep: null, half: 0, full: 10 };
    G.legal = C.legalMoves(G.state);
    G.selected = null;
    G.lastMove = { from: 11, to: 27, piece: 'p' };
    renderBoard();
    updateTurn();
    setTimeout(() => onSquareClick(36), 200);
    setTimeout(() => onSquareClick(27), 400);
  }

  function setupCheckDemo() {
    const b = new Array(64).fill(null);
    b[4] = 'k'; b[3] = 'q'; b[7] = 'r';
    b[8] = 'p'; b[9] = 'p'; b[10] = 'p'; b[11] = 'p'; b[13] = 'p'; b[14] = 'p'; b[15] = 'p';
    b[18] = 'n';
    b[28] = 'r';
    b[34] = 'B'; b[42] = 'N';
    b[48] = 'P'; b[49] = 'P'; b[50] = 'P'; b[51] = 'P'; b[53] = 'P'; b[54] = 'P'; b[55] = 'P';
    b[56] = 'R'; b[59] = 'Q'; b[60] = 'K'; b[63] = 'R';
    G.state = { board: b, turn: 'w', castling: { K: false, Q: false, k: false, q: false }, ep: null, half: 0, full: 12 };
    G.legal = C.legalMoves(G.state);
    G.selected = null;
    G.lastMove = { from: 12, to: 28, piece: 'r' };
    renderBoard();
    renderArrows();
    updateTurn();
    $('line').textContent = '将军。';
    $('speaker').textContent = T.DEAN.name;
    $('line').className = 'line is-dean';
  }

  async function runDemo() {
    const script = [[52, 36], [62, 45], [61, 34], [63, 62], [59, 31]];
    for (const [from, to] of script) {
      if (G.over) return;
      await waitFor(() => !G.busy && G.state.turn === 'w', 8000).catch(() => {});
      onSquareClick(from);
      onSquareClick(to);
    }
  }

  async function runSelftest() {    const report = { steps: [], errors: [] };
    const step = (name, fn) => {
      try { fn(); report.steps.push(name); }
      catch (e) { report.errors.push(name + ': ' + e.message); }
    };
    const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

    try {
      G.mode = 'duel';
      G.charId = 'ispera';
      document.querySelectorAll('.mode-card').forEach((c) => c.classList.toggle('is-on', c.dataset.mode === 'duel'));
      startGame();
      step('start: 32 pieces', () => assert(G.state.board.filter(Boolean).length === 32, 'piece count'));
      step('start: player to move', () => assert(G.state.turn === 'w', 'turn'));
      step('portrait: animated', () => {
        const a = getComputedStyle(document.getElementById('char-img')).animationName;
        assert(a.indexOf('breathe') >= 0 || a.indexOf('speak') >= 0, 'no portrait animation: ' + a);
      });

      document.querySelector('[data-sq="52"]').click();
      step('select: pawn highlights', () => assert(document.querySelectorAll('.sq.move').length >= 2, 'no move hints'));
      document.querySelector('[data-sq="36"]').click();
      step('move: e2-e4 accepted', () => assert(G.plies.length === 1, 'no ply'));
      step('move: animation starts', () => assert(document.querySelector('.fly-piece'), 'no flying piece'));
      await waitFor(() => !document.querySelector('.fly-piece'), 1600);
      step('move: animation lands', () => assert(!document.querySelector('.fly-piece'), 'flying piece stuck'));
      await waitFor(() => !G.busy && G.state.turn === 'w', 6000);
      step('ai: replied legally', () => {
        assert(G.plies.length === 2, 'ai did not move');
        assert(G.state.board.filter(Boolean).length >= 30, 'piece count after AI');
      });

      document.getElementById('hint-btn').click();
      step('hint: uses and highlights', () => {
        assert(G.hints === 2, 'hint count: ' + G.hints);
        assert(G.hintSquares.length === 2, 'hint squares missing');
        assert(document.querySelectorAll('.sq.hint').length === 2, 'hint rings missing');
      });
      document.getElementById('diff-btn').click();
      step('difficulty: cycles', () => assert(G.difficulty === 'hard', 'difficulty: ' + G.difficulty));

      document.querySelector('[data-sq="57"]').click();
      const hasKnight = document.querySelectorAll('.sq.move').length + document.querySelectorAll('.sq.capture').length;
      step('select: knight has moves', () => assert(hasKnight > 0, 'knight has no legal move'));
      document.querySelector('[data-sq="57"]').click();

      // ability availability
      step('ability: panel visible', () => assert(!document.getElementById('ability-panel').classList.contains('hidden'), 'panel hidden'));
      document.getElementById('ability-btn').click();
      step('ability: armed', () => assert(G.armed === true, 'not armed'));
      document.querySelector('[data-sq="62"]').click();
      document.querySelector('[data-sq="45"]').click();
      await waitFor(() => !G.busy && G.state.turn === 'w', 6000);
      step('ability: consumed', () => assert(G.abilityUses === 1, 'uses not consumed: ' + G.abilityUses));

      document.getElementById('log-btn').click();
      const logSpans = document.querySelectorAll('#move-log [data-ply]');
      logSpans[1].click();
      step('review: enters at ply 2', () => assert(G.review.active && G.review.index === 2, 'review index: ' + G.review.index));
      step('review: board restored', () => assert(G.state.board.filter(Boolean).length === 32, 'review board'));
      document.getElementById('rev-prev').click();
      step('review: previous', () => assert(G.review.index === 1, 'prev index: ' + G.review.index));
      document.getElementById('rev-next').click();
      step('review: next', () => assert(G.review.index === 2, 'next index: ' + G.review.index));
      document.getElementById('rev-exit').click();
      step('review: exits to live', () => assert(!G.review.active && G.state.turn === 'w', 'did not exit'));

      // finish the loop without waiting for a full game
      finish({ result: 'draw', reason: 'collect' });
      step('end: card shown', () => assert(!document.getElementById('endcard').classList.contains('hidden') || G.over, 'not over'));

      document.getElementById('again-btn').click();
      await waitFor(() => G.state && G.state.board.filter(Boolean).length === 32, 2000);
      step('restart: fresh board', () => assert(G.plies.length === 0, 'history not reset'));

      // serious mode smoke test
      document.getElementById('leave-btn').click();
      G.mode = 'serious';
      startGame();
      step('serious: ability hidden', () => assert(document.getElementById('ability-panel').classList.contains('hidden'), 'ability shown'));
      step('serious: opening line', () => assert(document.getElementById('line').textContent.indexOf('不听') >= 0, 'line missing'));
    } catch (e) {
      report.errors.push('fatal: ' + e.message + ' ' + JSON.stringify({
        turn: G.state && G.state.turn, busy: G.busy, over: G.over,
        plies: G.plies.length, queue: G.dlg.length, dlgActive: G.dlgActive,
        errors: window.__ERRORS__
      }));
    }

    report.ok = report.errors.length === 0;
    window.__SELFTEST__ = report;
    const pre = document.createElement('pre');
    pre.id = 'selftest';
    pre.hidden = true;
    pre.textContent = JSON.stringify(report);
    document.body.appendChild(pre);
  }

  window.__GAME__ = G;
})();
