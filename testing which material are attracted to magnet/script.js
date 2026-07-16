// NAVIGATION TAB SWAPPER
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

// SIMULATION PHYSICS SCHEMATIC
const magnetObjects = {
    nail: { name: "Iron Nail", emoji: "🔩", magnetic: true, text: "The magnet creates a strong pulling force! The iron nail flies towards it and sticks firmly. 🎯" },
    spoon: { name: "Plastic Spoon", emoji: "🥄", magnetic: false, text: "Plastic is entirely non-magnetic. The magnet does absolutely nothing, and the spoon stays still. 🛑" },
    coin: { name: "Steel Coin", emoji: "🪙", magnetic: true, text: "Since the coin is alloyed with steel and iron, the magnet snaps it up instantly! 🎯" },
    pencil: { name: "Wood Pencil", emoji: "✏️", magnetic: false, text: "Organic wood shows zero reaction to magnets. No movement detected at all. 🛑" }
};

function testMagnetism(objId, isMagnetic) {
    document.querySelectorAll('.info-grid .info-card').forEach(c => c.classList.remove('active'));
    document.getElementById('card-' + objId).classList.add('active');
    
    const data = magnetObjects[objId];
    const itemDisplay = document.getElementById('object-display');
    const itemLbl = document.getElementById('object-lbl');
    const forceArrow = document.getElementById('force-effect');
    const forceLbl = document.getElementById('force-lbl');
    const statusBox = document.getElementById('magnet-feedback');
    
    itemDisplay.textContent = data.emoji;
    itemLbl.textContent = `Object: ${data.name}`;
    
    if (isMagnetic) {
        itemDisplay.classList.add('attracted');
        forceArrow.textContent = "💥 Pull!";
        forceArrow.classList.add('pulling');
        forceLbl.textContent = "Attracted! ✅";
        forceLbl.style.color = "#22c55e";
        statusBox.textContent = `SUCCESS: [Magnetic Material] - ${data.text}`;
    } else {
        itemDisplay.classList.remove('attracted');
        forceArrow.textContent = "❌ None";
        forceArrow.classList.remove('pulling');
        forceLbl.textContent = "No Force 🛑";
        forceLbl.style.color = "#94a3b8";
        statusBox.textContent = `BLOCKED: [Non-Magnetic Material] - ${data.text}`;
    }
}

// DEFINE DEFAULT PRESET LAUNCH
testMagnetism('nail', true);

// 6-QUESTION INTERACTIVE QUIZ MACHINE RETAINING VISIBLE PANEL RESULTS
const studentAnswers = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };
const optionNodes = { qz1: null, qz2: null, qz3: null, qz4: null, qz5: null, qz6: null };

const responsesFeedback = {
    qz1: { ok: "Excellent! Iron metals react powerfully to standard magnetic force fields.", no: "Incorrect. Synthetic plastic caps and natural leather belts are completely non-magnetic." },
    qz2: { ok: "Perfect definition! Non-magnetic materials never react to magnetic lines.", no: "Think again. Any items that feel zero pull are classified as non-magnetic." },
    qz3: { ok: "Spot on! Lodestone is nature's own raw iron oxide magnet ore compound rock.", no: "Oops. Lodestone is the historic natural rock that led to the discovery of magnets." },
    qz4: { ok: "Brilliant observation! Safety pins and metal pins are made out of steel/iron.", no: "Incorrect. Magnets ignore fabric cotton thread rolls and plastic clothing buttons." },
    qz5: { ok: "Correct! Aluminum foil is a metal, but it doesn't show any standard magnetic pull.", no: "Warning. Iron and Nickel are famous magnetic materials. Aluminum is a non-magnetic metal." },
    qz6: { ok: "Amazing application skill! The magnet lifts the iron dust effortlessly out of the wood chips.", no: "No. Iron retains its properties and can be cleanly pulled out with a magnet." }
};

function selectOpt(button, questionId, checkStatus) {
    const parentContainer = document.getElementById(questionId);
    parentContainer.querySelectorAll('.quiz-opt').forEach(opt => opt.classList.remove('selected'));
    
    button.classList.add('selected');
    studentAnswers[questionId] = checkStatus;
    optionNodes[questionId] = button;
}

function evaluateMagnetQuiz() {
    let scoreTotal = 0;
    
    Object.keys(studentAnswers).forEach(qid => {
        const structuralBlock = document.getElementById(qid);
        const wasCorrect = studentAnswers[qid];
        
        if (wasCorrect === true) scoreTotal++;
        
        structuralBlock.querySelectorAll('.quiz-opt').forEach(optButton => {
            const checkTrueAttr = optButton.getAttribute('onclick').includes(',true)');
            if (checkTrueAttr) {
                optButton.classList.add('reveal-correct');
            } else if (optButton === optionNodes[qid] && !wasCorrect) {
                optButton.classList.add('reveal-wrong');
            }
        });
        
        const feedbackContainer = document.getElementById('fb-' + qid);
        feedbackContainer.style.display = 'block';
        if (wasCorrect === true) {
            feedbackContainer.textContent = "✅ " + responsesFeedback[qid].ok;
            feedbackContainer.style.color = '#15803d';
            feedbackContainer.style.background = '#dcfce7';
        } else {
            feedbackContainer.textContent = "❌ " + responsesFeedback[qid].no;
            feedbackContainer.style.color = '#b91c1c';
            feedbackContainer.style.background = '#fee2e2';
        }
    });

    // REFRESH PANEL INTERFACE SCORES
    const valText = document.getElementById('score-text-val');
    const quoteMsg = document.getElementById('score-quote-msg');
    
    valText.textContent = `${scoreTotal} / 6 Right`;
    
    if(scoreTotal === 6) {
        quoteMsg.textContent = "Outstanding! You have a flawless understanding of magnets! 🏆🎯";
    } else if(scoreTotal >= 4) {
        quoteMsg.textContent = "Superb effort! You know your magnetic metals very well! 🌟";
    } else {
        quoteMsg.textContent = "Keep practicing! Review the simulator board to find out which items attract! 📚✨";
    }
}