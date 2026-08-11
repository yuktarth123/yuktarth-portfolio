# Setting up self-editing on the live site

Your portfolio's text now lives in one file, `content.json`, and there's an
admin page at `/admin` (Decap CMS) that edits it through a form instead of
raw code. Once this is wired up: you go to `yoursite.vercel.app/admin`, log
in with GitHub, edit any field, hit publish — it commits the change to your
GitHub repo, and Vercel redeploys the live site automatically, usually within
a minute.

Everything below is a one-time setup. All of it has to happen in *your*
accounts (GitHub, Vercel) — I can't create those for you — but it's about
10 minutes of clicking, no code.

## 1. Push this project to GitHub

If it isn't already in a repo:

```bash
git init
git add .
git commit -m "Initial portfolio"
```

Create a new repo on [github.com/new](https://github.com/new) (public or
private, either works), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## 2. Deploy to Vercel

- Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo
  you just pushed.
- Framework preset: "Other" (it's a static site — Vercel will auto-detect
  the `api/` folder as serverless functions).
- Deploy. You'll get a URL like `your-portfolio.vercel.app`.

## 3. Register a GitHub OAuth App

This is what lets the `/admin` login button work — it's what Netlify's
Identity service does automatically, but on Vercel you set it up yourself
once.

- Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
  (direct link: [github.com/settings/developers](https://github.com/settings/developers))
- **Application name**: anything, e.g. "Portfolio CMS"
- **Homepage URL**: `https://your-portfolio.vercel.app` (your real Vercel URL)
- **Authorization callback URL**: `https://your-portfolio.vercel.app/api/callback`
- Click **Register application**
- Copy the **Client ID** shown on the next page
- Click **Generate a new client secret**, copy it immediately (GitHub only
  shows it once)

## 4. Add the credentials to Vercel

In your Vercel project: **Settings → Environment Variables**, add two:

| Name | Value |
|---|---|
| `GITHUB_CLIENT_ID` | the Client ID from step 3 |
| `GITHUB_CLIENT_SECRET` | the Client Secret from step 3 |

Then **redeploy** (Vercel → Deployments → ⋯ → Redeploy) so the functions
pick up the new variables.

## 5. Point the CMS at your repo

Edit `admin/config.yml` in this project — two lines near the top:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO_NAME        # <- your actual GitHub repo
  branch: main
  base_url: https://your-portfolio.vercel.app  # <- your actual Vercel URL
  auth_endpoint: api/auth
```

Commit and push that change (`git add admin/config.yml && git commit -m
"Configure CMS" && git push`) — Vercel redeploys automatically.

## 6. Try it

Visit `https://your-portfolio.vercel.app/admin`, click **Login with
GitHub**, authorize the app. You should land in the CMS with every section
of the site listed as an editable field. Edit something, hit **Publish** —
check your GitHub repo's commits to see it land, and the live site updates
after Vercel's redeploy finishes.

## Notes

- Only people with push access to your GitHub repo can log in and edit —
  it's using your repo's own permissions, not a separate password system.
- Quotes in the Testimonials and Recognition sections are other people's
  words — edit the surrounding fields freely, but don't alter what someone
  actually said.
- If you ever want to add a 5th project, testimonial, or skill, use the
  "Add" button under those list fields in the CMS — no code needed.
