// ---- AUDIO CHIP CONTEXT ----
const soundEngine = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(type) {
  let osc = soundEngine.createOscillator(); let amp = soundEngine.createGain();
  osc.connect(amp); amp.connect(soundEngine.destination);
  if(type === 'correct') {
    osc.frequency.setValueAtTime(523.25, soundEngine.currentTime);
    osc.frequency.setValueAtTime(659.25, soundEngine.currentTime + 0.1);
    amp.gain.setValueAtTime(0.06, soundEngine.currentTime);
    osc.start(); osc.stop(soundEngine.currentTime + 0.25);
  } else {
    osc.frequency.setValueAtTime(220.00, soundEngine.currentTime);
    amp.gain.setValueAtTime(0.06, soundEngine.currentTime);
    osc.start(); osc.stop(soundEngine.currentTime + 0.2);
  }
}

// ---- TAB NAVIGATION ENGINE ----
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  if(btn) btn.classList.add('active');
}

// ---- TIMELINE CONCEPTS DATA PANEL ----
const timelineData = [
  { emoji: "📏", title: "Welcome to Measurement Masterclass", desc: "Let's learn how to measure things using a simple wooden ruler without making any silly mistakes!" },
  { emoji: "0️⃣", title: "Step 1: Align the Zero Mark", desc: "Always place one end of your object exactly at the 0 cm mark line. Never start blindly from the plastic edge of the scale!" },
  { emoji: "📏", title: "Step 2: Keep It Straight and Flat", desc: "Make sure the ruler is placed perfectly flat and touching along the item. If the ruler is crooked or tilted, your reading goes wrong!" },
  { emoji: "👁️", title: "Step 3: Keep Your Eyes Directly Overhead", desc: "Look straight down from vertically above the reading mark. Looking at an angle from left or right creates a false view called parallax error!" },
  { emoji: "📝", title: "Step 4: Write Down the Units", desc: "A number without a unit has no meaning! Always record measurements with proper labels like 5 cm or 55 mm." }
];

let activeSlide = 0;
let slideInterval = null;

function updateSlideView() {
  const item = timelineData[activeSlide];
  document.getElementById('slide-emoji').textContent = item.emoji;
  document.getElementById('slide-title').textContent = item.title;
  document.getElementById('slide-desc').textContent = item.desc;
  document.getElementById('slide-counter').textContent = `Step ${activeSlide + 1} / ${timelineData.length}`;
  document.getElementById('slide-progress').style.width = `${((activeSlide + 1) / timelineData.length) * 100}%`;
  document.getElementById('slide-prev-btn').disabled = (activeSlide === 0);
  document.getElementById('slide-next-btn').disabled = (activeSlide === timelineData.length - 1);
}

function moveSlide(dir) {
  activeSlide += dir;
  if(activeSlide < 0) activeSlide = 0;
  if(activeSlide >= timelineData.length) activeSlide = timelineData.length - 1;
  updateSlideView();
}

function restartSlide() {
  activeSlide = 0;
  clearInterval(slideInterval);
  document.getElementById('slide-auto-btn').textContent = "▶️ Auto Play";
  updateSlideView();
}

function jumpToStep(idx) {
  activeSlide = idx;
  updateSlideView();
  switchTab('concepts', document.querySelectorAll('.nav-btn')[0]);
}

function toggleAutoPlay() {
  const btn = document.getElementById('slide-auto-btn');
  if(slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    btn.textContent = "▶️ Auto Play";
  } else {
    btn.textContent = "⏸️ Pause";
    slideInterval = setInterval(() => {
      if(activeSlide < timelineData.length - 1) moveSlide(1);
      else restartSlide();
    }, 2500);
  }
}

// ---- MATHEMATICALLY ACCURATE RULER & OBJECT SIMULATOR ----
const BOX_WIDTH = 600; // Fixed coordinate canvas width
const TOTAL_CM = 15;
const UNIT_PIXELS = BOX_WIDTH / TOTAL_CM; // Exact 40 pixels per 1 centimetre

function renderLabWorkspace() {
  const scaleHost = document.getElementById('svg-ruler-scale');
  
  // Render Yellow Scale background vector box (Y-offset starts at 60px)
  let scaleHTML = `<rect x="0" y="60" width="${BOX_WIDTH}" height="50" rx="6" fill="#fde68a" stroke="#d97706" stroke-width="2.5"/>`;
  
  for (let i = 0; i <= TOTAL_CM; i++) {
    const markX = i * UNIT_PIXELS;
    // Main long centimetre line marks
    scaleHTML += `<line x1="${markX}" y1="60" x2="${markX}" y2="92" stroke="#92400e" stroke-width="2.5"/>`;
    scaleHTML += `<text x="${markX + 3}" y="104" font-size="12" fill="#92400e" font-family="Nunito" font-weight="900">${i}</text>`;
    
    if (i < TOTAL_CM) {
      // Small Millimetre subdivs
      for(let sub = 1; sub <= 9; sub++) {
        const subX = markX + (sub * (UNIT_PIXELS / 10));
        const subH = (sub === 5) ? 82 : 72; // 0.5 cm line marker is slightly longer
        scaleHTML += `<line x1="${subX}" y1="60" x2="${subX}" y2="${subH}" stroke="#b45309" stroke-width="1.2"/>`;
      }
    }
  }
  scaleHost.innerHTML = scaleHTML;
}

// FIXED LOGIC: Object is drawn directly inside the same SVG grid to guarantee mathematical alignment
function selectItem(cardIdx, label, cmVal) {
  document.querySelectorAll('#tab-simulator .info-card').forEach(c => c.classList.remove('active'));
  document.getElementById('btn-obj-' + cardIdx).classList.add('active');
  
  const objGroup = document.getElementById('svg-object-group');
  const exactTargetPixels = cmVal * UNIT_PIXELS; // Perfectly matches ruler coordinate system!
  
  // Draw the blue object bar block inside SVG space directly above ruler
  objGroup.innerHTML = `
    <g style="transition: all 0.4s ease;">
      <rect x="0" y="15" width="${exactTargetPixels}" height="35" rx="6" fill="url(#objGradient)" stroke="#4338ca" stroke-width="2" style="transition: width 0.4s ease;"/>
      <text x="12" y="37" fill="#ffffff" font-size="12" font-family="Nunito" font-weight="bold">${label}</text>
    </g>
    <defs>
      <linearGradient id="objGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#4338ca" />
      </linearGradient>
    </defs>
  `;
  
  document.getElementById('live-meas-text').textContent = `${cmVal.toFixed(1)} cm`;
}

// ---- MULTI-QUESTION BRAIN QUIZ ENGINE ----
let currentQIdx = 0;
let userScores = [null, null, null, null];

function changeQ(step) {
  document.getElementById(`qbox-${currentQIdx}`).classList.remove('active');
  currentQIdx += step;
  if(currentQIdx < 0) currentQIdx = 0;
  if(currentQIdx > 3) currentQIdx = 3;
  document.getElementById(`qbox-${currentQIdx}`).classList.add('active');
}

function jumpToQuestion(idx) {
  document.getElementById(`qbox-${currentQIdx}`).classList.remove('active');
  currentQIdx = idx;
  document.getElementById(`qbox-${currentQIdx}`).classList.add('active');
}

function submitAns(qNum, isCorrect, clickedBtn) {
  const qContainer = document.getElementById(`qbox-${qNum}`);
  qContainer.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
  clickedBtn.classList.add('selected');
  
  userScores[qNum] = isCorrect;
  document.getElementById(`dot-${qNum}`).classList.add('answered');
  
  const feedback = document.getElementById(`qfb-${qNum}`);
  if(isCorrect) {
    feedback.textContent = "🎉 Awesome! Your answer is 100% correct!";
    feedback.className = "quiz-fb show ok";
    playBeep('correct');
  } else {
    feedback.textContent = "❌ Uh oh! That's incorrect. Try reviewing the Concepts page!";
    feedback.className = "quiz-fb show no";
    playBeep('wrong');
  }
}

function finishQuiz() {
  let rightCount = 0;
  for(let i = 0; i < 4; i++) {
    const dot = document.getElementById(`dot-${i}`);
    dot.classList.remove('correct', 'wrong');
    if(userScores[i] === true) { rightCount++; dot.classList.add('correct'); }
    else { dot.classList.add('wrong'); }
  }
  
  document.getElementById('s-num').textContent = `${rightCount} / 4 Right`;
  const box = document.getElementById('final-score-box');
  const starHost = document.getElementById('s-stars');
  const msgHost = document.getElementById('s-msg');
  
  if(rightCount === 4) {
    starHost.textContent = "⭐⭐⭐⭐"; msgHost.textContent = "Incredible! You are a Measurement Master Ninja! 🏆";
    box.style.background = "linear-gradient(135deg, #059669, #22c55e)";
  } else if(rightCount >= 2) {
    starHost.textContent = "⭐⭐"; msgHost.textContent = "Good job! Let's practice more to get 4 stars! 💪";
    box.style.background = "linear-gradient(135deg, #3b82f6, #4f46e5)";
  } else {
    starHost.textContent = "⭐"; msgHost.textContent = "Don't look sad! Review concepts and try again! 📚";
    box.style.background = "linear-gradient(135deg, #ef4444, #f97316)";
  }
  box.classList.add('show');
}

function reloadQuiz() {
  userScores = [null, null, null, null]; currentQIdx = 0;
  document.querySelectorAll('.quiz-q').forEach((q, i) => {
    q.classList.remove('active'); if(i === 0) q.classList.add('active');
    q.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
    const fb = q.querySelector('.quiz-fb'); fb.className = "quiz-fb"; fb.textContent = "";
  });
  document.querySelectorAll('.qp-dot').forEach(d => d.className = "qp-dot");
  document.getElementById('final-score-box').classList.remove('show');
}

// ---- APP INITIALIZATION ON WINDOW LOAD ----
window.onload = function() {
  updateSlideView();
  renderLabWorkspace();
  // Safe timeout setup for loading the default item onto precision vector tracks
  setTimeout(() => selectItem(0, '✏️ Wooden Pencil', 8.5), 150);
};