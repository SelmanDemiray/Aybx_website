class QuestionLoader {
    constructor() {
        this.questions = [];
        this.categories = new Set();
        this.categorizedQuestions = {};
        this.loaded = false;
        this.fallbackLoaded = false;
    }

    async loadQuestions() {
        try {
            // First try to load from index.json
            const response = await fetch('questions/index.json');
            if (!response.ok) {
                throw new Error('Failed to load question index');
            }
            
            const index = await response.json();
            const questionFiles = index.files;

            console.log(`Found ${questionFiles.length} question files to load`);
            
            // Clear questions array before loading
            this.questions = [];
            
            // Load each question file
            const promises = questionFiles.map(file => this.loadQuestionFile(`questions/${file}`));
            await Promise.all(promises);
            
            console.log(`Successfully loaded ${this.questions.length} total questions`);
            
            // Process all loaded questions
            this.processQuestions();
            this.loaded = true;
            
            return {
                totalQuestions: this.questions.length,
                categories: Array.from(this.categories)
            };
        } catch (error) {
            console.error('Error loading questions from files:', error);
            
            // Try to load fallback questions
            return await this.loadFallbackQuestions();
        }
    }

    async loadQuestionFile(path) {
        try {
            console.log(`Loading questions from: ${path}`);
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load question file: ${path}`);
            }
            
            const data = await response.json();
            
            // Validate file structure
            if (!data.questions || !Array.isArray(data.questions)) {
                throw new Error(`Invalid question file format: ${path}`);
            }
            
            console.log(`Found ${data.questions.length} questions in ${path}`);
            
            // Add all questions from this file
            this.questions = [...this.questions, ...data.questions];
        } catch (error) {
            console.error(`Error loading question file ${path}:`, error);
            throw error; // Re-throw to be caught in loadQuestions()
        }
    }

    async loadFallbackQuestions() {
        console.log('Loading fallback questions...');
        
        // Hard-coded sample questions as a fallback
        this.questions = this.getFallbackQuestions();
        this.processQuestions();
        this.fallbackLoaded = true;
        this.loaded = true;
        
        return {
            totalQuestions: this.questions.length,
            categories: Array.from(this.categories)
        };
    }

    getFallbackQuestions() {
        return [
            {
                "id": "h1",
                "question": "Who were the first people to live in Canada?",
                "options": [
                    "Europeans",
                    "Indigenous peoples",
                    "Chinese immigrants",
                    "Vikings"
                ],
                "correctAnswer": "Indigenous peoples",
                "explanation": "Indigenous peoples were the first people to live in Canada, arriving thousands of years before European explorers.",
                "category": "history",
                "difficulty": "easy"
            },
            {
                "id": "g1",
                "question": "What is Canada's system of government?",
                "options": [
                    "Republic",
                    "Constitutional monarchy",
                    "Direct democracy",
                    "Communist state"
                ],
                "correctAnswer": "Constitutional monarchy",
                "explanation": "Canada is a constitutional monarchy, a parliamentary democracy, and a federal state.",
                "category": "government",
                "difficulty": "easy"
            },
            {
                "id": "r1",
                "question": "What document guarantees rights and freedoms for all Canadians?",
                "options": [
                    "The British North America Act",
                    "The Canadian Charter of Rights and Freedoms",
                    "The Declaration of Independence",
                    "The Treaty of Paris"
                ],
                "correctAnswer": "The Canadian Charter of Rights and Freedoms",
                "explanation": "The Canadian Charter of Rights and Freedoms guarantees the rights and freedoms of all Canadians.",
                "category": "rights-responsibilities",
                "difficulty": "easy"
            },
            {
                "id": "geo1",
                "question": "Which ocean borders Canada on the west?",
                "options": [
                    "Atlantic Ocean",
                    "Arctic Ocean",
                    "Pacific Ocean",
                    "Indian Ocean"
                ],
                "correctAnswer": "Pacific Ocean",
                "explanation": "Canada is bordered by the Pacific Ocean on the west.",
                "category": "geography",
                "difficulty": "easy"
            },
            {
                "id": "sym1",
                "question": "What is on the Canadian flag?",
                "options": [
                    "A beaver",
                    "A maple leaf",
                    "A bear",
                    "A moose"
                ],
                "correctAnswer": "A maple leaf",
                "explanation": "The Canadian flag features a stylized red maple leaf on a white square with red bars on either side.",
                "category": "symbols",
                "difficulty": "easy"
            }
        ];
    }

    processQuestions() {
        // Reset categories and categorized questions
        this.categories = new Set();
        this.categorizedQuestions = {};
        
        // Extract and deduplicate categories
        this.questions.forEach(question => {
            if (question.category) {
                this.categories.add(question.category);
                
                // Group questions by category
                if (!this.categorizedQuestions[question.category]) {
                    this.categorizedQuestions[question.category] = [];
                }
                this.categorizedQuestions[question.category].push(question);
            }
        });
        
        // Log category counts for debugging
        console.log("Categories processed:");
        for (const category of this.categories) {
            const count = this.categorizedQuestions[category] ? this.categorizedQuestions[category].length : 0;
            console.log(`- ${category}: ${count} questions`);
        }
    }

    getQuestionsByCategory(category) {
        if (category === 'all') {
            return this.questions;
        }
        
        const questions = this.categorizedQuestions[category] || [];
        console.log(`Returning ${questions.length} questions for category: ${category}`);
        return questions;
    }

    getRandomQuestions(count, category = 'all') {
        let pool = category === 'all' ? this.questions : this.categorizedQuestions[category] || [];
        
        if (pool.length === 0) {
            console.warn(`No questions found for category: ${category}`);
            return [];
        }
        
        // Shuffle the questions
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        
        // Return the requested number of questions, or all if there aren't enough
        return shuffled.slice(0, Math.min(count, pool.length));
    }
}

// Create a global instance for use throughout the application
const questionLoader = new QuestionLoader();
