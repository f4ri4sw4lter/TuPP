import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import os from 'os'

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
    // listen on all interfaces so the container / LAN can reach the dev server
    host: '0.0.0.0',
    // default port (can be overridden with VITE_DEV_PORT env var)
    port: Number(process.env.VITE_DEV_PORT || 5173),
    // HMR needs to know what host the client should connect to. When running in
    // Docker the browser connects to the host machine (or container host IP),
    // so we allow overriding via env var VITE_HMR_HOST. If not provided we try
    // to auto-detect a reasonable LAN address.
    hmr: (() => {
      const envHost = process.env.VITE_HMR_HOST;
      const hmrHost = envHost || (() => {
        // try to find a non-internal IPv4 address
        const ifaces = os.networkInterfaces();
        for (const k of Object.keys(ifaces)) {
          const addrs = ifaces[k] || [];
          for (const a of addrs) {
            if (a.family === 'IPv4' && !a.internal) return a.address;
          }
        }
        return 'localhost';
      })();
      return { host: hmrHost, protocol: process.env.VITE_HMR_PROTOCOL || 'ws', port: Number(process.env.VITE_HMR_PORT || process.env.VITE_DEV_PORT || 5173) };
    })()
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})