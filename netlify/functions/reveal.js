exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const body = event.body ? JSON.parse(event.body) : {};

    const destinations = [
      "https://static.wixstatic.com/media/5443c9_114aa225fdc4451a8325c1f302f23793~mv2.jpg",
      "https://static.wixstatic.com/media/5443c9_8f1e33151df344ddad6d779dd85c88f5~mv2.jpg"
    ];
    
    const randomImageUrl = destinations[Math.floor(Math.random() * destinations.length)];

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*" // ✅ Allows cross-origin requests
      },
      body: JSON.stringify({
        type: "frame:post", // ✅ Ensure correct frame type
        image: randomImageUrl, // ✅ Ensure valid image URL
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
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ message: "Method not allowed" }),
  };
};
