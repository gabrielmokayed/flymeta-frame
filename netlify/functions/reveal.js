const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      // ✅ Read the destinations.json file dynamically
      const filePath = path.join(__dirname, "destinations.json");
      const rawData = fs.readFileSync(filePath, "utf-8");
      const destinations = JSON.parse(rawData).data.images;

      const randomImageUrl =
        destinations[Math.floor(Math.random() * destinations.length)];

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          type: "frame:post",
          image: randomImageUrl,
          buttons: [
            { label: "Reveal Destination", action: "post" },
            {
              label: "Get Yours",
              action: "link",
              target: "https://opensea.io/collection/flymeta",
            },
          ],
        }),
      };
    } catch (error) {
      console.error("Error loading destinations.json:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to load destinations.json" }),
      };
    }
  }

  return {
    statusCode: 405,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Method not allowed" }),
  };
};
