import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Replace __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handler = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      // ✅ Path to destinations.json in the main folder
      const jsonPath = path.join(__dirname, '..', 'destinations.json');
      console.log("Reading JSON file from:", jsonPath); // Debug log

      const data = fs.readFileSync(jsonPath, 'utf8');
      console.log("Raw JSON data:", data); // Debug log

      const jsonData = JSON.parse(data);
      console.log("Parsed JSON data:", jsonData); // Debug log

      const destinations = jsonData.data.images; // ✅ Access images array
      console.log("Destinations array:", destinations); // Debug log

      const randomImageUrl = destinations[Math.floor(Math.random() * destinations.length)];
      console.log("Selected image URL:", randomImageUrl); // Debug log

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'frame',
          image: randomImageUrl,
          buttons: [
            { label: 'Reveal Destination', action: 'post' },
            { label: 'Get Yours', action: 'link', target: 'https://opensea.io/collection/flymeta' }
          ],
          post_url: 'https://fm-frame.netlify.app/.netlify/functions/reveal'
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
