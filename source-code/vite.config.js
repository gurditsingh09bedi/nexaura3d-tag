import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is set to the repo name because GitHub Pages serves project sites at
// https://<username>.github.io/<repo-name>/ — without this, the built JS/CSS
// files 404 and the page shows blank.
export default defineConfig({
  plugins: [react()],
  base: '/nexaura-3d-showcase/',
})
