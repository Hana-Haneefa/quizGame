let currentQuestionIndex = 0;
        let shuffledQuestions = [];
        let scores = {
            rumi: 0,
            mira: 0,
            zoey: 0,
           
        };


        let speechSynthesis = window.speechSynthesis;
        let currentUtterance = null;

        const characters = {
            rumi: {
                name: "Rumi",
                emoji: "🌸",
                description: "You are RUMI! You're the mystical strategist of the group. Wise beyond your years, you prefer to think before you act and have a deep connection to the spiritual side of demon hunting. Your powerful vocals and elegant stage presence captivate audiences, and your teammates rely on your wisdom in battle."
            },
            mira: {
                name: "Mira",
                emoji: "💎",
                description: "You are MIRA! You're the balanced leader and heart of the group. You excel at bringing people together and have well-rounded skills both on stage and in battle. Your natural charisma and genuine care for others makes you a beloved performer and trusted teammate."
            },
            zoey: {
                name: "Zoey",
                emoji: "⚡",
                description: "You are ZOEY! You're the fierce warrior and energetic performer of the group. Quick-thinking and bold, you're not afraid to take risks and push boundaries. Your dynamic stage presence and fearless fighting style inspire others to be brave and follow their dreams."
            }
        };

        const questionPool = [
            {
                question: "What's your preferred fighting style when facing demons?",
                answers: [
                    { text: "Strategic and calculated, using magic from a distance", character: "rumi" },
                    { text: "Balanced approach with both weapons and spells", character: "mira" },
                    { text: "Fast and aggressive, up close with dual blades", character: "zoey"}
                ]
            },
            {
                question: "How do you handle stage fright before a big performance?",
                answers: [
                    { text: "Meditate and visualize success calmly", character: "rumi" },
                    { text: "Practice one more time and trust your training ", character: "mira" },
                    { text: "Channel the nervous energy into excitement", character: "zoey" }
                ]
            },
            {
                question: "What's your ideal way to spend a day off?",
                answers: [
                    { text: "Reading ancient texts and studying new skills", character: "rumi" },
                    { text: "Training with friends or exploring new places", character: "mira" },
                    { text: "Dancing, shopping or relaxing on the coauch", character: "zoey" }
                ]
            },
            {
                question: "What will be your demon slaying weapon?",
                answers: [
                    { text: "Sword with the power of voice", character: "rumi" },
                    { text: "Blessed sword that can shift into different forms", character: "mira" },
                    { text: "Twin flaming swords that fast as lightning", character: "zoey" }
                ]
            },
            {
                question: "How do you prefer to work in a team?",
                answers: [
                    { text: "As the strategist who plans the mission", character: "rumi" },
                    { text: "As the mediator who keeps the everyone united", character: "mira" },
                    { text: "As the happy one who lifts everyone's spirits", character: "zoey" }
                ]
            },
            {
                question: "What's your biggest strength as a performer?",
                answers: [
                    { text: "Powerful vocals", character: "rumi" },
                    { text: "Well-rounded skills and stage presence", character: "mira" },
                    { text: "Dynamic dancing and rapping", character: "zoey" }
                ]
            },
            {
                question: "When facing a powerful demon your first instinct is to?",
                answers: [
                    { text: "Analyze its weaknesses before attacking", character: "rumi" },
                    { text: "Coordingate your team", character: "mira" },
                    { text: "Strike fast before it can react", character: "zoey" }
                ]
            },
            {
                question: "Your fashion style on stage would be?",
                answers: [
                   { text: "Elegant and modern", character: "rumi" },
                    { text: "Chic and stylish", character: "mira" },
                    { text: "Bold and edgy with lots of layers", character: "zoey" }
                ]
            },
            {
                question: "How do you handle criticism from fans or judges?",
                answers: [
                    { text: "Reflect deeply and use it for growth", character: "rumi" },
                    { text: "Listen carefully and find the constructive parts", character: "mira" },
                    { text: "Let it fuel your determination to prove them wrong", character: "zoey" }
                ]
            },
            {
                question: "Your ideal K-pop concept would be?",
                answers: [
                    { text: "Heroic and inspirational", character: "rumi" },
                    { text: "Dark and mysterious", character: "mira" },
                    { text: "Bold and energetic", character: "zoey" }
                ]
            },
            {
                question: "When learning new choreography, you?",
                answers: [
                    { text: "Study the moves carefully before practicing", character: "rumi" },
                    { text: "Learn step by step with steady progress", character: "mira" },
                    { text: "Jump right in and learn through repetition", character: "zoey" }
                ]
            },
            {
                question: "Your role in the group's decision making is?",
                answers: [
                    { text: "The diplomat who helps reach consensus", character: "rumi" },
                    { text: "The wise advisor who considers all angles", character: "mira" },
                    { text: "The voice of bold, quick decisions", character: "zoey" }
                ]
            },
            {
                question: "What motivates you most as a demon hunter?",
                answers: [
                    { text: "Fulfill the duty as a hunter to seal the Honmoon", character: "rumi" },
                    { text: "Protect the innocent from harm", character: "mira" },
                    { text: "The trill of the hunt and testing my limits", character: "zoey" }
                ]
            },
            {
                question: "Your pre-battle ritual would be?",
                answers: [
                    { text: "Casting protective wards and blessing your weapons", character: "rumi" },
                    { text: "Checking your gear and coordinating with teammates", character: "mira" },
                    { text: "Pumping up with music and warming up my body", character: "zoey" }
                ]
            },
            {
                question: "How do you recharge after a difficult battle or performance?",
                answers: [
                    { text: "Quiet meditation or studying in solitude", character: "rumi" },
                    { text: "Spending quality time with close friends", character: "mira" },
                    { text: "Taking a rest while eating lots of sweets", character: "zoey" }
                ]
            },
            {
                question: "Your greatest fear as a performer is?",
                answers: [
                    { text: "Not accepting as who you really are", character: "rumi"},
                    { text: "Letting down your fans and teammates", character: "mira" },
                    { text: "Losing your passion and not belonging to it", character: "zoey" }

                ]
            },
            {
                question: "What scares demons the most about you?",
                answers: [
                    { text: "My knowledge of their true names", character: "rumi" },
                    { text: "My ability to purify their darkness", character: "mira" },
                    { text: "My ability to strike from anywhere", character: "zoey" }
                ]
            },
            {
                question: "Your signature dance move would be?",
                answers: [
                    { text: "Graceful spins with mystical hand gestures", character: "rumi" },
                    { text: "Powerful jumps with precise formations", character: "mira" },
                    { text: "Lightning-fast spins and acrobatic flips", character: "zoey" }
                ]
            },
            {
                question: "How do you connect with your fans?",
                answers: [
                    { text: "Through deep, meaningful lyrics and performance", character: "rumi" },
                    { text: "By being genuine and relatable in interaction", character: "mira" },
                    { text: "With high-energy and getting them hype up", character: "zoey" }
                ]
            },
            {
                question: "Your ultimate goal as a demon hunter is?",
                answers: [
                    { text: "Mastering the power and becoming a legend", character: "rumi" },
                    { text: "Building a legacy of protecting others", character: "mira" },
                    { text: "Breaking boundaries and showing the world your power", character: "zoey" }
                ]
            }
        ];

        function homeBack() {
    window.history.back(); // Redirect to the homepage
}

        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function startQuiz() {
            shuffledQuestions = shuffleArray(questionPool).slice(0, 20);
            currentQuestionIndex = 0;
            scores = {
                rumi: 0,
                mira: 0,
                zoey: 0
            };
            
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('quizContent').style.display = 'block';
            showQuestion();
            updateProgress();
            updateQuestionCounter();
        }

        function showQuestion() {
            const question = shuffledQuestions[currentQuestionIndex];
            document.getElementById('questionText').textContent = question.question;
            
            const answersContainer = document.getElementById('answersContainer');
            answersContainer.innerHTML = '';
            
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.className = 'answer-btn';
                button.textContent = answer.text;
                button.onclick = () => selectAnswer(answer.character);
                answersContainer.appendChild(button);
            });
        }

        function selectAnswer(character) {
            scores[character]++;
            currentQuestionIndex++;
            
            if (currentQuestionIndex < 20) {
                setTimeout(() => {
                    showQuestion();
                    updateProgress();
                    updateQuestionCounter();
                }, 300);
            } else {
                showResult();
            }
        }

        function updateProgress() {
            const progress = ((currentQuestionIndex + 1) / 20) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function updateQuestionCounter() {
            document.getElementById('questionCounter').textContent = `Question ${currentQuestionIndex + 1} of 20`;
        }



  function showResult() {
    // Hide quiz content
    document.getElementById('quizContent').style.display = 'none';

    // Find the character with the highest score
    let maxScore = -1;
    let resultCharacter = 'rumi'; // Default

    for (let character in scores) {
        if (scores[character] > maxScore) {
            maxScore = scores[character];
            resultCharacter = character;
        }
    }

    // Display result
    document.getElementById('resultEmoji').textContent = characters[resultCharacter].emoji;
    document.getElementById('resultName').textContent = characters[resultCharacter].name;
    document.getElementById('resultDescription').textContent = characters[resultCharacter].description;
    document.getElementById('result').classList.add('show');

    // Show win images
    document.getElementById('winImgLeft').src = characterImages[resultCharacter].left;
    document.getElementById('winImgRight').src = characterImages[resultCharacter].right;
    document.getElementById('winImgLeft').classList.add('showImg');
    document.getElementById('winImgRight').classList.add('showImg');

    // Speak result automatically
    speakResult();
}
        function restartQuiz() {
            document.getElementById('result').classList.remove('show');
            document.getElementById('startScreen').style.display = 'block';
            document.getElementById('progressFill').style.width = '0%';
            stopSpeaking();

            document.getElementById('winImgLeft').classList.remove('showImg');
            document.getElementById('winImgRight').classList.remove('showImg');
            document.getElementById('winImgLeft').src = '';
            document.getElementById('winImgRight').src = '';
        }

        // Text-to-Speech Functions
        function speakText(text) {
            if (currentUtterance) {
                speechSynthesis.cancel();
            }

            currentUtterance = new SpeechSynthesisUtterance(text);
            currentUtterance.rate = 0.8;
            currentUtterance.pitch = 1;
            currentUtterance.volume = 0.8;

            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => 
                voice.lang.includes('en') && 
                (voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Karen'))
            ) || voices.find(voice => voice.lang.includes('en'));
            
            if (preferredVoice) {
                currentUtterance.voice = preferredVoice;
            }

            speechSynthesis.speak(currentUtterance);
        }

        function speakCurrentQuestion() {
            if (currentQuestionIndex < shuffledQuestions.length) {
                speakText(shuffledQuestions[currentQuestionIndex].question);
            }
        }

        function speakResult() {
            const resultCharacter = getCurrentResult();
            const character = characters[resultCharacter];
            const fullText = `You are ${character.name}! ${character.description}`;
            
            document.getElementById('speakResultBtn').style.display = 'none';
            document.getElementById('stopSpeakBtn').style.display = 'inline-flex';
            
            speakText(fullText);
            
            if (currentUtterance) {
                currentUtterance.onend = function() {
                    document.getElementById('speakResultBtn').style.display = 'inline-flex';
                    document.getElementById('stopSpeakBtn').style.display = 'none';
                };
            }
        }

        function stopSpeaking() {
            if (currentUtterance) {
                speechSynthesis.cancel();
                document.getElementById('speakResultBtn').style.display = 'inline-flex';
                document.getElementById('stopSpeakBtn').style.display = 'none';
            }
        }

        function getCurrentResult() {
            let maxScore = 0;
            let resultCharacter = 'rumi';
            
            for (let character in scores) {
                if (scores[character] > maxScore) {
                    maxScore = scores[character];
                    resultCharacter = character;
                }
            }
            return resultCharacter;
        }

        speechSynthesis.onvoiceschanged = function() {
            // Voices are now loaded
        };