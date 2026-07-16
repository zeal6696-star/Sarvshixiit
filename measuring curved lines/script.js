// ============================================
//   Exp 2 — Measuring Curved Lines Using a Thread
//   Class 6 Science — script.js
// ============================================

// ── NAV ──
function showTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  const map = { concepts: 0, experiment: 1, materials: 2, activity: 3, quiz: 4, summary: 5 };
  document.querySelectorAll('.nav-btn')[map[id]].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── EXPERIMENT STEPS SIMULATION ──
const expSteps = [
  {
    emoji: '🗺️',
    title: 'Choose Your Curved Line',
    desc: 'Find or draw a curved line — like the outline of India on a map, the edge of a leaf, or a wavy line you draw on paper. Straight rulers cannot measure these curves accurately!',
    bg: '#f0fdf4',
    tip: '💡 A straight ruler will only give you a shorter, inaccurate length for any curved path.'
  },
  {
    emoji: '🧵📌',
    title: 'Place the Thread at the Start',
    desc: 'Take a piece of thread (longer than the curve you want to measure). Hold one end firmly at the starting point of the curved line with your finger or a pin.',
    bg: '#f0f9ff',
    tip: '💡 Use a thin, non-stretchy thread for best accuracy. Wool or elastic thread will give wrong readings!'
  },
  {
    emoji: '🧵〰️',
    title: 'Lay the Thread Along the Curve',
    desc: 'Carefully press and lay the thread along the entire curved line, following every bend and turn closely. Make sure the thread hugs the curve without any gaps or shortcuts.',
    bg: '#fefce8',
    tip: '💡 Go slowly and press the thread gently with your fingertip at each bend — do not let it cut across any curve.'
  },
  {
    emoji: '✂️📍',
    title: 'Mark the End Point',
    desc: 'When the thread reaches the end of the curved line, pinch that point between your fingers or mark it with a pen. Now the thread holds the exact length of the curved path.',
    bg: '#fff7ed',
    tip: '💡 Keep holding both the start and end marks firmly — if the thread shifts, you lose your measurement!'
  },
  {
    emoji: '📏🧵',
    title: 'Straighten the Thread on a Ruler',
    desc: 'Carefully lift the thread without changing your grip on the two marked points. Lay it straight along a ruler or measuring scale, aligning one mark with 0 cm.',
    bg: '#f0fdf4',
    tip: '💡 Make sure the thread lies flat and taut (not loose, not stretched) on the ruler for an accurate reading.'
  },
  {
    emoji: '✅📐',
    title: 'Read and Record the Measurement!',
    desc: 'Read the length where the second mark falls on the ruler. That number in centimetres (cm) is the exact length of the curved line! Record it in your notebook.',
    bg: '#dcfce7',
    tip: '🎉 You have successfully converted a curved distance into a straight measurement — this is the key idea of the experiment!'
  },
];

let curStep = 0;
let autoTimer = null;

function renderStep() {
  const s = expSteps[curStep];
  document.getElementById('sim-emoji').textContent = s.emoji;
  document.getElementById('sim-title').textContent = s.title;
  document.getElementById('sim-desc').textContent = s.desc;
  document.getElementById('sim-tip').textContent = s.tip;
  document.getElementById('sim-canvas').style.background = s.bg;
  document.getElementById('step-num').textContent = 'Step ' + (curStep + 1) + ' / ' + expSteps.length;
  document.getElementById('step-fill').style.width = Math.round((curStep + 1) / expSteps.length * 100) + '%';
  // dots
  const dc = document.getElementById('step-dots');
  dc.innerHTML = '';
  expSteps.forEach((_, i) => {
    const d = document.createElement('div');
    d.style.cssText = 'width:10px;height:10px;border-radius:50%;flex-shrink:0;transition:all 0.2s;background:' +
      (i === curStep ? 'var(--accent)' : i < curStep ? 'var(--blue)' : 'var(--bdr)') + ';';
    dc.appendChild(d);
  });
}

function nextStep() { if (curStep < expSteps.length - 1) { curStep++; renderStep(); } }
function prevStep() { if (curStep > 0) { curStep--; renderStep(); } }
function resetSim() {
  curStep = 0; renderStep();
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; document.getElementById('autoBtn').textContent = '▶ Auto Play'; }
}
function autoPlay() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; document.getElementById('autoBtn').textContent = '▶ Auto Play'; return; }
  document.getElementById('autoBtn').textContent = '⏸ Pause';
  autoTimer = setInterval(() => {
    if (curStep < expSteps.length - 1) { curStep++; renderStep(); }
    else { clearInterval(autoTimer); autoTimer = null; document.getElementById('autoBtn').textContent = '▶ Auto Play'; }
  }, 2400);
}
renderStep();

// ── INTERACTIVE MEASUREMENT ACTIVITY ──
// Simple quiz: user selects which reading is correct for a given thread length shown
const measureChallenges = [
  { question: 'You lay a thread along a curved river on a map. The thread, when straightened, touches 14.5 cm on the ruler. What is the length of the river on the map?', answer: '14.5 cm', options: ['12.0 cm', '14.5 cm', '16.0 cm', '13.5 cm'], explanation: 'The thread records the exact curved length. When laid straight, it reads 14.5 cm — that is the answer.' },
  { question: 'A student uses stretchy elastic instead of thread to measure a curve. Will the result be accurate?', answer: 'No — elastic stretches and gives a longer reading', options: ['Yes — elastic is flexible so it works better', 'No — elastic stretches and gives a longer reading', 'Yes — elastic is more accurate than thread', 'No — elastic gives a shorter reading'], explanation: 'Elastic stretches while being laid along the curve, so when measured on a ruler, it reads longer than the actual curve. Always use non-stretchy thread.' },
  { question: 'Why can\'t we use a straight ruler directly to measure a curved line?', answer: 'A straight ruler cannot bend to follow the curve', options: ['A ruler is too short', 'A straight ruler cannot bend to follow the curve', 'Rulers only measure in metres', 'Rulers are not accurate enough'], explanation: 'A ruler is rigid and straight. It cannot follow bends, so it only measures straight-line distances. The thread-and-ruler method converts curved length into a straight measurement.' },
  { question: 'You measure the same curved line three times with a thread. You get: 12.3 cm, 12.4 cm, 12.3 cm. What should you record as your answer?', answer: '12.3 cm (the most repeated value)', options: ['12.4 cm (the highest value)', '12.0 cm (estimate)', '12.3 cm (the most repeated value)', 'Add all and divide by 3 = 12.33 cm'], explanation: 'In Class 6, the most repeated (most common) value is the most reliable. In higher classes you will also learn to use the average (mean). Here, 12.3 cm appears twice so it is most reliable.' },
];

const mAnswers = [null, null, null, null];
const mSelected = [null, null, null, null];

function selectMOpt(btn, idx, isCorrect) {
  const q = document.getElementById('mq' + idx);
  if (q.dataset.revealed) return;
  q.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  mAnswers[idx] = isCorrect;
  mSelected[idx] = btn;
  document.getElementById('mdot' + idx).classList.add('answered');
}

function showMScore() {
  mAnswers.forEach((ans, idx) => {
    const q = document.getElementById('mq' + idx);
    q.dataset.revealed = '1';
    q.querySelectorAll('.quiz-opt').forEach(b => {
      b.disabled = true;
      b.classList.remove('selected');
      const isCorrect = b.getAttribute('onclick').includes(',true)');
      if (isCorrect) b.classList.add('reveal-correct');
      else if (b === mSelected[idx] && ans === false) b.classList.add('reveal-wrong');
    });
    const fb = document.getElementById('mfb' + idx);
    if (ans === null) { fb.textContent = 'You did not answer this question.'; fb.className = 'quiz-fb show no'; }
    else { fb.textContent = measureChallenges[idx].explanation; fb.className = 'quiz-fb show ' + (ans ? 'ok' : 'no'); }
    const dot = document.getElementById('mdot' + idx);
    dot.classList.remove('answered');
    dot.classList.add(ans === true ? 'correct' : 'wrong');
    q.classList.add(ans === true ? 'answered-correct' : 'answered-wrong');
  });
  const score = mAnswers.filter(v => v === true).length;
  document.getElementById('mscore-num').textContent = score + '/4';
  const msgs = ['Keep practising! Re-read the concept 📚', 'Good try! Review and try again 💪', 'Nice! You almost have it!', 'Excellent! Science star! 🌟'];
  const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '🌟🌟🌟🌟'];
  const grads = ['linear-gradient(135deg,#ef4444,#f97316)', 'linear-gradient(135deg,#f97316,#facc15)', 'linear-gradient(135deg,#3b82f6,#10b981)', 'linear-gradient(135deg,#10b981,#059669)'];
  document.getElementById('mscore-msg').textContent = msgs[score];
  document.getElementById('mscore-stars').textContent = stars[score];
  const sc = document.getElementById('mscore-card');
  sc.style.background = grads[score];
  document.getElementById('mscore-bg').style.background = grads[score];
  sc.classList.add('show');
  sc.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetMQuiz() {
  for (let i = 0; i < 4; i++) { mAnswers[i] = null; mSelected[i] = null; }
  document.querySelectorAll('[id^="mq"]').forEach(q => {
    delete q.dataset.revealed;
    q.classList.remove('answered-correct', 'answered-wrong');
    q.querySelectorAll('.quiz-opt').forEach(b => { b.disabled = false; b.classList.remove('selected', 'reveal-correct', 'reveal-wrong'); });
    const id = q.id;
    const fb = document.getElementById('mfb' + id.replace('mq', ''));
    if (fb) fb.className = 'quiz-fb';
    const dot = document.getElementById('mdot' + id.replace('mq', ''));
    if (dot) { dot.className = 'qp-dot'; dot.textContent = parseInt(id.replace('mq', '')) + 1; }
  });
  document.getElementById('mscore-card').classList.remove('show');
}

// ── QUIZ ──
const qAnswers = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };
const qSelectedBtn = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };
const qFeedback = {
  qz1: { ok: 'Correct! Thread is flexible and can follow curves exactly — then straightened on a ruler to get the measurement.', no: 'Incorrect. A thread is used because it is flexible and can follow any curved shape. A ruler, string (if elastic), or scale cannot do this.' },
  qz2: { ok: 'Excellent! Curved lines cannot be measured directly with a ruler. The thread acts as a "flexible ruler" that takes the shape of the curve.', no: 'Incorrect. We use the thread method because straight scales cannot bend and follow curved paths — they can only measure straight distances.' },
  qz3: { ok: 'Correct! Non-stretchy thread is essential — elastic thread stretches during placement and gives a false (longer) reading.', no: 'Incorrect! Elastic thread stretches while being pressed along the curve, making it appear longer when measured on a ruler. Always use non-stretchy thread.' },
  qz4: { ok: 'Perfect! cm (centimetres) is the standard unit for such measurements. We can also use mm for very small curves.', no: 'Incorrect. Length is measured in cm (centimetres) or mm (millimetres). Grams measure mass and litres measure volume.' },
  qz5: { ok: 'Correct! After the thread is placed along the curve and the end marked, it is straightened against a ruler to read the length.', no: 'Incorrect. After tracing the curve, we straighten the thread on a ruler (scale) to measure its length in centimetres.' },
  qz6: { ok: 'Great! The thread method is widely used in geography to measure river lengths, road lengths, and coastlines on maps.', no: 'Incorrect. The thread method is especially useful in geography — measuring river lengths, roads, and irregular coastlines on maps.' },
};

function selectOpt(btn, qid, isCorrect) {
  const q = document.getElementById(qid);
  if (q.dataset.revealed) return;
  q.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  qAnswers[qid] = isCorrect;
  qSelectedBtn[qid] = btn;
  document.getElementById('dot-' + qid).classList.add('answered');
}

function showScore() {
  Object.keys(qAnswers).forEach(qid => {
    const q = document.getElementById(qid);
    q.dataset.revealed = '1';
    const isCorrect = qAnswers[qid];
    q.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (btn.getAttribute('onclick').includes(',true)')) btn.classList.add('reveal-correct');
      else if (btn === qSelectedBtn[qid] && isCorrect === false) btn.classList.add('reveal-wrong');
    });
    const fb = document.getElementById('fb-' + qid);
    if (isCorrect === null) { fb.textContent = 'You did not answer this question.'; fb.className = 'quiz-fb show no'; }
    else { fb.textContent = qFeedback[qid][isCorrect ? 'ok' : 'no']; fb.className = 'quiz-fb show ' + (isCorrect ? 'ok' : 'no'); }
    const dot = document.getElementById('dot-' + qid);
    dot.classList.remove('answered');
    dot.classList.add(isCorrect === true ? 'correct' : 'wrong');
    q.classList.add(isCorrect === true ? 'answered-correct' : 'answered-wrong');
  });
  const score = Object.values(qAnswers).filter(v => v === true).length;
  document.getElementById('score-num').textContent = score + '/6';
  const msgs = ['Review the concept and try again! 📚', 'Good start! Keep practising 💪', 'Nice effort! Almost there 🙂', 'Great work! You know this well!', 'Superb! Almost expert level 🌟', 'Perfect! Outstanding Science Star! 🏆'];
  const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '🌟🌟🌟🌟🌟'];
  const grads = ['linear-gradient(135deg,#ef4444,#f97316)', 'linear-gradient(135deg,#f97316,#facc15)', 'linear-gradient(135deg,#3b82f6,#8b5cf6)', 'linear-gradient(135deg,#22c55e,#10b981)', 'linear-gradient(135deg,#10b981,#059669)', 'linear-gradient(135deg,#8b5cf6,#10b981)'];
  document.getElementById('score-msg').textContent = msgs[score];
  document.getElementById('score-stars').textContent = stars[score];
  const sc = document.getElementById('score-card');
  sc.style.background = grads[score];
  document.getElementById('score-bg').style.background = grads[score];
  sc.classList.add('show');
  sc.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetQuiz() {
  Object.keys(qAnswers).forEach(k => { qAnswers[k] = null; qSelectedBtn[k] = null; });
  document.querySelectorAll('.quiz-q').forEach(q => {
    delete q.dataset.revealed;
    q.classList.remove('answered-correct', 'answered-wrong');
    q.querySelectorAll('.quiz-opt').forEach(b => { b.disabled = false; b.classList.remove('selected', 'reveal-correct', 'reveal-wrong'); });
    const qid = q.id;
    if (!qid.startsWith('qz')) return;
    const fb = document.getElementById('fb-' + qid);
    if (fb) fb.className = 'quiz-fb';
    const dot = document.getElementById('dot-' + qid);
    if (dot) { dot.className = 'qp-dot'; dot.textContent = qid.replace('qz', ''); }
  });
  document.getElementById('score-card').classList.remove('show');
}