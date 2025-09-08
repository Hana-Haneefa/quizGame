let currentQuestionIndex = 0;
        let shuffledQuestions = [];
        let scores = {
            nezha: 0,
            aobing: 0,
            taiyi: 0,
            dragonKing: 0,
            shen: 0
        };


        let speechSynthesis = window.speechSynthesis;
        let currentUtterance = null;

        const characters = {
            nezha: {
                name: "Nesha",
                emoji: "🔥",
                description: "You're the rebellious hero with a fiery spirit! Like Nesha, you refuse to let destiny define you and fight against unfair expectations. Your explosive personality might get you in trouble, but your fierce determination and loyalty to those you care about make you a powerful force for change. You believe in forging your own path, no matter what others say about your fate."
            },
            aobing: {
                name: "Ao Bing",
                emoji: "❄️",
                description: "You're the gentle soul with incredible inner strength! Like Ao Bing, you're elegant, thoughtful, and deeply loyal to those you love. You often struggle between duty and desire, trying to do what's right even when it costs you personally. Your grace under pressure and willingness to sacrifice for others make you a true friend and noble spirit."
            },
            taiyi: {
                name: "Taiyi Zhenren",
                emoji: "🧙‍♂️",
                description: "You're the wise mentor with a playful heart! Like Taiyi Zhenren, you balance wisdom with humor and care deeply about helping others grow. You might be unconventional in your methods and occasionally mess things up, but your good intentions and ability to see the bigger picture make you invaluable. You believe in the potential of others, even when they don't see it themselves."
            },
            dragonKing: {
                name: "Dragon King",
                emoji: "🐉",
                description: "ou're the powerful ruler with strong principles! Like the Dragon King, you value order, tradition, and protecting those under your care. You command natural respect and aren't afraid to use your authority when necessary. While your methods might seem harsh, you genuinely believe in maintaining stability and honor for the greater good."
            },
            shen: {
                name: "Shen Gongbao",
                emoji: "🦊",
                description: "You're the cunning strategist with hidden depths! Like Shen Gongbao, you're intelligent, charismatic, and skilled at reading people and situations. Your jealousy and desire for recognition sometimes lead you down dark paths, but your cleverness and ability to adapt make you a formidable presence. You understand that power often lies in influence rather than brute force."
            }
        };

        const questionPool = [
            {
                question: "What's your approach to making friends?",
                answers: [
                    { text: "I'm naturally rebellious, so people either love me or fear me", character: "nezha" },
                    { text: "I'm selective and prefer deep, meaningful connections", character: "aobing" },
                    { text: "I'm friendly to everyone, though sometimes I mess things up", character: "taiyi" },
                    { text: "I command respect first, friendship comes after providing worthiness", character: "dragonKing" },
                    { text: "I use my charm and wit to win people over", character: "shen" }
                ]
            },
            {
                question: "How do you handle being misunderstood?",
                answers: [
                    { text: "I get angry and lash out, then prove them wrong through actions", character: "nezha" },
                    { text: "It hurts deeply, but I try to show my true self quietly", character: "aobing" },
                    { text: "I laugh it off and try to explain with humor", character: "taiyi" },
                    { text: "I maintain my dignity and let my reputation speak for itself", character: "dragonKing" },
                    { text: "I use it to my advantage and manipulate the situation", character: "shen" }
                ]
            },
            {
                question: "Your ideal superpower would be?",
                answers: [
                    { text: "Fire manipulation and incredible strength", character: "nezha" },
                    { text: "The ability to create and manipulate ice", character: "aobing" },
                    { text: "Shape-shifting and magical trickery", character: "taiyi" },
                    { text: "Weather control and commanding sea creatures", character: "dragonKing" },
                    { text: "Illusion and mind manipulation", character: "shen" }
                ]
            },
            {
                question: "How do you deal with family expectations?",
                answers: [
                    { text: "I revel against them completely and forge my own path", character: "nezha" },
                    { text: "I try to honor them even when it conflicts with my heart", character: "aobing" },
                    { text: "I do my best but often mess up in amusing ways", character: "taiyi" },
                    { text: "I uphold family honor above all personal desires", character: "dragonKing" },
                    { text: "I pretend to follow them while secretly pursuing my own agenda", character: "shen" }
                ]
            },
            {
                question: "What's your biggest weakness?",
                answers: [
                    { text: "My explosive temper and tendency to destroy things", character: "nezha" },
                    { text: "My loyalty can be manipulated by those I trust", character: "aobing" },
                    { text: "I'm too laid back and sometimes irresponsible", character: "taiyi" },
                    { text: "My pride prevents me from admitting when I'm wrong", character: "dragonKing" },
                    { text: "My jealousy and need for recognition consume me", character: "shen" }
                ]
            },
            {
                question: "How do you prefer to solve conflicts?",
                answers: [
                    { text: "Head on confrontation with lots of explosive action", character: "nezha" },
                    { text: "I try to find peaceful solutions, fighting only when necessary", character: "aobing" },
                    { text: "With humor, wisdom, and sometimes unconventional methods", character: "taiyi" },
                    { text: "Through displays of power and demanding respect", character: "dragonKing" },
                    { text: "By manipulating others to fight for me", character: "shen" }
                ]
            },
            {
                question: "What motivates you the most?",
                answers: [
                    { text: "Proving that I can change my destiny", character: "nezha" },
                    { text: "Protecting those I care about, even at personal cost", character: "aobing" },
                    { text: "Helping my students grow and find their path", character: "taiyi" },
                    { text: "Maintaining orders and protecting my realm", character: "dragonKing" },
                    { text: "Getting the recognition and status I deserve", character: "shen" }
                ]
            },
            {
                question: "Your fashion style would be?",
                answers: [
                    { text: "Bold and edgy with fiery colors and punk elements", character: "nezha" },
                    { text: "Elegant and ethereal with flowing, cool toned fabrics", character: "aobing" },
                    { text: "Comfortable and quirky with magic accessories", character: "taiyi" },
                    { text: "Regal and imposing with rich, traditional designs", character: "dragonKing" },
                    { text: "Sophisticated and slightly sinister with dark elegance", character: "shen" }
                ]
            },
            {
                question: "How do you handle failure?",
                answers: [
                    { text: "I get furious, then channel that anger into trying harder", character: "nezha" },
                    { text: "I accept responsibility and quietly work to improve", character: "aobing" },
                    { text: "I learn from it and try not to make the same mistake twice", character: "taiyi" },
                    { text: "I rarely fail, but when I do, I maintain my composure", character: "dragonKing" },
                    { text: "I blame others and plot my comeback", character: "shen" }
                ]
            },
            {
                question: "What's your ideal way to spend a weekend?",
                answers: [
                    { text: "Extreme sports or activities that get my adrenaline pumping", character: "nezha" },
                    { text: "Quiet activities like reading, art, or spending time in nature", character: "aobing" },
                    { text: "Relaxing, maybe trying new hobbies or hanging with friends", character: "taiyi" },
                    { text: "Organizing my responsibilities and planning for the week ahead", character: "dragonKing" },
                    { text: "Networking at social events and advancing my goals", character: "shen" }
                ]
            },
            {
                question: "How do you react when someone challenges you?",
                answers: [
                    { text: "I explode and show them exactly why they shouldn't mess with me", character: "nezha" },
                    { text: "I try to understand their perspectives and respond diplomatically", character: "aobing" },
                    { text: "I use humor to defuse the situation", character: "taiyi" },
                    { text: "I remind them of their place with power", character: "dragonKing" },
                    { text: "I smile sweetly while planning their downfall", character: "shen" }
                ]
            },
            {
                question: "What's your approach to teamwork?",
                answers: [
                    { text: "I prefer working alone, but I'll protect my team fiercely", character: "nezha" },
                    { text: " I'm a loyal team player who puts the group's needs first ", character: "aobing" },
                    { text: " I try to keep everyone's spirits up and mediate conflicts", character: "taiyi" },
                    { text: " I naturally take charge and expect others to follow my lead", character: "dragonKing" },
                    { text: "I appear to cooperate while secretly pursuing my own agenda ", character: "shen" }
                ]
            },
            {
                question: "How do you handle peer pressure?",
                answers: [
                    { text: "I do whatever I want regardless of what others think ", character: "nezha" },
                    { text: "I'm influenced by those I respect, sometimes to my detriment", character: "aobing" },
                    { text: " I go with the flow unless it conflicts with my core values ", character: "taiyi" },
                    { text: "Others bend to my will, not the other way around", character: "dragonKing" },
                    { text: " I use peer pressure as a tool to manipulate situations", character: "shen" }
                ]
            },
            {
                question: "What's your biggest fear?",
                answers: [
                    { text: "Being unable to change my fate or protect those I love", character: "nezha" },
                    { text: "Disappointing the people who matter most to me ", character: "aobing" },
                    { text: "Failing my students when they need me most", character: "taiyi" },
                    { text: "Losing control of my domain and seeing chaos reign", character: "dragonKing" },
                    { text: "Being forgotten or overlooked while others get glory", character: "shen" }
                ]
            },
            {
                question: "How do you show affection to people you care about?",
                answers: [
                    { text: "Through fierce protection and occasional awkward gestures ", character: "nezha" },
                    { text: "With gentle kindness and selfless sacrifice", character: "aobing" },
                    { text: "Through teaching, gifts, and dad jokes", character: "taiyi" },
                    { text: "By using my power to ensure their safety and prosperity", character: "dragonKing" },
                    { text: " I struggle to show genuine affection due to my trust issues", character: "shen" }
                ]
            },
            {
                question: "What's your attitude toward rules and authority?",
                answers: [
                    { text: "Rules are meant to be broken, especially unfair ones", character: "nezha" },
                    { text: "I respect authority but will stand up for what's right ", character: "aobing" },
                    { text: "I follow the spirit of the law rather than the letter", character: "taiyi" },
                    { text: " I am the authority, and rules maintain necessary order ", character: "dragonKing" },
                    { text: "I manipulate rules and authority figures to serve my purposes", character: "shen" }

                ]
            },
            {
                question: "How do you handle jealousy or envy?",
                answers: [
                    { text: "I channel it into determination to become stronger", character: "nezha" },
                    { text: "I try to be happy for others despite my own disappointment", character: "aobing" },
                    { text: "I don't really get jealous - everyone has their own path", character: "taiyi" },
                    { text: " I rarely feel jealous as I'm confident in my position", character: "dragonKing" },
                    { text: "Jealousy consumes me and drives me to destructive actions", character: "shen" }
                ]
            },
            {
                question: "What's your communication style?",
                answers: [
                    { text: "Direct and explosive - I say exactly what I think", character: "nezha" },
                    { text: "Thoughtful and gentle, I choose my words carefully", character: "aobing" },
                    { text: "Humorous and wise, often speaking in riddles or stories", character: "taiyi" },
                    { text: "Commanding and formal, my words carry weight", character: "dragonKing" },
                    { text: "Smooth and persuasive, often with hidden meanings", character: "shen" }
                ]
            },
            {
                question: "How do you deal with betrayal?",
                answers: [
                    { text: "Explosive rage followed by a burning desire for justice", character: "nezha" },
                    { text: "Deep hurt that takes a long time to heal", character: "aobing" },
                    { text: "Disappointment, but I try to understand their reasons", character: "taiyi" },
                    { text: " Cold fury and swift, decisive punishment ", character: "dragonKing" },
                    { text: "I expected it all along and already have a counter-plan ", character: "shen" }
                ]
            },
            {
                question: "What legacy do you want to leave behind?",
                answers: [
                    { text: "That I changed my destiny and inspired others to do the same", character: "nezha" },
                    { text: "That I stood for what was right, even when it was difficult ", character: "aobing" },
                    { text: "That I helped others find their true potential and brought joy", character: "taiyi" },
                    { text: "A strong, stable realm that will prosper for generations", character: "dragonKing" },
                    { text: "Recognition as the powerful and brilliant individual I truly am", character: "shen" }
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
                nezha: 0,
                aobing: 0,
                taiyi: 0,
                dragonKing: 0,
                shen: 0
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
    let resultCharacter = 'nezha'; // Default

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
            let resultCharacter = 'nezha';
            
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