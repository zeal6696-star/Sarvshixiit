// NAVIGATION MANAGEMENT
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

// CONDUCTORS & INSULATORS LAB TESTING MATRIX
const objectData = {
    key: { name: "Metal Key", emoji: "🔑", type: "Conductor", desc: "Metals allow electric current to pass through freely. The circuit loop is complete and the bulb glows brightly! 🌟" },
    eraser: { name: "Rubber Eraser", emoji: "🧼", type: "Insulator", desc: "Rubber does not conduct electricity. It breaks the path, creating an open circuit, so the bulb stays off. 🛑" },
    clip: { name: "Paper Clip", emoji: "📎", type: "Conductor", desc: "The metallic paper clip works as a neat bridge pathway, letting electricity flow to light up the bulb! 🌟" },
    scale: { name: "Plastic Ruler", emoji: "📏", type: "Insulator", desc: "Plastic blocks electricity from moving forward. This creates an open circuit loop, leaving the bulb off. 🛑" }
};

function testObject(objId, isConductor) {
    // Remove active styles from all cards
    document.querySelectorAll('.info-grid .info-card').forEach(c => c.classList.remove('active'));
    
    // Set clicked item active
    document.getElementById('card-' + objId).classList.add('active');
    
    const data = objectData[objId];
    const gapDisplay = document.getElementById('gap-display');
    const gapLbl = document.getElementById('gap-lbl');
    const bulb = document.getElementById('tester-bulb');
    const bulbLbl = document.getElementById('tester-bulb-lbl');
    const fb = document.getElementById('tester-feedback');
    
    gapDisplay.textContent = data.emoji;
    gapLbl.textContent = `Material: ${data.name}`;
    
    if (isConductor) {
        gapDisplay.classList.add('conducting');
        bulb.classList.add('glow');
        bulbLbl.textContent = "Bulb: GLOWING! 💡";
        bulbLbl.style.color = "#22c55e";
        fb.textContent = `🎉 [${data.type}] - ${data.desc}`;
    } else {
        gapDisplay.classList.remove('conducting');
        bulb.classList.remove('glow');
        bulbLbl.textContent = "Bulb: Off 🌑";
        bulbLbl.style.color = "#94a3b8";
        fb.textContent = `⚠️ [${data.type}] - ${data.desc}`;
    }
}

// INITIALIZE LAB WITH THE FIRST OBJECT BY DEFAULT
testObject('key', true);

// 6-QUESTION INTERACTIVE QUIZ MECHANICS WITH DYNAMIC PANEL TRACKING
const studentAnswers = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };
const optionNodes = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };

const responsesFeedback = {
    qz1: { ok: "Perfect! Metals like steel are excellent conductors that complete circuit lines.", no: "Incorrect. Matches are dry wood and nylon is synthetic plastic; both are strong insulators." },
    qz2: { ok: "Exactly! Insulators safely enclose electrical pathways to lock currents inside.", no: "Wrong choice. Conductors favor current migration. Materials that block flow are Insulators." },
    qz3: { ok: "Brilliant safety rule! The rubber shell sets up an insulation defense wall for your hand.", no: "No. Colors are secondary; handles feature rubber purely to shield users from live shock loops." },
    qz4: { ok: "Accurate body science! Our water and chemical contents let electricity flow through us easily.", no: "Warning! The human body is a highly functional conductor. That is why shocks are hazardous." },
    qz5: { ok: "Great observation! Moisture or perspiration on fabric fiber lets power jump through easily.", no: "No. Rubber stays non-porous and insulated, while soft cotton can trap moisture and conduct electricity." },
    qz6: { ok: "Incredibly smart insight! High-voltage power lines would leak electricity directly into our streets!", no: "Think deeper. If the open atmosphere conducted current, electricity would turn lethal instantly." }
};

function selectOpt(button, questionId, checkStatus) {
    const parentContainer = document.getElementById(questionId);
    parentContainer.querySelectorAll('.quiz-opt').forEach(opt => opt.classList.remove('selected'));
    
    button.classList.add('selected');
    studentAnswers[questionId] = checkStatus;
    optionNodes[questionId] = button;
}

function evaluateQuizScoreboard() {
    let totalScore = 0;
    let attemptedCount = 0;
    
    Object.keys(studentAnswers).forEach(qid => {
        if(studentAnswers[qid] !== null) attemptedCount++;
        
        const block = document.getElementById(qid);
        const wasCorrect = studentAnswers[qid];
        
        if (wasCorrect === true) totalScore++;
        
        block.querySelectorAll('.quiz-opt').forEach(optButton => {
            const checkTrueAttr = optButton.getAttribute('onclick').includes(',true)');
            if (checkTrueAttr) {
                optButton.classList.add('reveal-correct');
            } else if (optButton === optionNodes[qid] && !wasCorrect) {
                optButton.classList.add('reveal-wrong');
            }
        });
        
        const textFeedback = document.getElementById('fb-' + qid);
        textFeedback.style.display = 'block';
        if (wasCorrect === true) {
            textFeedback.textContent = "✅ " + responsesFeedback[qid].ok;
            textFeedback.style.color = '#15803d';
            textFeedback.style.background = '#dcfce7';
        } else {
            textFeedback.textContent = "❌ " + responsesFeedback[qid].no;
            textFeedback.style.color = '#b91c1c';
            textFeedback.style.background = '#fee2e2';
        }
    });

    // UPDATE INTEGRATED SCORECARD BOX VISUALS (Pattern mirrored from image_dbb142.jpg)
    const displayScoreTxt = document.getElementById('score-text-val');
    const displayQuoteMsg = document.getElementById('score-quote-msg');
    
    displayScoreTxt.textContent = `${totalScore} / 6 Right`;
    
    if(totalScore === 6) {
        displayQuoteMsg.textContent = "Magnificent! You are an official Master of Circuits! 🌟🚀";
    } else if(totalScore >= 4) {
        displayQuoteMsg.textContent = "Wonderful job! You have acquired highly solid foundational physics skills! 👍";
    } else {
        displayQuoteMsg.textContent = "Don't look sad! Review the concept tab files and try your lab tests again! 📚✨";
    }
}