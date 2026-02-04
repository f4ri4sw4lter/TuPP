import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'assets/logo.png'],
      manifest: {
        name: 'TuPP',
        short_name: 'TuPP',
        description: 'Tu aplicación de productividad y rutas',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#558fc9',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'localhost'
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})