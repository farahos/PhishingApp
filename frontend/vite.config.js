import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://phishingapp-2iom.onrender.com', // backend URL sax ah
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
