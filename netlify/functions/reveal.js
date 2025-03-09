const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Make sure the path is correct relative to Netlify function location
    const jsonPath = path.join(__dirname, '../../destinations.json'); 

    console.log("Looking for JSON file at:", jsonPath);

    if (!fs.existsSync(jsonPath)) {
      throw new Error(`File not found: ${jsonPath}`);
    }

    const data = fs.readFileSync(jsonPath, 'utf-8');
    const destinations = JSON.parse(data);

    console.log("Successfully read destinations.json");

    return {
      statusCode: 200,
      body: JSON.stringify(destinations),
      headers: {
        "Content-Type": "application/json"
      }
    };

  } catch (error) {
    console.error("Error fetching JSON:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
