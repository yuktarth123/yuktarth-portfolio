// Step 2 of the Decap CMS GitHub OAuth flow: GitHub redirects here with a
// one-time ?code=..., which we exchange server-side (using the client
// secret, which must never reach the browser) for an access token, then
// hand that token back to the admin popup via postMessage.
module.exports = async (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = req.query && req.query.code;

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable on the server.');
    return;
  }
  if (!code) {
    res.status(400).send('Missing ?code from GitHub.');
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      sendHtml(res, renderPopupScript('error', { message: tokenData.error_description || tokenData.error }));
      return;
    }

    sendHtml(res, renderPopupScript('success', { token: tokenData.access_token, provider: 'github' }));
  } catch (err) {
    sendHtml(res, renderPopupScript('error', { message: err.message }));
  }
};

function sendHtml(res, html) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}

// Decap CMS's two-step handshake: the popup announces it's ready, waits
// for the opener (the admin page) to reply so it knows the opener's
// origin, then sends the real payload only to that origin.
function renderPopupScript(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload).replace(/</g, '\\u003c')}`;
  return `<!doctype html>
<html><body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`;
}
