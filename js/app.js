document.addEventListener('DOMContentLoaded', async () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize the app
    const app = {
        currentPage: 'home',
        mobileMenuOpen: false,
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
        theme: 'light', // Default theme
        
        init: async function() {
            console.log("Initializing application...");
            
            // Initialize theme
            this.initTheme();
            
            // Initialize mobile menu
            this.initMobileMenu();
            
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
        
        // Initialize mobile menu functionality
        initMobileMenu: function() {
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const nav = document.getElementById('main-nav');
            const menuOverlay = document.getElementById('menu-overlay');
            
            // Use touchstart and click for better iOS compatibility
            mobileMenuToggle.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent ghost clicks
                this.toggleMobileMenu();
            });
            
            mobileMenuToggle.addEventListener('click', (e) => {
                this.toggleMobileMenu();
            });
            
            menuOverlay.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent ghost clicks
                this.toggleMobileMenu();
            });
            
            menuOverlay.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close menu when a navigation item is clicked - improved for iOS
            const navLinks = document.querySelectorAll('#main-nav a');
            navLinks.forEach(link => {
                // Use touchend for better iOS compatibility
                link.addEventListener('touchend', (e) => {
                    e.preventDefault(); // Prevent default behavior
                    const page = link.getAttribute('data-page');
                    if (page) {
                        this.navigateTo(page);
                    }
                    if (this.mobileMenuOpen) {
                        // Add small delay to make sure the navigation happens
                        setTimeout(() => {
                            this.toggleMobileMenu();
                        }, 50);
                    }
                });
                
                // Keep click event for non-touch devices
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    if (page) {
                        this.navigateTo(page);
                    }
                    if (this.mobileMenuOpen) {
                        this.toggleMobileMenu();
                    }
                });
            });
            
            // Improved theme toggle for iOS
            const themeToggle = document.getElementById('theme-toggle-input');
            themeToggle.addEventListener('touchend', (e) => {
                e.stopPropagation(); // Stop event from bubbling up
                this.toggleTheme();
            });
        },
        
        toggleMobileMenu: function() {
            const nav = document.getElementById('main-nav');
            const menuOverlay = document.getElementById('menu-overlay');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            
            // Add some debugging for iOS
            console.log("Toggle menu called, current state:", this.mobileMenuOpen);
            
            if (this.mobileMenuOpen) {
                // Close menu
                nav.classList.remove('active');
                menuOverlay.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                // Enable body scrolling
                document.body.style.overflow = '';
            } else {
                // Open menu
                nav.classList.add('active');
                menuOverlay.classList.add('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
                // Disable body scrolling to prevent background scrolling
                document.body.style.overflow = 'hidden';
            }
            
            this.mobileMenuOpen = !this.mobileMenuOpen;
            console.log("Menu state after toggle:", this.mobileMenuOpen);
        },
        
        initTheme: function() {
            // Check if user has a saved preference
            const savedTheme = localStorage.getItem('canadaTestTheme');
            if (savedTheme) {
                this.theme = savedTheme;
                document.documentElement.setAttribute('data-theme', savedTheme);
                if (savedTheme === 'dark') {
                    document.getElementById('theme-toggle-input').checked = true;
                }
            } else {
                // Check for system preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.theme = 'dark';
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.getElementById('theme-toggle-input').checked = true;
                }
            }
        },
        
        toggleTheme: function() {
            // Toggle theme
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', this.theme);
            
            // Save preference
            localStorage.setItem('canadaTestTheme', this.theme);
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
        
        // Add the missing navigateTo function
        navigateTo: function(page) {
            // Update current page
            this.currentPage = page;
            
            // Remove active class from all pages and nav links
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            
            // Add active class to current page and nav link
            document.getElementById(page).classList.add('active');
            document.querySelector(`nav a[data-page="${page}"]`).classList.add('active');
            
            // Execute page-specific logic
            if (page === 'study') {
                this.loadStudyQuestions();
            } else if (page === 'test') {
                // Reset the test view
                document.querySelector('.test-start').style.display = 'block';
                document.getElementById('test-area').classList.add('hidden');
            }
            
            // Scroll to top of page
            window.scrollTo(0, 0);
        },
        
        // Add the missing loadStudyQuestions function
        loadStudyQuestions: function() {
            const category = this.studyMode.currentCategory;
            console.log(`Loading study questions for category: ${category}`);
            
            // Get questions for the selected category
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
        
        setupEventListeners: function() {
            // Add event listeners for study mode
            document.getElementById('flip-btn').addEventListener('click', () => this.flipCard());
            document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
            document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
            
            // Add event listeners for test mode
            document.getElementById('start-test').addEventListener('click', () => this.startTest());
            document.getElementById('prev-test-btn').addEventListener('click', () => this.prevTestQuestion());
            document.getElementById('next-test-btn').addEventListener('click', () => this.nextTestQuestion());
            document.getElementById('submit-test').addEventListener('click', () => this.submitTest());
            
            // Populate test category dropdown with same options as study mode
            const studyDropdown = document.getElementById('category');
            const testDropdown = document.getElementById('test-category');
            
            if (studyDropdown && testDropdown) {
                // Clone options from study dropdown to test dropdown
                Array.from(studyDropdown.options).forEach(option => {
                    const newOption = document.createElement('option');
                    newOption.value = option.value;
                    newOption.textContent = option.textContent;
                    testDropdown.appendChild(newOption);
                });
            }
            
            // Add event listener for theme toggle checkbox
            document.getElementById('theme-toggle-input').addEventListener('change', () => this.toggleTheme());
            
            // Close results modal when clicking the X
            const closeBtn = document.querySelector('.modal .close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.getElementById('results-modal').style.display = 'none';
                });
            }

            // Close modal when clicking outside of it
            window.addEventListener('click', (e) => {
                const modal = document.getElementById('results-modal');
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        },
        
        updateStudyQuestion: function() {
            const { currentQuestions, currentIndex } = this.studyMode;
            
            if (currentQuestions.length === 0) {
                document.getElementById('question-text').textContent = 'No questions available for this category.';
                return;
            }
            
            const question = currentQuestions[currentIndex];
            
            // Update question text without showing the ID
            document.getElementById('question-text').textContent = question.question;
            
            // Update answer and explanation
            document.getElementById('answer-text').textContent = question.correctAnswer;
            document.getElementById('explanation-text').textContent = question.explanation || '';
            
            // Update reference if available
            const reference = document.getElementById('reference-text');
            if (question.reference) {
                let referenceText = question.reference;
                // Apply correction function if available
                if (typeof correctReference === 'function') {
                    referenceText = correctReference(referenceText);
                }
                reference.textContent = `Source: ${referenceText}`;
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
            
            // Add better touch feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(20);
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
                    
                    // Add better touch feedback
                    if ('vibrate' in navigator) {
                        navigator.vibrate(20);
                    }
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
                const userAnswerText = userAnswer !== null ? question.options[userAnswer] : 'Not answered';
                const isCorrect = userAnswerText === question.correctAnswer;
                
                const questionElement = document.createElement('div');
                questionElement.className = `question-result ${isCorrect ? 'correct' : 'incorrect'}`;
                
                questionElement.innerHTML = `
                    <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                    <p><strong>Your Answer:</strong> ${userAnswerText}</p>
                    <p><strong>Correct Answer:</strong> ${question.correctAnswer}</p>
                    ${question.explanation ? `<p><strong>Explanation:</strong> ${question.explanation}</p>` : ''}
                `;
                
                // Add reference if available
                if (question.reference) {
                    const referenceText = typeof correctReference === 'function' ? 
                        correctReference(question.reference) : question.reference;
                    questionElement.innerHTML += `<p class="reference"><strong>Source:</strong> ${referenceText}</p>`;
                }
                
                resultsDetails.appendChild(questionElement);
            });
            
            // Add modal footer with buttons
            const modalFooter = document.createElement('div');
            modalFooter.className = 'modal-footer';
            
            // Add retry button
            const retryButton = document.createElement('button');
            retryButton.className = 'btn secondary';
            retryButton.textContent = 'Try Again';
            retryButton.addEventListener('click', () => {
                resultsModal.style.display = 'none';
                this.navigateTo('test');
            });
            modalFooter.appendChild(retryButton);
            
            // Add study button
            const studyButton = document.createElement('button');
            studyButton.className = 'btn primary';
            studyButton.textContent = 'Study More';
            studyButton.addEventListener('click', () => {
                resultsModal.style.display = 'none';
                this.navigateTo('study');
            });
            modalFooter.appendChild(studyButton);
            
            // Update modal content
            const modalContent = document.querySelector('.modal-content');
            if (modalContent.querySelector('.modal-footer')) {
                modalContent.removeChild(modalContent.querySelector('.modal-footer'));
            }
            modalContent.appendChild(modalFooter);
            
            // Show modal
            resultsModal.style.display = 'block';
            
            // Reset test mode
            this.testMode.isActive = false;
            
            // Navigate back to test selection
            document.querySelector('.test-start').style.display = 'block';
            document.getElementById('test-area').classList.add('hidden');
        }
    };
    
    // Initialize the app
    app.init();
});