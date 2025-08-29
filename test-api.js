import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('Testing API endpoints...');
  
  try {
    // Test if server is responding
    const response = await fetch(BASE_URL + '/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Server response status:', response.status);
    
    if (response.status === 401) {
      console.log('✓ Server is running and requires authentication (expected)');
    } else {
      console.log('Server response:', await response.text());
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('Make sure the server is running on port 5000');
  }
}

testAPI();
