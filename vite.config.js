import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel はルート(/)配信、GitHub Pages はサブパス配信なので base を切り替える
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/my-todo-app3/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/**/*.test.{js,jsx}', 'src/setupTests.js', 'src/main.jsx'],
    },
  },
})
