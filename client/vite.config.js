import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',//add in the beginning each time u see api
        secure: false,
      },
    },
  },
  plugins: [react()],
});
