// NAVIGATION TAB CONTROLLER
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

// EXPERIMENT SIMULATION PARAMETERS
const envSettings = {
    body: { name: "Clinical Thermometer", isLab: false, tempText: "39.5 °C", barHeight: "55%", info: "Measuring body fever temperature. The liquid expansion has stabilized at 39.5°C." },
    boil: { name: "Laboratory Thermometer", isLab: true, tempText: "98.0 °C", barHeight: "92%", info: "Measuring chemical fluid container. The scale rises near boiling thresholds up to 98.0°C." }
};

let currentEnv = 'body';

function setLiquidEnvironment(envId) {
    currentEnv = envId;
    document.querySelectorAll('.selector-row .select-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + envId).classList.add('active');
    
    const settings = envSettings[envId];
    document.getElementById('mercury-bar').style.height = settings.barHeight;
    document.getElementById('temp-display').textContent = settings.tempText;
    document.getElementById('thermometer-type-lbl').textContent = `Thermometer: ${settings.name}`;
    document.getElementById('thermo-feedback').textContent = settings.info;
}

function simulateRemoval() {
    const feedback = document.getElementById('thermo-feedback');
    const settings = envSettings[currentEnv];
    
    if(settings.isLab) {
        // Lab Thermometer has NO kink, so it drops immediately to room temperature
        document.getElementById('mercury-bar').style.height = "20%";
        document.getElementById('temp-display').textContent = "24.0 °C";
        feedback.textContent = "⚠️ KINK EFFECT DETECTED: Because a laboratory thermometer lacks a kink, the mercury thread drops instantly to room temp (24°C) the moment you pull it out!";
    } else {
        // Clinical Thermometer HAS a kink, so it holds its high reading!
        document.getElementById('mercury-bar').style.height = settings.barHeight;
        document.getElementById('temp-display').textContent = settings.tempText;
        feedback.textContent = "✅ KINK EFFECT DETECTED: The clinical thermometer retains its reading safely! The narrow kink prevents mercury from slipping back down until you jerk it.";
    }
}

// INITIALIZE WORKBENCH PRESET
setLiquidEnvironment('body');

// 6-QUESTION COMPREHENSIVE INTERACTIVE QUIZ MACHINE
const studentAnswers = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };
const optionNodes = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };

const responsesFeedback = {
    qz1: { ok: "Perfect! 37°C is the standard baseline human body setting on the metric scale.", no: "Incorrect. 98.6° is normal on the Fahrenheit scale, but 37°C is the true Celsius equivalent." },
    qz2: { ok: "Spot on! The kink holds the mercury column steady, giving you time to read it safely.", no: "Wrong explanation. The kink keeps the mercury from dropping back down immediately." },
    qz3: { ok: "Excellent! Lab work requires wide operating boundaries ranging from below freezing up to boiling points.", no: "Incorrect. 35°C to 42°C belongs to body clinical models; lab units range from -10°C to 110°C." },
    qz4: { ok: "Wonderful safety understanding! Extreme heat expands mercury past the limits of a clinical frame, shattering it.", no: "Warning. Never expose clinical scales to boiling pots; the high heat will break the glass envelope." },
    qz5: { ok: "Brilliant! Without a kink, the fluid line falls instantly if removed, so you must read it in-place.", no: "No. Taking it out ruins the reading because its mercury level drops immediately without a kink." },
    qz6: { ok: "Exactly! Sharp physical jerks drive the expanded mercury back past the kink into the bulb base.", no: "Incorrect. Shaking it is a physical reset that forces the mercury thread down below normal limits." }
};

function selectOpt(button, questionId, checkStatus) {
    const parentContainer = document.getElementById(questionId);
    parentContainer.querySelectorAll('.quiz-opt').forEach(opt => opt.classList.remove('selected'));
    
    button.classList.add('selected');
    studentAnswers[questionId] = checkStatus;
    optionNodes[questionId] = button;
}

function evaluateHeatQuizScorecard() {
    let scoreTotal = 0;
    
    Object.keys(studentAnswers).forEach(qid => {
        const itemBlock = document.getElementById(qid);
        const wasCorrect = studentAnswers[qid];
        
        if (wasCorrect === true) scoreTotal++;
        
        itemBlock.querySelectorAll('.quiz-opt').forEach(optButton => {
            const checkTrueAttr = optButton.getAttribute('onclick').includes(',true)');
            if (checkTrueAttr) {
                optButton.classList.add('reveal-correct');
            } else if (optButton === optionNodes[qid] && !wasCorrect) {
                optButton.classList.add('reveal-wrong');
            }
        });
        
        const fbContainer = document.getElementById('fb-' + qid);
        fbContainer.style.display = 'block';
        if (wasCorrect === true) {
            fbContainer.textContent = "✅ " + responsesFeedback[qid].ok;
            fbContainer.style.color = '#15803d';
            fbContainer.style.background = '#dcfce7';
        } else {
            fbContainer.textContent = "❌ " + responsesFeedback[qid].no;
            fbContainer.style.color = '#b91c1c';
            fbContainer.style.background = '#fee2e2';
        }
    });

    // UPDATE LIVE SCORE VALUE RATING PANELS
    const valText = document.getElementById('score-text-val');
    const quoteMsg = document.getElementById('score-quote-msg');
    
    valText.textContent = `${scoreTotal} / 6 Right`;
    
    if(scoreTotal === 6) {
        quoteMsg.textContent = "Flawless performance! You have fully mastered thermal instrumentation physics! 🏆🌡️🔬";
    } else if(scoreTotal >= 4) {
        quoteMsg.textContent = "Great job! You clearly understand the functional purpose of the kink structure! 🌟";
    } else {
        quoteMsg.textContent = "Keep practicing! Use the removal button in the simulator workspace to see how the lab thread falls! 📚✨";
    }
}