let currentQuestionIndex = 1;
        let selectedAnswers = {};
        let scores = {
            ben: 0,
            gwen: 0,
            julie: 0,
            kevin: 0,
            grandpa: 0
        };

        const characters = {
            ben: {
                name: "Ben Tennyson",
                emoji: "⚡",
                description: "You're Ben Tennyson! You're brave, adventurous, and always ready to jump into action. Like Ben, you have a strong sense of justice and aren't afraid to take risks to protect others. You might be a bit impulsive sometimes, but your heart is always in the right place. You're a natural leader who inspires others with your courage and determination."
            },
            gwen: {
                name: "Gwen Tennyson",
                emoji: "🔮",
                description: "You're Gwen Tennyson! You're intelligent, strategic, and have a natural talent for learning. Like Gwen, you prefer to think before you act and use your brain to solve problems. You're fiercely loyal to your friends and family, and you have a strong moral compass. Your magical abilities (or real-world equivalent talents) set you apart from others."
            },
            julie: {
                name: "Julie Yamamoto",
                emoji: "🌸",
                description: "You're Julie Yamamoto! You're kind, caring, and have a natural ability to bring people together. Like Julie, you value harmony and try to see the best in everyone. You're supportive of your friends and always there when they need you. Your gentle nature and emotional intelligence make you a wonderful friend and partner."
            },
            kevin: {
                name: "Kevin Levin",
                emoji: "🔥",
                description: "You're Kevin Levin! You're tough, independent, and have overcome challenges in your past. Like Kevin, you might have a rough exterior, but you're incredibly loyal to those who earn your trust. You're not afraid to get your hands dirty and will fight fiercely for what you believe in. Your strength comes from your resilience and determination."
            },
            grandpa: {
                name: "Grandpa Max",
                emoji: "🚐",
                description: "You're Grandpa Max! You're wise, experienced, and always ready with good advice. Like Max, you've seen a lot in your life and use that knowledge to guide others. You're protective of your family and friends, and you have a calm, steady presence that others find reassuring. Your leadership comes from experience rather than bravado."
            }
        };

        function selectAnswer(element) {
            // Remove selection from other answers in this question
            const questionDiv = element.closest('.question');
            questionDiv.querySelectorAll('.answer').forEach(answer => {
                answer.classList.remove('selected');
            });

            // Select this answer
            element.classList.add('selected');

            // Store the selection
            selectedAnswers[currentQuestionIndex] = element.getAttribute('data-points');

            // Enable next button
            document.getElementById('nextBtn').disabled = false;
        }

        function nextQuestion() {
            if (currentQuestionIndex < 10) {
                // Hide current question
                document.querySelector(`.question[data-question="${currentQuestionIndex}"]`).classList.remove('active');
                
                // Show next question
                currentQuestionIndex++;
                document.querySelector(`.question[data-question="${currentQuestionIndex}"]`).classList.add('active');
                
                // Update progress
                updateProgress();
                updateNavigation();
            } else {
                // Calculate and show results
                calculateResults();
            }
        }

        function previousQuestion() {
            if (currentQuestionIndex > 1) {
                // Hide current question
                document.querySelector(`.question[data-question="${currentQuestionIndex}"]`).classList.remove('active');
                
                // Show previous question
                currentQuestionIndex--;
                document.querySelector(`.question[data-question="${currentQuestionIndex}"]`).classList.add('active');
                
                // Update progress
                updateProgress();
                updateNavigation();
            }
        }

        function updateProgress() {
            const progressPercent = (currentQuestionIndex / 10) * 100;
            document.getElementById('progressFill').style.width = progressPercent + '%';
            document.getElementById('currentQuestion').textContent = currentQuestionIndex;
        }

        function updateNavigation() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            prevBtn.disabled = currentQuestionIndex === 1;
            
            if (selectedAnswers[currentQuestionIndex]) {
                nextBtn.disabled = false;
                nextBtn.textContent = currentQuestionIndex === 10 ? 'Get Results!' : 'Next';
            } else {
                nextBtn.disabled = true;
                nextBtn.textContent = currentQuestionIndex === 10 ? 'Get Results!' : 'Next';
            }
        }

        function calculateResults() {
            // Reset scores
            scores = { ben: 0, gwen: 0, julie: 0, kevin: 0, grandpa: 0 };

            // Calculate scores from all answers
            for (let questionNum in selectedAnswers) {
                const pointsStr = selectedAnswers[questionNum];
                const pointPairs = pointsStr.split(',');
                
                pointPairs.forEach(pair => {
                    const [character, points] = pair.split(':');
                    scores[character] += parseInt(points);
                });
            }

            // Find the character with the highest score
            let maxScore = 0;
            let resultCharacter = 'ben';
            
            for (let character in scores) {
                if (scores[character] > maxScore) {
                    maxScore = scores[character];
                    resultCharacter = character;
                }
            }

            // Show result
            showResult(resultCharacter);
        }

        function showResult(characterKey) {
            const character = characters[characterKey];
            
            document.getElementById('resultCharacter').textContent = `${character.emoji} ${character.name}`;
            document.getElementById('resultDescription').textContent = character.description;
            
            // Hide quiz, show result
            document.querySelector('.quiz-content').style.display = 'none';
            document.getElementById('result').classList.add('active');
        }

        function restartQuiz() {
            // Reset all variables
            currentQuestionIndex = 1;
            selectedAnswers = {};
            scores = { ben: 0, gwen: 0, julie: 0, kevin: 0, grandpa: 0 };
            
            // Reset UI
            document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
            document.querySelector('.question[data-question="1"]').classList.add('active');
            document.querySelectorAll('.answer').forEach(a => a.classList.remove('selected'));
            
            document.getElementById('result').classList.remove('active');
            document.querySelector('.quiz-content').style.display = 'block';
            
            updateProgress();
            updateNavigation();
        }

        // Add click event listeners to all answers
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.answer').forEach(answer => {
                answer.addEventListener('click', function() {
                    selectAnswer(this);
                });
            });
            
            updateNavigation();
        });