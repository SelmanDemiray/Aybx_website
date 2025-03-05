# Canadian Citizenship Test Study Website

A static website for studying the Canadian citizenship test, "Discover Canada: The Rights and Responsibilities of Citizenship."

## Features

- **Study Mode**: Learn with interactive flashcards organized by category
- **Test Mode**: Take practice tests with random questions and timed sessions
- **Progress Tracking**: Monitor your learning progress
- **Mobile Responsive**: Study on any device

## Getting Started

### Prerequisites

None! This is a static website that can be hosted on GitHub Pages or any web server.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/canada-citizenship-test.git
   ```

2. Open `index.html` in your browser to run locally, or upload all files to a web server.

### Local Development

When testing locally by opening the HTML file directly in a browser, you may encounter CORS (Cross-Origin Resource Sharing) issues when trying to load the JSON question files. This is a security feature of modern browsers.

To avoid this issue, you can:

1. **Use a local server** - Install a simple server like [http-server](https://www.npmjs.com/package/http-server):
   ```bash
   npm install -g http-server
   http-server
   ```
   Then access the site at `http://localhost:8080`

2. **Use the built-in fallback** - The app includes fallback questions that will load if JSON files can't be accessed.

3. **Deploy to GitHub Pages** - For full functionality without setting up a server.

### Hosting on GitHub Pages

1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select the `main` branch as the source
5. Your site will be published at `https://yourusername.github.io/repository-name/`

## Question Format

Questions are stored as JSON files in the `questions` directory. You can add new question files by following this format:

```json
{
  "questions": [
    {
      "id": "unique-id",
      "question": "The question text goes here?",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswer": "Option 2",
      "explanation": "Optional explanation of the answer",
      "reference": "Discover Canada, p. 30",
      "category": "category-name",
      "difficulty": "easy|medium|hard"
    }
  ]
}
```

After adding a new question file, update `questions/index.json` to include the filename.

## Categories

The current categories are:
- History
- Geography
- Government
- Rights and Responsibilities
- Symbols

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Content based on the official "Discover Canada" guide
- This project is not affiliated with the Government of Canada
- Created for educational purposes only
