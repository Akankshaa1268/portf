const axios = require('axios');
const querystring = require('query-string');

module.exports = async (req, res) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const url = req.url || '';
  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : null;

  if (!code) {
    res.statusCode = 400;
    res.end('No code query parameter found.');
    return;
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      }),
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    // Here, store tokens (e.g., in-memory, database)
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    // For now, redirect user to frontend home page
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end('Error exchanging code for access token');
  }
};
