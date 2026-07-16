// NAVIGATION CONTROL PANEL
function showTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('tab-' + id).classList.add('active');
    
    const tabNames = ['concepts', 'anim', 'quiz', 'summary'];
    const index = tabNames.indexOf(id);
    if(index !== -1) {
        document.querySelectorAll('.nav-btn')[index].classList.add('active');
    }
}

// EXPERIMENT LOGIC ARCHITECTURE
let activePhase = 'rub'; // 'rub' or 'float'
let rubCount = 0;
let isMagnetized = false;

function setCompassPhase(phase) {
    activePhase = phase;
    document.querySelectorAll('.selector-row .select-btn').forEach(b => b.classList.remove('active'));
    
    const needle = document.getElementById('sim-needle');
    const stage = document.getElementById('stage-viewport');
    const actionBtn = document.getElementById('action-btn');
    const lbl = document.getElementById('stage-status-lbl');
    const fb = document.getElementById('compass-feedback');
    
    if(phase === 'rub') {
        document.getElementById('btn-rub').classList.add('active');
        stage.classList.remove('water-mode');
        needle.style.transform = "rotate(0deg)";
        needle.textContent = "📍";
        actionBtn.style.display = "block";
        actionBtn.textContent = "Rub Magnet over Needle";
        lbl.textContent = isMagnetized ? "Needle Status: Magnetized! ⚡" : "Needle Status: Ordinary Steel";
        fb.textContent = isMagnetized ? "Needle is already magnetized. Click Step 2 to float it in water!" : "Click the orange button to rub the bar magnet along the needle 30 times.";
    } else {
        document.getElementById('btn-float').classList.add('active');
        stage.classList.add('water-mode');
        actionBtn.textContent = "Simulate Disturbance Force";
        
        if(isMagnetized) {
            needle.textContent = "🧭";
            // Auto align pointing to North (Upward 0deg)
            needle.style.transform = "rotate(0deg)";
            lbl.textContent = "Compass Status: Aligned to North! 🧭";
            fb.textContent = "🎉 Brilliant! Because the needle was properly magnetized, it floats on water and lines up perfectly North-South along Earth's field vectors!";
        } else {
            needle.textContent = "📍";
            // Unmagnetized needle floats randomly
            needle.style.transform = "rotate(115deg)";
            lbl.textContent = "Compass Status: Deflected Randomly ❌";
            fb.textContent = "⚠️ Oops! The ordinary steel needle floats, but it spins randomly. It was not magnetized in Step 1, so it cannot detect Earth's fields.";
        }
    }
}

function executePhaseAction() {
    const lbl = document.getElementById('stage-status-lbl');
    const fb = document.getElementById('compass-feedback');
    const needle = document.getElementById('sim-needle');
    
    if(activePhase === 'rub') {
        rubCount += 10;
        if(rubCount >= 30) {
            isMagnetized = true;
            lbl.textContent = "Needle Status: Magnetized! ⚡";
            fb.textContent = "⚡ Success! The steel needle has turned into a temporary magnet. Proceed to Step 2 to see it align.";
        } else {
            fb.textContent = `Keep rubbing! Sliding stroke count: ${rubCount}/30 completed.`;
        }
    } else {
        // Disturbance action in floating mode
        if(isMagnetized) {
            fb.textContent = "🌀 You tapped the workspace tray! The compass spins wildly due to the force disturbance...";
            needle.style.transform = "rotate(180deg)";
            setTimeout(() => {
                needle.style.transform = "rotate(0deg)";
                fb.textContent = "🧭 Freely pivoting back! The needle automatically auto-corrects and lines back up true North.";
            }, 1800);
        } else {
            fb.textContent = "The needle turns randomly since it lacks magnetic properties.";
            needle.style.transform = "rotate(240deg)";
        }
    }
}

// 6-QUESTION COMPREHENSIVE QUIZ EVALUATION (With embedded scorecard template)
const studentAnswers = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };
const optionNodes = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };

const responsesFeedback = {
    qz1: { ok: "Perfect! Freely pivoting magnets always point along the planet's geographic North-South line.", no: "Incorrect. Suspended magnets ignore East-West and lock strictly into North-South alignments." },
    qz2: { ok: "Spot on! Sliding it loops alignment in one single direction. Back-and-forth moves erase magnetization.", no: "Wrong technique. Shifting back and forth cancels the atomic adjustments out. Stick to a single direction." },
    qz3: { ok: "Excellent logic! Water keeps the system floating, creating a smooth pivot with minimal friction.", no: "No. The water and cork act purely to reduce friction, allowing the needle to spin freely." },
    qz4: { ok: "Wonderful physics intuition! Strong nearby magnets override the weak background pull of Earth.", no: "Think again. The close magnet creates a powerful localized pull, distorting your true North line." },
    qz5: { ok: "Great history knowledge! Natural magnetite ore blocks were universally called lodestones.", no: "No. Lodestone is the historic name for natural black magnetic rock pieces used by early sailors." },
    qz6: { ok: "Superb material science! Plastic does not have magnetic domains, so it cannot be magnetized.", no: "Incorrect. Only materials containing iron, steel, cobalt, or nickel can pick up magnetic paths." }
};

function selectOpt(button, questionId, checkStatus) {
    const parentContainer = document.getElementById(questionId);
    parentContainer.querySelectorAll('.quiz-opt').forEach(opt => opt.classList.remove('selected'));
    
    button.classList.add('selected');
    studentAnswers[questionId] = checkStatus;
    optionNodes[questionId] = button;
}

function evaluateCompassScorecard() {
    let finalScore = 0;
    
    Object.keys(studentAnswers).forEach(qid => {
        const itemBlock = document.getElementById(qid);
        const wasCorrect = studentAnswers[qid];
        
        if (wasCorrect === true) finalScore++;
        
        itemBlock.querySelectorAll('.quiz-opt').forEach(optButton => {
            const checkTrueAttr = optButton.getAttribute('onclick').includes(',true)');
            if (checkTrueAttr) {
                optButton.classList.add('reveal-correct');
            } else if (optButton === optionNodes[qid] && !wasCorrect) {
                optButton.classList.add('reveal-wrong');
            }
        });
        
        const fbText = document.getElementById('fb-' + qid);
        fbText.style.display = 'block';
        if (wasCorrect === true) {
            fbText.textContent = "✅ " + responsesFeedback[qid].ok;
            fbText.style.color = '#15803d';
            fbText.style.background = '#dcfce7';
        } else {
            fbText.textContent = "❌ " + responsesFeedback[qid].no;
            fbText.style.color = '#b91c1c';
            fbText.style.background = '#fee2e2';
        }
    });

    // UPDATE INTEGRATED SCORE PANEL DISPLAY
    const valText = document.getElementById('score-text-val');
    const quoteMsg = document.getElementById('score-quote-msg');
    
    valText.textContent = `${finalScore} / 6 Correct`;
    
    if(finalScore === 6) {
        quoteMsg.textContent = "Incredible work! You are a brilliant Navigator of Science! 🏆🧭🚢";
    } else if(finalScore >= 4) {
        quoteMsg.textContent = "Great job! You understand how magnetic fields line up perfectly! 🌟";
    } else {
        quoteMsg.textContent = "Keep learning! Try out the single-stroke magnetization process in Step 1 again! 📚✨";
    }
}