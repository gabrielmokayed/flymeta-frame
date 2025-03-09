const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Locate destinations.json in the root directory
    const jsonPath = path.join(__dirname, '..', '..', 'destinations.json');

    if (!fs.existsSync(jsonPath)) {
      throw new Error(`File not found: ${jsonPath}`);
    }

    const data = fs.readFileSync(jsonPath, 'utf-8');
    const destinations = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(destinations)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching JSON: ${error.message}`
    };
  }
};
