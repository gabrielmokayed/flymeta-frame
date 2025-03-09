const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      // ✅ Path to destinations.json in the main folder
      const jsonPath = path.join(__dirname, '..', 'destinations.json');
      console.log("Reading JSON file from:", jsonPath); // Debug log

      const data = fs.readFileSync(jsonPath, 'utf8');
      console.log("Raw JSON data:", data); // Debug log

      const jsonData = JSON.parse(data);
      const destinations = jsonData.data.images; // ✅ Access images array
      const randomImageUrl = destinations[Math.floor(Math.random() * destinations.length)];

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'frame', // ✅ Correct frame type
          image: randomImageUrl,
          buttons: [
            { label: 'Reveal Destination', action: 'post' },
            { label: 'Get Yours', action: 'link', target: 'https://opensea.io/collection/flymeta' }
          ],
          post_url: 'https://fm-frame.netlify.app/.netlify/functions/reveal' // ✅ Include post_url
        }),
      };
    }

    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Error in function:', error); // Debug log
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
