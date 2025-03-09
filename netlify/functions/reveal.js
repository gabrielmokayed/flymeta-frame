const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      const filePath = path.join(__dirname, "destinations.json");

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

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
      console.error("Error fetching JSON:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Method not allowed" }),
  };
};
