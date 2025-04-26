import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'My PWA App',
        short_name: 'PWA',
        description: 'Прогрессивное веб-приложение на React + FastAPI',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d1117',
        icons: [
          {
            src: './src/assets/imgs/sapsan.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './src/assets/imgs/sapsan.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@api': path.resolve(__dirname, './src/api')
    }
  },

  server: {
    port: 5173,
    open: true,
    proxy: {
      // Прокси для API, если хочешь избежать CORS
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
