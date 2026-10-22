/* 院长的棋局 — chess rules engine + search.
   Board: 64 array, index 0 = a8, row 0 is Black's back rank. */
(function (root) {
  'use strict';

  const FILES = 'abcdefgh';
  const START = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
  ];

  const colorOf = (p) => (p ? (p === p.toUpperCase() ? 'w' : 'b') : null);
  const other = (c) => (c === 'w' ? 'b' : 'w');
  const rowOf = (sq) => sq >> 3;
  const colOf = (sq) => sq & 7;
  const sqOf = (r, c) => r * 8 + c;
  const inBoard = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

  function initialState() {
    return {
      board: START.slice(),
      turn: 'w',
      castling: { K: true, Q: true, k: true, q: true },
      ep: null,
      half: 0,
      full: 1
    };
  }

  function cloneState(s) {
    return {
      board: s.board.slice(),
      turn: s.turn,
      castling: { K: s.castling.K, Q: s.castling.Q, k: s.castling.k, q: s.castling.q },
      ep: s.ep,
      half: s.half,
      full: s.full
    };
  }

  const KNIGHT_D = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
  const KING_D = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const BISHOP_D = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  const ROOK_D = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  function isSquareAttacked(board, sq, by) {
    const r = rowOf(sq), c = colOf(sq);

    // pawns
    const pr = by === 'w' ? r + 1 : r - 1;
    const pawn = by === 'w' ? 'P' : 'p';
    if (inBoard(pr, c - 1) && board[sqOf(pr, c - 1)] === pawn) return true;
    if (inBoard(pr, c + 1) && board[sqOf(pr, c + 1)] === pawn) return true;

    // knights
    const kn = by === 'w' ? 'N' : 'n';
    for (const [dr, dc] of KNIGHT_D) {
      const rr = r + dr, cc = c + dc;
      if (inBoard(rr, cc) && board[sqOf(rr, cc)] === kn) return true;
    }

    // king
    const kg = by === 'w' ? 'K' : 'k';
    for (const [dr, dc] of KING_D) {
      const rr = r + dr, cc = c + dc;
      if (inBoard(rr, cc) && board[sqOf(rr, cc)] === kg) return true;
    }

    // sliders
    const rq = by === 'w' ? ['R', 'Q'] : ['r', 'q'];
    const bq = by === 'w' ? ['B', 'Q'] : ['b', 'q'];
    for (const [dr, dc] of ROOK_D) {
      let rr = r + dr, cc = c + dc;
      while (inBoard(rr, cc)) {
        const p = board[sqOf(rr, cc)];
        if (p) { if (rq.includes(p)) return true; break; }
        rr += dr; cc += dc;
      }
    }
    for (const [dr, dc] of BISHOP_D) {
      let rr = r + dr, cc = c + dc;
      while (inBoard(rr, cc)) {
        const p = board[sqOf(rr, cc)];
        if (p) { if (bq.includes(p)) return true; break; }
        rr += dr; cc += dc;
      }
    }
    return false;
  }

  function findKing(board, color) {
    const k = color === 'w' ? 'K' : 'k';
    for (let i = 0; i < 64; i++) if (board[i] === k) return i;
    return -1;
  }

  function isInCheck(state, color) {
    const k = findKing(state.board, color);
    if (k < 0) return false;
    return isSquareAttacked(state.board, k, other(color));
  }

  function pushPawnMoves(state, from, color, out) {
    const board = state.board;
    const r = rowOf(from), c = colOf(from);
    const dir = color === 'w' ? -1 : 1;
    const startRow = color === 'w' ? 6 : 1;
    const promoRow = color === 'w' ? 0 : 7;

    const one = sqOf(r + dir, c);
    if (inBoard(r + dir, c) && !board[one]) {
      addPawn(state, from, one, color, null, out);
      if (r === startRow) {
        const two = sqOf(r + 2 * dir, c);
        if (!board[two]) out.push({ from, to: two, piece: color === 'w' ? 'P' : 'p', double: true });
      }
    }
    for (const dc of [-1, 1]) {
      const rr = r + dir, cc = c + dc;
      if (!inBoard(rr, cc)) continue;
      const to = sqOf(rr, cc);
      const target = board[to];
      if (target && colorOf(target) === other(color)) {
        addPawn(state, from, to, color, target, out);
      } else if (state.ep === to) {
        out.push({ from, to, piece: color === 'w' ? 'P' : 'p', captured: color === 'w' ? 'p' : 'P', ep: true });
      }
    }
    if (r === promoRow) { /* unreachable, handled in addPawn */ }
    void promoRow;
  }

  function addPawn(state, from, to, color, captured, out) {
    const promoRow = color === 'w' ? 0 : 7;
    if (rowOf(to) === promoRow) {
      for (const q of ['Q', 'R', 'B', 'N']) {
        out.push({ from, to, piece: color === 'w' ? 'P' : 'p', captured, promo: color === 'w' ? q : q.toLowerCase() });
      }
    } else {
      out.push({ from, to, piece: color === 'w' ? 'P' : 'p', captured });
    }
  }

  function pseudoMoves(state, color) {
    const board = state.board;
    const out = [];
    for (let from = 0; from < 64; from++) {
      const p = board[from];
      if (!p || colorOf(p) !== color) continue;
      const type = p.toUpperCase();
      const r = rowOf(from), c = colOf(from);

      if (type === 'P') {
        pushPawnMoves(state, from, color, out);
      } else if (type === 'N') {
        for (const [dr, dc] of KNIGHT_D) {
          const rr = r + dr, cc = c + dc;
          if (!inBoard(rr, cc)) continue;
          const to = sqOf(rr, cc);
          if (!board[to] || colorOf(board[to]) !== color) out.push({ from, to, piece: p, captured: board[to] || null });
        }
      } else if (type === 'K') {
        for (const [dr, dc] of KING_D) {
          const rr = r + dr, cc = c + dc;
          if (!inBoard(rr, cc)) continue;
          const to = sqOf(rr, cc);
          if (!board[to] || colorOf(board[to]) !== color) out.push({ from, to, piece: p, captured: board[to] || null });
        }
        // castling
        const homeRow = color === 'w' ? 7 : 0;
        const kingSq = sqOf(homeRow, 4);
        if (from === kingSq && !isInCheck(state, color)) {
          const kRight = color === 'w' ? 'K' : 'k';
          const qRight = color === 'w' ? 'Q' : 'q';
          if (state.castling[kRight] && !board[sqOf(homeRow, 5)] && !board[sqOf(homeRow, 6)]) {
            if (!isSquareAttacked(board, sqOf(homeRow, 5), other(color)) &&
                !isSquareAttacked(board, sqOf(homeRow, 6), other(color))) {
              out.push({ from, to: sqOf(homeRow, 6), piece: p, castle: 'K' });
            }
          }
          if (state.castling[qRight] && !board[sqOf(homeRow, 1)] && !board[sqOf(homeRow, 2)] && !board[sqOf(homeRow, 3)]) {
            if (!isSquareAttacked(board, sqOf(homeRow, 3), other(color)) &&
                !isSquareAttacked(board, sqOf(homeRow, 2), other(color))) {
              out.push({ from, to: sqOf(homeRow, 2), piece: p, castle: 'Q' });
            }
          }
        }
      } else {
        const dirs = type === 'B' ? BISHOP_D : type === 'R' ? ROOK_D : BISHOP_D.concat(ROOK_D);
        for (const [dr, dc] of dirs) {
          let rr = r + dr, cc = c + dc;
          while (inBoard(rr, cc)) {
            const to = sqOf(rr, cc);
            const t = board[to];
            if (!t) out.push({ from, to, piece: p, captured: null });
            else {
              if (colorOf(t) !== color) out.push({ from, to, piece: p, captured: t });
              break;
            }
            rr += dr; cc += dc;
          }
        }
      }
    }
    return out;
  }

  function makeMove(state, move) {
    const s = cloneState(state);
    const board = s.board;
    const color = colorOf(board[move.from]);
    const piece = board[move.from];
    const type = piece.toUpperCase();

    board[move.from] = null;
    board[move.to] = move.promo || piece;

    if (move.ep) {
      const dir = color === 'w' ? 1 : -1;
      const capSq = move.to + dir * 8;
      board[capSq] = null;
    }
    if (move.castle) {
      const homeRow = color === 'w' ? 7 : 0;
      if (move.castle === 'K') {
        board[sqOf(homeRow, 5)] = board[sqOf(homeRow, 7)];
        board[sqOf(homeRow, 7)] = null;
      } else {
        board[sqOf(homeRow, 3)] = board[sqOf(homeRow, 0)];
        board[sqOf(homeRow, 0)] = null;
      }
    }

    // castling rights
    if (type === 'K') {
      if (color === 'w') { s.castling.K = false; s.castling.Q = false; }
      else { s.castling.k = false; s.castling.q = false; }
    }
    if (type === 'R') {
      if (move.from === 63) s.castling.K = false;
      if (move.from === 56) s.castling.Q = false;
      if (move.from === 7) s.castling.k = false;
      if (move.from === 0) s.castling.q = false;
    }
    if (move.to === 63) s.castling.K = false;
    if (move.to === 56) s.castling.Q = false;
    if (move.to === 7) s.castling.k = false;
    if (move.to === 0) s.castling.q = false;

    s.ep = move.double ? (move.from + move.to) / 2 : null;
    s.half = (type === 'P' || move.captured) ? 0 : s.half + 1;
    if (color === 'b') s.full += 1;
    s.turn = other(color);
    return s;
  }

  function legalMoves(state, color) {
    const c = color || state.turn;
    const pseudo = pseudoMoves(state, c);
    const out = [];
    for (const m of pseudo) {
      const next = makeMove(state, m);
      if (!isInCheck(next, c)) out.push(m);
    }
    return out;
  }

  function insufficientMaterial(board) {
    const pieces = [];
    for (const p of board) if (p) pieces.push(p.toUpperCase());
    if (pieces.length > 4) return false;
    const nonKings = pieces.filter((p) => p !== 'K');
    if (nonKings.length === 0) return true;
    if (nonKings.length === 1 && (nonKings[0] === 'N' || nonKings[0] === 'B')) return true;
    return false;
  }

  function gameStatus(state) {
    const moves = legalMoves(state);
    const inCheck = isInCheck(state, state.turn);
    if (moves.length === 0) {
      if (inCheck) return { over: true, result: state.turn === 'w' ? 'black' : 'white', reason: 'checkmate' };
      return { over: true, result: 'draw', reason: 'stalemate' };
    }
    if (insufficientMaterial(state.board)) return { over: true, result: 'draw', reason: 'material' };
    if (state.half >= 100) return { over: true, result: 'draw', reason: 'fifty' };
    return { over: false, inCheck };
  }

  /* ---------------- evaluation ---------------- */

  const VAL = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000 };
  const PST = {
    P: [
      0, 0, 0, 0, 0, 0, 0, 0,
      50, 50, 50, 50, 50, 50, 50, 50,
      10, 10, 20, 30, 30, 20, 10, 10,
      5, 5, 10, 25, 25, 10, 5, 5,
      0, 0, 0, 20, 20, 0, 0, 0,
      5, -5, -10, 0, 0, -10, -5, 5,
      5, 10, 10, -20, -20, 10, 10, 5,
      0, 0, 0, 0, 0, 0, 0, 0
    ],
    N: [
      -50, -40, -30, -30, -30, -30, -40, -50,
      -40, -20, 0, 0, 0, 0, -20, -40,
      -30, 0, 10, 15, 15, 10, 0, -30,
      -30, 5, 15, 20, 20, 15, 5, -30,
      -30, 0, 15, 20, 20, 15, 0, -30,
      -30, 5, 10, 15, 15, 10, 5, -30,
      -40, -20, 0, 5, 5, 0, -20, -40,
      -50, -40, -30, -30, -30, -30, -40, -50
    ],
    B: [
      -20, -10, -10, -10, -10, -10, -10, -20,
      -10, 0, 0, 0, 0, 0, 0, -10,
      -10, 0, 5, 10, 10, 5, 0, -10,
      -10, 5, 5, 10, 10, 5, 5, -10,
      -10, 0, 10, 10, 10, 10, 0, -10,
      -10, 10, 10, 10, 10, 10, 10, -10,
      -10, 5, 0, 0, 0, 0, 5, -10,
      -20, -10, -10, -10, -10, -10, -10, -20
    ],
    R: [
      0, 0, 0, 0, 0, 0, 0, 0,
      5, 10, 10, 10, 10, 10, 10, 5,
      -5, 0, 0, 0, 0, 0, 0, -5,
      -5, 0, 0, 0, 0, 0, 0, -5,
      -5, 0, 0, 0, 0, 0, 0, -5,
      -5, 0, 0, 0, 0, 0, 0, -5,
      -5, 0, 0, 0, 0, 0, 0, -5,
      0, 0, 0, 5, 5, 0, 0, 0
    ],
    Q: [
      -20, -10, -10, -5, -5, -10, -10, -20,
      -10, 0, 0, 0, 0, 0, 0, -10,
      -10, 0, 5, 5, 5, 5, 0, -10,
      -5, 0, 5, 5, 5, 5, 0, -5,
      0, 0, 5, 5, 5, 5, 0, -5,
      -10, 5, 5, 5, 5, 5, 0, -10,
      -10, 0, 5, 0, 0, 0, 0, -10,
      -20, -10, -10, -5, -5, -10, -10, -20
    ],
    K: [
      -30, -40, -40, -50, -50, -40, -40, -30,
      -30, -40, -40, -50, -50, -40, -40, -30,
      -30, -40, -40, -50, -50, -40, -40, -30,
      -30, -40, -40, -50, -50, -40, -40, -30,
      -20, -30, -30, -40, -40, -30, -30, -20,
      -10, -20, -20, -20, -20, -20, -20, -10,
      20, 20, 0, 0, 0, 0, 20, 20,
      20, 30, 10, 0, 0, 10, 30, 20
    ]
  };

  function evaluate(state) {
    let score = 0;
    for (let sq = 0; sq < 64; sq++) {
      const p = state.board[sq];
      if (!p) continue;
      const white = p === p.toUpperCase();
      const type = p.toUpperCase();
      const idx = white ? sq : (7 - rowOf(sq)) * 8 + colOf(sq);
      const v = VAL[type] + (PST[type] ? PST[type][idx] : 0);
      score += white ? v : -v;
    }
    return score;
  }

  function mvvLva(m) {
    if (!m.captured) return m.promo ? 800 : 0;
    const victim = VAL[m.captured.toUpperCase()] || 0;
    const attacker = VAL[m.piece.toUpperCase()] || 0;
    return 1000 + victim - attacker / 10;
  }

  function ordered(moves) {
    return moves.slice().sort((a, b) => mvvLva(b) - mvvLva(a));
  }

  function quiesce(state, alpha, beta, deadline, depth) {
    const stand = state.turn === 'w' ? evaluate(state) : -evaluate(state);
    if (stand >= beta) return beta;
    if (stand > alpha) alpha = stand;
    if (depth <= 0 || performance.now() > deadline) return alpha;
    const caps = ordered(legalMoves(state).filter((m) => m.captured || m.promo));
    for (const m of caps) {
      const score = -quiesce(makeMove(state, m), -beta, -alpha, deadline, depth - 1);
      if (score >= beta) return beta;
      if (score > alpha) alpha = score;
    }
    return alpha;
  }

  function negamax(state, depth, alpha, beta, deadline, ply) {
    if (performance.now() > deadline) return state.turn === 'w' ? evaluate(state) : -evaluate(state);
    if (depth <= 0) return quiesce(state, alpha, beta, deadline, 3);

    const moves = ordered(legalMoves(state));
    if (moves.length === 0) {
      if (isInCheck(state, state.turn)) return -30000 + ply;
      return 0;
    }
    let best = -Infinity;
    for (const m of moves) {
      const score = -negamax(makeMove(state, m), depth - 1, -beta, -alpha, deadline, ply + 1);
      if (score > best) best = score;
      if (score > alpha) alpha = score;
      if (alpha >= beta) break;
    }
    return best;
  }

  function searchMove(state, opts) {
    const options = opts || {};
    const maxDepth = options.depth || 3;
    const timeMs = options.time || 800;
    const deadline = performance.now() + timeMs;
    let rootMoves = ordered(legalMoves(state));
    if (options.banned && options.banned.length) {
      const ban = new Set(options.banned);
      rootMoves = rootMoves.filter((m) => !ban.has(m.from + '-' + m.to + (m.promo || '')));
    }
    if (!rootMoves.length) return null;

    let best = rootMoves[0];
    let bestScore = -Infinity;
    let completed = 0;

    for (let d = 1; d <= maxDepth; d++) {
      let alpha = -Infinity;
      let localBest = null;
      let localScore = -Infinity;
      const scored = [];
      for (const m of rootMoves) {
        const score = -negamax(makeMove(state, m), d - 1, -Infinity, -alpha, deadline, 1);
        scored.push({ m, score });
        if (score > localScore) { localScore = score; localBest = m; }
        if (score > alpha) alpha = score;
        if (performance.now() > deadline) break;
      }
      if (localBest && (performance.now() <= deadline || completed === 0)) {
        best = localBest;
        bestScore = localScore;
        completed = d;
        // keep the best moves first for the next iteration
        scored.sort((a, b) => b.score - a.score);
        rootMoves.length = 0;
        for (const s of scored) rootMoves.push(s.m);
      }
      if (performance.now() > deadline) break;
      if (Math.abs(bestScore) > 20000) break;
    }

    // a little unpredictability at easy levels
    if (options.soft && rootMoves.length > 1 && Math.random() < 0.35) {
      const alt = rootMoves[1];
      if (alt) best = alt;
    }
    if (!best) best = rootMoves[0];
    return { move: best, score: bestScore, depth: completed };
  }

  /* ---------------- notation ---------------- */

  const GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };

  function squareName(sq) {
    return FILES[colOf(sq)] + (8 - rowOf(sq));
  }

  function moveText(state, move) {
    if (move.castle) return move.castle === 'K' ? 'O-O' : 'O-O-O';
    const g = GLYPH[move.piece.toUpperCase()];
    const dash = move.captured ? '×' : '–';
    const promo = move.promo ? '=' + GLYPH[move.promo.toUpperCase()] : '';
    return g + squareName(move.from) + dash + squareName(move.to) + promo;
  }

  const api = {
    initialState, cloneState, legalMoves, pseudoMoves, makeMove, isInCheck,
    isSquareAttacked, gameStatus, evaluate, searchMove, moveText, squareName,
    rowOf, colOf, sqOf, colorOf, GLYPH
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.Chess = api;
})(typeof window !== 'undefined' ? window : globalThis);
