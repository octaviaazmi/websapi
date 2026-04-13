import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/websapi/",  // PASTIKAN PATH INI BENAR
  plugins: [react()],
})
