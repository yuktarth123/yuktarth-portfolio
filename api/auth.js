// Step 1 of the Decap CMS GitHub OAuth flow: redirect the admin login
// popup to GitHub's authorize screen. GITHUB_CLIENT_ID must be set as a
// Vercel environment variable (see admin/SETUP.md).
module.exports = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).send('Missing GITHUB_CLIENT_ID environment variable on the server.');
    return;
  }

  const host = req.headers.host;
  const protocol = host && host.startsWith('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;
  const scope = 'repo,user';

  const authorizeUrl =
    `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

  res.writeHead(302, { Location: authorizeUrl });
  res.end();
};
