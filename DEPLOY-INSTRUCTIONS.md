# NEXAURA 3D Showcase — Deploy to GitHub Pages

This zip has two things in it:

1. **The ready-to-deploy website** (`index.html`, `assets/`, `.nojekyll`,
   `tags.json`, `favicon.svg`, `icons.svg`) — sitting right at the top level
   of this zip. This is what you upload to GitHub.
2. **`source-code/`** — the full editable React source, for whenever you
   want to change something and rebuild. You do NOT upload this folder to
   GitHub Pages; keep it for later edits.

Everything here is already configured for:
- GitHub username: **gurditsingh09bedi**
- Repo name: **nexaura-3d-showcase**

If you create the repo with that exact name, nothing needs editing.

## Steps (5 minutes)

1. Go to https://github.com/new
2. Repository name: `nexaura-3d-showcase` (must match exactly)
3. Set it to **Public**
4. Click **Create repository**
5. On the new repo's page, use **"uploading an existing file"** and drag in
   **only the top-level files** from this zip — `index.html`, `assets`
   (whole folder), `.nojekyll`, `tags.json`, `favicon.svg`, `icons.svg`.
   **Do not upload the `source-code` folder** to this repo.
6. Commit.
7. Go to **Settings → Pages**. Under "Build and deployment", set **Source**
   to **Deploy from a branch** → branch **main**, folder **/ (root)** → Save.
8. Wait ~1 minute. Your site is live at:
   ```
   https://gurditsingh09bedi.github.io/nexaura-3d-showcase/
   ```

## Adding tags later (the admin panel)

1. Click the small **⚙** button, bottom-right corner of the live site.
2. Get a GitHub token: https://github.com/settings/personal-access-tokens/new
   → Repository access → Only select repositories → `nexaura-3d-showcase`
   → Permissions → Repository permissions → **Contents: Read and write**
   → Generate, copy it.
3. Paste the token into the admin panel, tick "Remember on this device".
4. Add or remove tags — each change is a real commit to this same repo, and
   shows up on the live site within about a minute.

## If you ever want to change the design/code

1. Open the `source-code` folder in a code editor.
2. `npm install`
3. Make your changes.
4. `npm run build` — this produces a new `dist` folder.
5. Upload the contents of that new `dist` folder to the same GitHub repo,
   overwriting the old files (keep `.nojekyll` and `tags.json` as they are —
   don't let a rebuild overwrite `tags.json` if you've already added tags
   through the admin panel, since that would reset them back to the 4
   defaults).
