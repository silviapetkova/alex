# Deploying Alex to a public link (GitHub Pages)

Alex is a static site, so hosting is free and needs no build step. The
included workflow (`.github/workflows/deploy.yml`) publishes the app
automatically every time you push.

## One-time setup

1. Create a repository on GitHub (e.g. `alex`). You can do this on
   github.com → **New repository**.
2. Connect this folder to it and push (run in this project folder):
   ```sh
   git remote add origin https://github.com/<your-username>/alex.git
   git push -u origin master
   ```
3. On GitHub, open the repo → **Settings** → **Pages**.
4. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it. The "Deploy Alex to GitHub Pages" workflow runs on each push
to `main`/`master`.

## Your live link

After the first workflow finishes (Actions tab → green check), the app is at:

```
https://<your-username>.github.io/alex/
```

Open that on the iPad in Safari, then **Share → Add to Home Screen** to
install it as an app and use it offline.

## Updating

Every `git push` redeploys automatically — no extra steps.

## Notes

- All asset paths are relative, so the app works correctly under the
  `/alex/` subdirectory.
- `.nojekyll` tells Pages to serve files as-is (no Jekyll processing).
- If you name the repo `<your-username>.github.io`, the link is just
  `https://<your-username>.github.io/` with no subdirectory.
