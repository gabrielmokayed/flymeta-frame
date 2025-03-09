const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      // ✅ Fetch JSON from the root URL
      const response = await fetch("https://fm-frame.netlify.app/destinations.json");

      if (!response.ok) {
        throw new Error(`Failed to fetch JSON: ${response.statusText}`);
      }

      const data = await response.json();
      const destinations = data.data.images; // ✅ Correctly accessing images array

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
