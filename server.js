/**
 * Quiz Bowl Practice App - Server
 * 
 * This file sets up an Express server that:
 * 1. Serves static files from the public directory
 * 2. Provides an API endpoint to fetch questions from QB Reader
 * 3. Handles filtering by difficulty and category
 */

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.json());

// Store asked question IDs to avoid repetition
const askedQuestionIds = new Set();

// Available categories (hardcoded since QB Reader API doesn't provide JSON)
const CATEGORIES = [
  'literature', 'history', 'science', 'fine-arts', 'religion',
  'mythology', 'philosophy', 'social-science', 'current-events',
  'geography', 'other'
];

// Endpoint to fetch a random tossup question
app.get('/api/question', async (req, res) => {
  try {
    // Get filter parameters
    const { difficulty, category } = req.query;
    
    // Construct QB Reader API URL with filters
    let url = 'https://www.qbreader.org/api/random-tossup';
    const params = [];
    
    if (difficulty && parseInt(difficulty) >= 1 && parseInt(difficulty) <= 5) {
      params.push(`difficulty=${difficulty}`);
    }
    
    if (category && CATEGORIES.includes(category)) {
      params.push(`category=${category}`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    // Request headers
    const headers = {
      'Accept': 'application/json',
      'User-Agent': 'Quiz Bowl Practice App'
    };
    
    // Make the request to QB Reader API
    const response = await axios.get(url, { headers });
    
    // Check if response is valid
    if (!response.data || !response.data.tossups || !response.data.tossups.length) {
      return res.status(500).json({ 
        error: 'Invalid response from QB Reader API' 
      });
    }
    
    // Get the question
    const question = response.data.tossups[0];
    
    // Check if we've seen this question before in this session
    if (askedQuestionIds.has(question._id)) {
      // If we've seen it, try to get another question
      return res.status(202).json({
        retry: true,
        message: 'Question already asked in this session, please try again'
      });
    }
    
    // Add question ID to asked questions
    askedQuestionIds.add(question._id);
    
    // Return the question
    return res.json({
      id: question._id,
      question: question.question,
      // Format might vary, we'll handle any additional fields client-side
    });
    
  } catch (error) {
    console.error('Error fetching question:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch question from QB Reader API',
      details: error.message
    });
  }
});

// Get available categories
app.get('/api/categories', (req, res) => {
  res.json({ categories: CATEGORIES });
});

// Clear question history for a new game
app.post('/api/reset', (req, res) => {
  askedQuestionIds.clear();
  res.json({ success: true, message: 'Question history cleared' });
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Quiz Bowl Practice Server running on port ${PORT}`);
});