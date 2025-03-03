# Quiz Bowl Practice Application

An interactive browser-based application to help students practice for Quiz Bowl competitions.

## Features

- Fetches questions from the QB Reader API's `/api/random-tossup` endpoint
- Text-to-speech functionality to read questions aloud
- Speech recognition to capture and evaluate spoken answers
- Adjustable reading speed
- Category and difficulty filters
- "Buzz In" feature to simulate real Quiz Bowl competitions
- Scoring system (+10 points for correct answers)
- Game log to track progress

## How to Use

1. Select a category and difficulty level (optional)
2. Adjust reading speed using the slider (0.5x to 2.0x)
3. Click "Start Game" to begin
4. Listen to the question being read aloud
5. Click "Buzz In" if you know the answer before the reading finishes
6. Speak your answer when prompted
7. The app will evaluate your answer and update your score
8. Click "Continue" to get the next question

## Technical Implementation

- **Frontend**: HTML, CSS, JavaScript with Web Speech API
- **Backend**: Node.js with Express
- **Data Source**: QB Reader API (https://www.qbreader.org/api/random-tossup)

## Browser Requirements

This application requires a modern browser with support for:
- Web Speech API (speech recognition)
- SpeechSynthesis API (text-to-speech)

Chrome provides the best support for these features.

## Development

To run this application locally:

```
node server.js
```

The application will be available at http://localhost:5000