# 🎮 Quiz Bowl Practice

An interactive web app designed to help students practice for Quiz Bowl competitions with automated question reading, voice recognition, and scoring.

![Quiz Bowl Practice App](screenshots/app-preview.png)

## ✨ Features

- **Voice Question Reading**: Hear questions read aloud at your preferred speed
- **Voice Recognition**: Answer questions by speaking, just like in a real competition
- **"Buzz In" Feature**: Interrupt the question when you know the answer
- **Category Filters**: Practice specific areas like Literature, Science, History, and more
- **Difficulty Levels**: Select from 5 difficulty levels to match your skill level
- **Scoring System**: Track your performance with automatic scoring
- **Game Log**: Review your previous answers and learn from mistakes

## 🎯 Who Is This For?

- Quiz Bowl/Academic Challenge team members
- Students preparing for competitions
- Coaches training their teams
- Anyone who enjoys trivia and wants to improve their knowledge

## 📱 How To Use

### Quick Start Guide

1. **Install & Run**: 
   - [Download the app](#installation)
   - Run the server with `node server.js`
   - Open your browser to `http://localhost:5000`

2. **Choose Your Settings**:
   - Select a category (optional)
   - Choose difficulty level (1-5)
   - Adjust reading speed (0.5x-2.0x)
   - Select a voice (optional)

3. **Start Practicing**:
   - Click "Start Game" to begin
   - Listen to the question
   - Click "Buzz In" when you know the answer
   - Speak your answer clearly
   - Review your score and continue!

## 🔧 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher)
- Modern web browser with speech support (Chrome recommended)

### Step 1: Download the Code
There are two ways to get the code:

**Option A: Download ZIP**
1. Click the green "Code" button at the top of this page
2. Select "Download ZIP"
3. Extract the ZIP file to your computer

**Option B: For GitHub Users**
```
git clone https://github.com/KProtoType/QbReaderTest.git
```

### Step 2: Install Dependencies
1. Open a terminal/command prompt
2. Navigate to the extracted folder:
   ```
   cd QbReaderTest
   ```
3. Install required packages:
   ```
   npm install
   ```

### Step 3: Start the Server
1. In the same terminal, run:
   ```
   node server.js
   ```
2. You should see: "Quiz Bowl Practice Server running on port 5000"

### Step 4: Open the App
1. Open your web browser
2. Go to: `http://localhost:5000`
3. Start practicing!

## 📚 Documentation

Detailed documentation is available to help you get the most out of the Quiz Bowl Practice App:

- [Installation Guide](https://kprototype.github.io/QbReaderTest/installation-guide.html) - Step-by-step setup instructions
- [User Guide](https://kprototype.github.io/QbReaderTest/user-guide.html) - Detailed usage instructions and tips
- [GitHub Pages Information](GITHUB-PAGES.md) - How to view documentation online

## 🤔 FAQ

**Q: Why does my voice recognition not work?**  
A: Speech recognition requires:
- A modern browser (Chrome works best)
- Microphone permissions granted
- An internet connection (for some browsers)

**Q: Why don't I hear the questions being read?**  
A: Make sure:
- Your volume is turned up
- You haven't blocked audio in your browser
- You're using a supported browser (Chrome, Edge, or Safari)

**Q: Can I use this app on my phone?**  
A: Yes, but for best results:
- Use Chrome on Android
- iOS support may be limited (Safari has partial support)
- Make sure to grant microphone permissions

**Q: The category filter isn't working properly**  
A: The QB Reader API sometimes provides questions from different categories than requested. This is a limitation of the API, not the app.

## 🚀 Advanced Usage

### Hosting the App

To make the app available to others on your network:

1. Start the server as usual:
   ```
   node server.js
   ```

2. Find your computer's local IP address:
   - On Windows: Run `ipconfig` in Command Prompt
   - On Mac/Linux: Run `ifconfig` in Terminal

3. Others on your network can access the app at:
   ```
   http://YOUR_IP_ADDRESS:5000
   ```

### Technical Implementation

- **Frontend**: HTML, CSS, JavaScript with Web Speech API
- **Backend**: Node.js with Express
- **Data Source**: QB Reader API (https://www.qbreader.org/api/random-tossup)

## 📜 License

[MIT License](LICENSE)

## 💡 About Quiz Bowl

Quiz Bowl (also known as Academic Challenge, Scholar Bowl, or Brain Game) is a quiz competition where teams compete to answer questions on various academic subjects. Questions often start with obscure clues that get progressively easier, rewarding teams with deeper knowledge who can answer earlier.

This app is perfect for individual practice to complement team practice sessions!
