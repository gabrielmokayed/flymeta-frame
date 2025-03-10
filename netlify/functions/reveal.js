const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  console.log("Incoming Event:", JSON.stringify(event));

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  try {
    console.log("Processing request...");

    // Adjust the path to point to the root directory
    const jsonPath = path.join(__dirname, '..', '..', '..', 'destinations.json');
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

    if (!Array.isArray(destinations) || destinations.length === 0) {
      throw new Error("No destinations available in the JSON.");
    }

    // Select a random destination
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
    console.log("Selected Destination:", randomDestination);

    if (!randomDestination || !randomDestination.image) {
      throw new Error("Random destination is invalid or missing an image property.");
    }

    const frameResponse = {
      version: "vNext",
      image: randomDestination.image,
      buttons: [
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
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(frameResponse),
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
