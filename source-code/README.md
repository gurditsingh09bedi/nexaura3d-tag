# NEXAURA — 3D Product Showcase

A high-end, "Apple Pro meets Cyberpunk Luxury" showcase site for the Nexaura Tag.
Built with React, React Three Fiber (Three.js), Tailwind CSS, and Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

## Build for production / deploy

```bash
npm run build
```

Upload the resulting `dist/` folder's contents to Netlify, Vercel, GitHub Pages,
or any static host (e.g. drag it onto https://app.netlify.com/drop).

---

## Adding tags from a real backend (no code editing needed)

By default the site reads its 4 tags from `src/data/tags.js` (a plain file in
the code). To let someone add/remove tags from a simple admin screen — with
no redeploying — wire it up to a GitHub repo, same pattern as your other
Nexaura projects:

### One-time setup (~5 minutes)

1. Create a **public** GitHub repo (any name).
2. Upload **`public/tags.json`** from this project to that repo's root — this
   is your starting data (already matches the 4 default tags).
3. Open `src/data/useTags.js` and fill in:
   ```js
   export const GH_OWNER = "your-github-username";
   export const GH_REPO = "your-repo-name";
   ```
4. Rebuild (`npm run build`) and redeploy — this one edit is the only code
   change ever needed; everything after this happens through the admin screen.
5. Get yourself a token to actually save changes:
   - https://github.com/settings/personal-access-tokens/new
   - Repository access → **Only select repositories** → pick your repo
   - Permissions → Repository permissions → **Contents: Read and write**
   - Generate, copy it

### Using it day to day

- Click the small **⚙** button, bottom-right corner of the live site.
- Paste your token once (tick "Remember on this device" so you don't need
  to again).
- **Add a tag**: fill in name, tagline, description, pick a base color and a
  glow accent color, adjust metalness/roughness sliders, save. It becomes a
  real commit to your repo and appears in both the 3D scene and the grid
  within about a minute.
- **Remove a tag**: click "Remove" next to it in the same panel.

If you never do this setup, the site just keeps using the 4 built-in tags —
nothing breaks either way.

---

## Where things live

- `src/data/tags.js` — the 4 default tags, used until/unless the GitHub
  backend above is configured.
- `src/data/useTags.js` — fetches tags from GitHub (falling back to the
  defaults), and the functions the admin panel uses to save changes.
- `src/components/AdminPanel.jsx` — the add/remove tag screen.
- `src/components/Tag3D.jsx` — the individual 3D tag: metallic material
  (now using each tag's own `baseColor`, not one fixed color for all four),
  orbit motion, and the hover "fly toward camera" behavior.
- `src/components/TagScene.jsx` — the Three.js canvas, lighting, and camera.
  Lighting is fully procedural (no external HDRI file) so it never depends
  on a third-party CDN being reachable.
- `src/components/Hero.jsx` — title + 3D scene backdrop.
- `src/components/Lineup.jsx` — the tag grid with scroll-reveal animation.
- `src/components/LiveActivity.jsx` — the bottom-left notification widget.
  **This is simulated data**, as specified in the original brief (it cycles
  through a fixed list in the `EVENTS` array) — there's no real scan-tracking
  backend behind it yet, since that would need actual NFC tags in the field
  reporting real scans. Ask if you want this wired to something real later
  (e.g. genuine order submissions from the form below).
- `src/components/OrderPortal.jsx` — the frosted-glass contact/waitlist form.
  Currently just shows a success state on submit — wire `handleSubmit` up to
  your email service / backend (e.g. Formspree, Resend, your own API) to
  actually receive submissions.
- `src/components/Footer.jsx` — the "Powered by Nexaura Consultant" credit.

## Notes

- Tailwind v3 is used (not v4) for simpler, more stable config.
- Each tag's 3D material now uses its own `baseColor` + `accent` glow, so
  Onyx renders dark, Platinum/Chrome render bright silver/mirror, etc. —
  earlier builds mistakenly used one fixed color for every tag.
