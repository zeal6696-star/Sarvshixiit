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

// ELECTRIC CIRCUIT SIMULATION STATES
let isSwitchOn = false;
let currentMode = 'perfect'; // can be 'perfect' or 'broken'

function setCircuitState(mode) {
    currentMode = mode;
    document.querySelectorAll('.selector-row .select-btn').forEach(b => b.classList.remove('active'));
    
    if (mode === 'perfect') {
        document.getElementById('btn-perfect').classList.add('active');
    } else if (mode === 'broken') {
        document.getElementById('btn-broken').classList.add('active');
    }
    updateCircuitOutput();
}

function toggleSwitch() {
    isSwitchOn = !isSwitchOn;
    const sw = document.getElementById('switch-device');
    
    if (isSwitchOn) {
        sw.textContent = "ON";
        sw.classList.add('on');
    } else {
        sw.textContent = "OFF";
        sw.classList.remove('on');
    }
    updateCircuitOutput();
}

function updateCircuitOutput() {
    const bulb = document.getElementById('bulb-element');
    const bulbLbl = document.getElementById('bulb-lbl');
    const feedback = document.getElementById('sim-feedback');
    
    if (currentMode === 'broken') {
        // Wire is physically broken, it will never work regardless of switch state
        bulb.classList.remove('glow');
        bulbLbl.textContent = "Bulb: Off";
        feedback.textContent = "⚠️ There is a break or gap in your path lines! This creates an Open Circuit, so electric current cannot move at all.";
        return;
    }
    
    // If the wire is intact ('perfect')
    if (isSwitchOn) {
        bulb.classList.add('glow');
        bulbLbl.textContent = "Bulb: GLOWING! 🌟";
        feedback.textContent = "🎉 Awesome! The path loop is perfectly unbroken and the switch is ON. This forms a Closed Circuit, letting electricity light up the bulb!";
    } else {
        bulb.classList.remove('glow');
        bulbLbl.textContent = "Bulb: Off";
        feedback.textContent = "The circuit wire path is fine, but the switch gate is open (OFF state). Close the switch to activate current movement.";
    }
}

// 6-QUESTION COMPREHENSIVE INTERACTIVE QUIZ MECHANICS
const studentAnswers = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };
const optionNodes = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };

const responsesFeedback = {
    qz1: { ok: "Spot on! An Open Circuit contains an empty gap or cut wire that blocks electric power flow.", no: "Think again! A closed path has zero breaks. Any gap means it is an 'Open' circuit style." },
    qz2: { ok: "Perfect! Every cell carries a designated positive terminal (+) plus a separate negative terminal (-).", no: "Incorrect. Cells always require a pair of distinct poles (+ and -) to generate voltage push." },
    qz3: { ok: "Great vocabulary! The thin high-resistance wire loops are officially designated as the filament.", no: "Wrong selection. It is called the filament, which glows when electricity heats it up." },
    qz4: { ok: "Superb science knowledge! A fused state breaks the circular path permanently, making it open.", no: "No. When the delicate loop snaps completely, it is universally termed a 'fused' lamp." },
    qz5: { ok: "Exactly right! A switch lets us connect or break the power loops at our convenience safely.", no: "Incorrect choice. A cell holds chemical voltage, but only a switch regulates system toggle gaps." },
    qz6: { ok: "Perfect rule! By standard physics convention, current travels outward from Positive (+) over to Negative (-).", no: "Oops! Conventional electric flow maps point outward from the Positive terminal heading around to the Negative pole." }
};

function selectOpt(button, questionId, checkStatus) {
    const parentContainer = document.getElementById(questionId);
    parentContainer.querySelectorAll('.quiz-opt').forEach(opt => opt.classList.remove('selected'));
    
    button.classList.add('selected');
    studentAnswers[questionId] = checkStatus;
    optionNodes[questionId] = button;
}

function showScore() {
    let totalScore = 0;
    Object.keys(studentAnswers).forEach(qid => {
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
    
    alert(`Quiz submission completed! Your overall score is: ${totalScore} / 6`);
}