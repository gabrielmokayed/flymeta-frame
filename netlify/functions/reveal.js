const fs = require('fs'); // Import fs module
const path = require('path'); // Import path module

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      const body = event.body ? JSON.parse(event.body) : {};
      const buttonIndex = body.buttonIndex || 0; // Default to 0 if undefined

      // Load destinations from JSON file
      const jsonPath = path.join(__dirname, 'destinations.json');
      const data = fs.readFileSync(jsonPath, 'utf8');
      const jsonData = JSON.parse(data);

      // Access the images array from the "data" key
      const destinations = jsonData.data.images;

      // Select a random image URL
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
    console.error('Error in function:', error); // Log the error for debugging
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
