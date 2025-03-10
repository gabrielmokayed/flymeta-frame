const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    console.log("Processing request...");

    const jsonPath = path.join(__dirname, '..', '..', 'destinations.json');
    console.log(`Looking for JSON file at: ${jsonPath}`);

    if (!fs.existsSync(jsonPath)) {
      console.error(`File not found: ${jsonPath}`);
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "destinations.json not found" }),
      };
    }

    const data = fs.readFileSync(jsonPath, 'utf-8');
    const destinations = JSON.parse(data);

    // Randomly select a destination
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];

    console.log("Randomly selected destination:", randomDestination);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        image: randomDestination.image,
        button: [
          {
            label: "Reveal Destination",
            action: "post"
          },
          {
            label: "Get Yours",
            action: "link",
            target: "https://opensea.io/collection/flymeta"
          }
        ]
      }),
    };

  } catch (error) {
    console.error("Error fetching JSON:", error.message);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
