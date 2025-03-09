exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const body = event.body ? JSON.parse(event.body) : {};
    const buttonIndex = body.buttonIndex || 0; // Default to 0 if undefined

    const jsonPath = path.join(__dirname, 'destinations.json');
    
    const randomImageUrl = destinations[Math.floor(Math.random() * destinations.length)];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'frame:post', // ✅ Correct frame type
        image: randomImageUrl,
        buttons: [
          { label: 'Reveal Destination', action: 'post' },
          { label: 'Get Yours', action: 'link', target: 'https://opensea.io/collection/flymeta' }
        ],
      }),
    };
  }

  return {
    statusCode: 405,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
