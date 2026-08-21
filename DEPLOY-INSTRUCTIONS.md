# NEXAURA 3D Showcase — Deploy to GitHub Pages

Pre-configured for:
- GitHub username: **gurditsingh09bedi**
- Repo name: **nexaura3d-tag**

## What's in this zip

Top-level files (upload these to your GitHub repo root):
`index.html`, `assets/`, `client-thumbs/`, `tags.json`, `clients.json`,
`favicon.svg`, `icons.svg`, `.nojekyll`

`source-code/` — full editable React source. Don't upload this folder to
GitHub Pages; keep it for future edits.

## Steps

1. Repo already exists: https://github.com/gurditsingh09bedi/nexaura3d-tag
2. Upload/replace the top-level files above (not `source-code/`) via
   **"Add file → Upload files"**, commit.
3. Settings → Pages → Source = Deploy from a branch → main → / (root).
4. Live at: https://gurditsingh09bedi.github.io/nexaura3d-tag/

## What's new in this version

- **Fixed the color bug** — each of the 4 product tags now renders its own
  distinct finish (Onyx dark, Platinum/Chrome bright silver, Graphite
  charcoal) instead of one fixed color for all four.
- **Backend for product tags** — the ⚙ admin panel (bottom-right of the
  live site) now has a **"Product Tags"** tab: add/remove the 3D tags,
  with color pickers and metalness/roughness sliders, saved as real GitHub
  commits to `tags.json`.
- **New "Our Clients" section** — shows the 3 real client tags (JAPP
  Financial, Nexaura Consultant, ESH Driving School) with a price, category,
  description, preview photo and a "View Tag" link to the live site.
- **New "Clients" tab in the admin panel** — add a new client with name,
  category, price, description, a live URL, and a photo upload (auto
  compressed). Saved as a commit to `clients.json`, shows up on the site
  within about a minute. Remove any client the same way.
- **Live Activity widget** is still simulated data, as originally specified
  — there's no real scan-tracking backend behind it (that would need actual
  NFC tags in the field). Ask if you want this wired to something real.

## Using the admin panel

1. Click **⚙** bottom-right of the live site.
2. Paste a GitHub token once (Settings → Developer settings → Personal
   access tokens → Fine-grained → this repo → Contents: Read and write).
3. Switch between the **Product Tags** and **Clients** tabs at the top of
   the panel to manage either one.

## If you want to change the design/code

1. Open `source-code/`, `npm install`, edit, `npm run build`.
2. Upload the new `dist/` contents to the same repo, replacing the old
   ones — but don't overwrite `tags.json` or `clients.json` if you've
   already added things through the admin panel (that would reset them
   back to defaults).
