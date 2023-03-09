import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/posts-with-tags/',
  server: {
    watch: {
      usePolling: true,
    }
  }
})
