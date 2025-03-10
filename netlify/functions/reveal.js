const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  console.log("Incoming Event:", JSON.stringify(event));

  // Handle CORS preflight requests
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

    const jsonPath = path.join(__dirname, '..', '..', 'destinations.json');
    console.log(`Looking for JSON file at: ${jsonPath}`);

    if (!fs.existsSync(jsonPath)) {
      console.error(`File not found: ${jsonPath}`);
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "destinations.json not found" }),
      };
    }

    const data = fs.readFileSync(jsonPath, 'utf-8');
    const destinations = JSON.parse(data);

    console.log("Successfully read destinations.json");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ destinations }),
    };

  } catch (error) {
    console.error("Error fetching JSON:", error.message);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
