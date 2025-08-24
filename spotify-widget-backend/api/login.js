module.exports = (req, res) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const scope = 'user-read-currently-playing user-read-recently-played';
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  
  res.writeHead(302, { Location: authURL });
  res.end();
};
