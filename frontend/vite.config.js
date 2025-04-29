import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:5080',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '')
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})