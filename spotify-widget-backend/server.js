const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8888;

app.use(cors());

let access_token = '';
let refresh_token = '';

// Spotify scopes needed
const scopes = 'user-read-currently-playing user-read-playback-state';

// Step 1: Redirect to Spotify for auth
app.get('/login', (req, res) => {
  const authUrl = 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scopes,
      redirect_uri: process.env.REDIRECT_URI,
      state: 'random_state',
      show_dialog: true
    });
  res.redirect(authUrl);
});

// Step 2: Spotify redirects here with code, exchange for token
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.send('Error: No code received');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    access_token = response.data.access_token;
    refresh_token = response.data.refresh_token;
    res.send('Authorization successful! You can close this tab and return to app.');
  } catch (error) {
    res.send('Error exchanging code for token: ' + error.message);
  }
});

// Refresh token endpoint
app.get('/refresh_token', async (req, res) => {
  if (!refresh_token) return res.status(400).send('No refresh token stored');
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    access_token = response.data.access_token;
    res.json({ access_token });
  } catch (error) {
    res.status(400).send('Error refreshing token: ' + error.message);
  }
});

// Get currently playing track
app.get('/current-track', async (req, res) => {
  if (!access_token) return res.status(401).send('Not authorized');
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (response.status === 204 || !response.data.item) {
      return res.json({ playing: false });
    }

    res.json({
      playing: true,
      item: response.data.item,
      progress_ms: response.data.progress_ms,
    });
  } catch (error) {
    res.status(400).send('Error fetching currently playing track: ' + error.message);
  }
});

// Simple root page
app.get('/', (req, res) => {
  res.send('Spotify Widget Backend Running. Go to /login to start.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
