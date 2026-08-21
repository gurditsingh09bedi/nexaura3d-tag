import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base matches the actual repo name so GitHub Pages (which serves project
// sites at https://<username>.github.io/<repo-name>/) can find the JS/CSS.
export default defineConfig({
  plugins: [react()],
  base: '/nexaura3d-tag/',
})
