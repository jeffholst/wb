import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA()]
})

VitePWA({
  manifest: {
    "name": "Workout Buddy",
    "short_name": "WB",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#fff",
    "description": "A nice workout Buddy.",
  },
  workbox: {
    // workbox options for generateSW
  }
})