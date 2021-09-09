const fetch = require('node-fetch').default;
const apiKey = process.env.LASTFM_API_KEY;

exports.handler = async function (event, path) {
  const username = event.queryStringParameters.username;
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) { // NOT res.status >= 200 && res.status < 300
      return {statusCode: response.status, body: response.statusText};
    }
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
