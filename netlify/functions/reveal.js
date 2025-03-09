const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      const body = event.body ? JSON.parse(event.body) : {};

      // Load destinations from JSON file
      const jsonPath = path.join(__dirname, 'destinations.json');
      const data = fs.readFileSync(jsonPath, 'utf8');
      const destinations = JSON.parse(data).destinations;

      // Select a random image URL
      const randomImageUrl = destinations[Math.floor(Math.random() * destinations.length)];

      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          type: "frame:post",
          image: randomImageUrl,
          buttons: [
            { label: "Reveal Destination", action: "post" },
            { label: "Get Yours", action: "link", target: "https://opensea.io/collection/flymeta" }
          ]
        }),
      };
    }

    return {
      statusCode: 405,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  } catch (error) {
    console.error("Error in function:", error);
    return {
      statusCode: 500,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
