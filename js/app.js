document.addEventListener('DOMContentLoaded', async () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize the app
    const app = {
        currentPage: 'home',
        studyMode: {
            currentCategory: 'all',
            currentQuestions: [],
            currentIndex: 0,
            isFlipped: false
        },
        testMode: {
            questions: [],
            answers: [],
            currentIndex: 0,
            timeLimit: 30, // minutes
            timerInterval: null,
            isActive: false
        },
        userStats: {
            questionsAnswered: 0,
            correctAnswers: 0
        },
        
        init: async function() {
            console.log("Initializing application...");
            
            // Load questions
            const result = await questionLoader.loadQuestions();
            if (result.error) {
                alert('Error loading questions. Please try again later.');
                return;
            }
            
            console.log(`Loaded ${result.totalQuestions} questions in ${result.categories.length} categories`);
            
            // Update stats on home page
            document.getElementById('total-questions').textContent = result.totalQuestions;
            document.getElementById('total-categories').textContent = result.categories.length;
            
            // Load user stats from localStorage if available
            this.loadUserStats();
            
            // Initialize the category dropdown
            this.initializeCategoryDropdown(result.categories);
            
            // Set up navigation
            this.setupNavigation();
            
            // Set up event listeners
            this.setupEventListeners();
        },
        
        loadUserStats: function() {
            const stats = JSON.parse(localStorage.getItem('canadaTestStats')) || {
                questionsAnswered: 0,
                correctAnswers: 0
            };
            
            this.userStats = stats;
            
            // Update displayed score
            const scorePercentage = stats.questionsAnswered > 0 
                ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) 
                : 0;
            document.getElementById('user-score').textContent = `${scorePercentage}%`;
        },
        
        saveUserStats: function() {
            localStorage.setItem('canadaTestStats', JSON.stringify(this.userStats));
            
            // Update displayed score
            const scorePercentage = this.userStats.questionsAnswered > 0 
                ? Math.round((this.userStats.correctAnswers / this.userStats.questionsAnswered) * 100) 
                : 0;
            document.getElementById('user-score').textContent = `${scorePercentage}%`;
        },
        
        initializeCategoryDropdown: function(categories) {
            const dropdown = document.getElementById('category');
            
            // Clear existing options
            dropdown.innerHTML = '<option value="all">All Categories</option>';
            
            // Add options for each category
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
                dropdown.appendChild(option);
            });
            
            // Add event listener for category change
            dropdown.addEventListener('change', () => {
                this.studyMode.currentCategory = dropdown.value;
                this.loadStudyQuestions();
            });
        },
        
        setupNavigation: function() {
            const navLinks = document.querySelectorAll('[data-page]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    this.navigateTo(page);
                });
            });
        },
        
        navigateTo: function(page) {
            // Remove active class from all pages and nav links
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('[data-page]').forEach(link => link.classList.remove('active'));
            
            // Add active class to current page and corresponding nav links
            document.getElementById(page).classList.add('active');
            document.querySelectorAll(`[data-page="${page}"]`).forEach(link => link.classList.add('active'));
            
            this.currentPage = page;
            
            // Initialize page-specific content
            if (page === 'study' && this.studyMode.currentQuestions.length === 0) {
                this.loadStudyQuestions();
            }
        },
        
        setupEventListeners: function() {
            // Study mode controls
            document.getElementById('flip-btn').addEventListener('click', () => this.flipCard());
            document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
            document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
            
            // Test mode controls
            document.getElementById('start-test').addEventListener('click', () => this.startTest());
            document.getElementById('prev-test-btn').addEventListener('click', () => this.prevTestQuestion());
            document.getElementById('next-test-btn').addEventListener('click', () => this.nextTestQuestion());
            document.getElementById('submit-test').addEventListener('click', () => this.submitTest());
            
            // Modal controls
            document.querySelector('.close').addEventListener('click', () => {
                document.getElementById('results-modal').style.display = 'none';
            });
            
            document.getElementById('review-test').addEventListener('click', () => {
                document.getElementById('results-modal').style.display = 'none';
                // Future functionality: implement test review
            });
            
            // Test options
            document.getElementById('test-time').addEventListener('change', (e) => {
                this.testMode.timeLimit = parseInt(e.target.value);
            });
        },
        
        loadStudyQuestions: function() {
            console.log(`Loading study questions for category: ${this.studyMode.currentCategory}`);
            const category = this.studyMode.currentCategory;
            this.studyMode.currentQuestions = questionLoader.getQuestionsByCategory(category);
            
            console.log(`Loaded ${this.studyMode.currentQuestions.length} study questions`);
            
            // Check if questions were loaded
            if (this.studyMode.currentQuestions.length === 0) {
                console.warn(`No questions found for category: ${category}. Using fallback.`);
                
                // Use fallback questions if no questions were loaded
                this.studyMode.currentQuestions = questionLoader.getFallbackQuestions()
                    .filter(q => category === 'all' || q.category === category);
            }
            
            this.studyMode.currentIndex = 0;
            this.studyMode.isFlipped = false;
            
            // Update UI
            document.getElementById('total-in-category').textContent = this.studyMode.currentQuestions.length;
            this.updateStudyQuestion();
        },
        
        updateStudyQuestion: function() {
            const { currentQuestions, currentIndex } = this.studyMode;
            
            if (currentQuestions.length === 0) {
                document.getElementById('question-text').textContent = 'No questions available for this category.';
                return;
            }
            
            const question = currentQuestions[currentIndex];
            
            // Update question ID and text
            document.getElementById('question-text').textContent = `[${question.id}] ${question.question}`;
            
            // Update answer and explanation
            document.getElementById('answer-text').textContent = question.correctAnswer;
            document.getElementById('explanation-text').textContent = question.explanation || '';
            
            // Update reference if available
            const reference = document.getElementById('reference-text');
            if (question.reference) {
                reference.textContent = `Reference: ${question.reference}`;
                reference.style.display = 'block';
            } else {
                reference.style.display = 'none';
            }
            
            // Reset flip state
            this.studyMode.isFlipped = false;
            document.querySelector('.flashcard').classList.remove('flipped');
            document.getElementById('flip-btn').textContent = 'Show Answer';
            
            // Update progress
            document.getElementById('current-question').textContent = currentIndex + 1;
            const progressPercentage = ((currentIndex + 1) / currentQuestions.length) * 100;
            document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;
        },
        
        flipCard: function() {
            const flashcard = document.querySelector('.flashcard');
            this.studyMode.isFlipped = !this.studyMode.isFlipped;
            
            if (this.studyMode.isFlipped) {
                flashcard.classList.add('flipped');
                document.getElementById('flip-btn').textContent = 'Show Question';
            } else {
                flashcard.classList.remove('flipped');
                document.getElementById('flip-btn').textContent = 'Show Answer';
            }
        },
        
        prevQuestion: function() {
            if (this.studyMode.currentIndex > 0) {
                this.studyMode.currentIndex--;
                this.updateStudyQuestion();
            }
        },
        
        nextQuestion: function() {
            if (this.studyMode.currentIndex < this.studyMode.currentQuestions.length - 1) {
                this.studyMode.currentIndex++;
                this.updateStudyQuestion();
            }
        },
        
        startTest: function() {
            // Get options
            const questionCount = parseInt(document.getElementById('question-count').value);
            const category = document.getElementById('test-category')?.value || 'all';
            this.testMode.timeLimit = parseInt(document.getElementById('test-time').value);
            
            // Get random questions
            this.testMode.questions = questionLoader.getRandomQuestions(questionCount, category);
            
            // Reset test state
            this.testMode.answers = new Array(this.testMode.questions.length).fill(null);
            this.testMode.currentIndex = 0;
            this.testMode.isActive = true;
            
            // Update UI
            document.querySelector('.test-start').style.display = 'none';
            document.getElementById('test-area').classList.remove('hidden');
            document.getElementById('total-test-questions').textContent = this.testMode.questions.length;
            
            // Start timer
            this.startTimer();
            
            // Show first question
            this.showTestQuestion();
        },
        
        showTestQuestion: function() {
            const { questions, currentIndex, answers } = this.testMode;
            const question = questions[currentIndex];
            
            // Update question number
            document.getElementById('current-test-question').textContent = currentIndex + 1;
            
            // Update question text
            document.getElementById('test-question-text').textContent = question.question;
            
            // Create options
            const optionsContainer = document.getElementById('test-options');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                if (answers[currentIndex] === index) {
                    optionElement.classList.add('selected');
                }
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => this.selectAnswer(index));
                optionsContainer.appendChild(optionElement);
            });
            
            // Update buttons
            document.getElementById('prev-test-btn').disabled = currentIndex === 0;
            document.getElementById('next-test-btn').disabled = currentIndex === questions.length - 1;
        },
        
        selectAnswer: function(index) {
            this.testMode.answers[this.testMode.currentIndex] = index;
            
            // Update UI
            const options = document.querySelectorAll('#test-options .option');
            options.forEach((option, i) => {
                if (i === index) {
                    option.classList.add('selected');
                } else {
                    option.classList.remove('selected');
                }
            });
        },
        
        prevTestQuestion: function() {
            if (this.testMode.currentIndex > 0) {
                this.testMode.currentIndex--;
                this.showTestQuestion();
            }
        },
        
        nextTestQuestion: function() {
            if (this.testMode.currentIndex < this.testMode.questions.length - 1) {
                this.testMode.currentIndex++;
                this.showTestQuestion();
            }
        },
        
        startTimer: function() {
            const timerElement = document.getElementById('timer');
            let minutes = this.testMode.timeLimit;
            let seconds = 0;
            
            const updateTimerDisplay = () => {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            };
            
            updateTimerDisplay();
            
            this.testMode.timerInterval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        this.submitTest();
                        return;
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                
                updateTimerDisplay();
                
                // Warning when 5 minutes remaining
                if (minutes === 5 && seconds === 0) {
                    alert('5 minutes remaining!');
                }
            }, 1000);
        },
        
        submitTest: function() {
            // Stop timer
            clearInterval(this.testMode.timerInterval);
            
            // Calculate score
            let correctCount = 0;
            this.testMode.questions.forEach((question, index) => {
                const userAnswer = this.testMode.answers[index];
                if (userAnswer !== null && question.options[userAnswer] === question.correctAnswer) {
                    correctCount++;
                    
                    // Update user stats
                    this.userStats.questionsAnswered++;
                    this.userStats.correctAnswers++;
                } else if (userAnswer !== null) {
                    this.userStats.questionsAnswered++;
                }
            });
            
            // Save user stats
            this.saveUserStats();
            
            // Calculate percentage
            const totalQuestions = this.testMode.questions.length;
            const percentage = Math.round((correctCount / totalQuestions) * 100);
            const passed = correctCount >= Math.ceil(totalQuestions * 0.75); // 75% is passing
            
            // Show results
            const resultsModal = document.getElementById('results-modal');
            const resultsSummary = document.getElementById('results-summary');
            const resultsDetails = document.getElementById('results-details');
            
            // Clear previous results
            resultsSummary.innerHTML = '';
            resultsDetails.innerHTML = '';
            
            // Add summary
            const summaryElement = document.createElement('div');
            summaryElement.className = 'results-summary';
            summaryElement.innerHTML = `
                <h3>${passed ? 'Congratulations!' : 'Sorry!'}</h3>
                <p>You scored ${correctCount} out of ${totalQuestions} (${percentage}%)</p>
                <p>${passed ? 'You passed the test!' : 'You did not pass the test. Keep studying!'}</p>
            `;
            resultsSummary.appendChild(summaryElement);
            
            // Add details for each question
            this.testMode.questions.forEach((question, index) => {
                const userAnswer = this.testMode.answers[index];
                const isCorrect = userAnswer !== null && question.options[userAnswer] === question.correctAnswer;
                
                const questionElement = document.createElement('div');
                questionElement.className = `question-result ${isCorrect ? 'correct' : 'incorrect'}`;
                questionElement.innerHTML = `
                    <p><strong>Q${index + 1}:</strong> ${question.question}</p>
                    <p><strong>Your answer:</strong> ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}</p>
                    <p><strong>Correct answer:</strong> ${question.correctAnswer}</p>
                    ${question.explanation ? `<p><strong>Explanation:</strong> ${question.explanation}</p>` : ''}
                `;
                resultsDetails.appendChild(questionElement);
            });
            
            // Show modal
            resultsModal.style.display = 'block';
            
            // Reset test UI
            document.querySelector('.test-start').style.display = 'block';
            document.getElementById('test-area').classList.add('hidden');
        }
    };
    
    // Initialize the app
    await app.init();
});