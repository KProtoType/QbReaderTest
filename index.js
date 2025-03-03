/**
 * QB Reader API Test Script
 * 
 * This script tests various QB Reader API endpoints to determine which ones
 * return valid JSON data. After testing, we've discovered that:
 * 
 * 1. The /api/random-tossup endpoint reliably returns JSON data
 * 2. This endpoint supports various query parameters:
 *    - difficulty (e.g., 1-5)
 *    - category (e.g., "literature", "science", etc.)
 *    - count (number of questions to return)
 * 3. Most other API endpoints return HTML rather than JSON
 * 
 * The working JSON endpoint returns data in this format:
 * {
 *   "tossups": [
 *     {
 *       "_id": "...",
 *       "question": "...",
 *       // other fields may be included
 *     }
 *   ]
 * }
 */

const axios = require('axios');

// Main tossup endpoint (confirmed working)
const TOSSUP_URL = 'https://www.qbreader.org/api/random-tossup';

// Various parameter combinations for the tossup endpoint
const TOSSUP_DIFFICULTY_URL = 'https://www.qbreader.org/api/random-tossup?difficulty=3';
const TOSSUP_CATEGORY_URL = 'https://www.qbreader.org/api/random-tossup?category=literature';
const TOSSUP_COMBINED_URL = 'https://www.qbreader.org/api/random-tossup?difficulty=5&category=science';
const TOSSUP_COUNT_URL = 'https://www.qbreader.org/api/random-tossup?count=3';

// Other endpoints to test (most return HTML)
const CATEGORIES_URL = 'https://www.qbreader.org/api/categories';
const QUESTIONS_URL = 'https://www.qbreader.org/api/random-question';
const INFO_URL = 'https://www.qbreader.org/api/info';

// Headers to include with the request
const headers = {
  'Accept': 'application/json',
  'User-Agent': 'Node.js QB Reader API Test'
};

// Function to test a specific API endpoint
async function testEndpoint(name, url) {
  console.log(`\n-------------------------------`);
  console.log(`Testing QB Reader API: ${name}`);
  console.log(`Endpoint: ${url}`);
  console.log(`-------------------------------`);
  
  try {
    // Make the request to the QB Reader API with headers
    const response = await axios.get(url, { headers });
    
    // Log response status
    console.log('\nResponse Status:', response.status);
    
    // Log response headers to check content type
    console.log('\nContent-Type:', response.headers['content-type']);
    
    // Check if response is JSON
    const isJSON = response.headers['content-type']?.includes('application/json');
    console.log('\nIs JSON response:', isJSON ? 'YES' : 'NO');
    
    // Log the response data structure
    console.log('\nResponse data type:', typeof response.data);
    
    // Print a sample of the data (first few items if it's an array or object)
    console.log('\nResponse data sample:');
    if (Array.isArray(response.data)) {
      console.log(`Array with ${response.data.length} items`);
      console.log(JSON.stringify(response.data.slice(0, 3), null, 2));
    } else if (typeof response.data === 'object' && response.data !== null) {
      console.log('Object with keys:', Object.keys(response.data));
      const sample = JSON.stringify(response.data, null, 2).substring(0, 500);
      console.log(sample + (sample.length >= 500 ? '...' : ''));
    } else {
      const textSample = String(response.data).substring(0, 200);
      console.log(textSample + (textSample.length >= 200 ? '...' : ''));
    }
    
    // Final verdict
    if (isJSON) {
      console.log(`\n✅ SUCCESS: The ${name} endpoint returns JSON data!`);
      return true;
    } else {
      console.log(`\n❌ NOTE: The ${name} endpoint does not return JSON data.`);
      return false;
    }
    
  } catch (error) {
    // Handle errors
    console.error(`\n❌ ERROR when calling the ${name} endpoint:`);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
    
    return false;
  }
}

// Test all endpoints
async function testQBReaderAPI() {
  console.log('Starting QB Reader API Tests');
  console.log('============================');
  
  const results = [];
  
  // Test non-tossup endpoints (these mostly return HTML)
  results.push(await testEndpoint('Categories', CATEGORIES_URL));
  results.push(await testEndpoint('Random Question', QUESTIONS_URL));
  results.push(await testEndpoint('API Info', INFO_URL));
  
  // Test tossup endpoints (these return JSON)
  results.push(await testEndpoint('Random Tossup (basic)', TOSSUP_URL));
  results.push(await testEndpoint('Random Tossup (with difficulty)', TOSSUP_DIFFICULTY_URL));
  results.push(await testEndpoint('Random Tossup (with category)', TOSSUP_CATEGORY_URL));
  results.push(await testEndpoint('Random Tossup (with difficulty & category)', TOSSUP_COMBINED_URL));
  results.push(await testEndpoint('Random Tossup (multiple questions)', TOSSUP_COUNT_URL));
  
  // Summary of results
  console.log('\n============================');
  console.log('QB Reader API Test Results:');
  console.log('============================');
  
  const successCount = results.filter(r => r).length;
  
  if (successCount > 0) {
    console.log(`\n✅ ${successCount} of ${results.length} endpoints return JSON data.`);
  } else {
    console.log('\n❌ None of the tested endpoints return JSON data.');
  }
  
  console.log('\nTest completed.');
}

// Run all tests
testQBReaderAPI();


