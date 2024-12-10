import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    port: 3000, 
    proxy : {
      '/api' : {
        target : process.env.VITE_REACT_BACKEND_BASEURL || 'http://localhost:5000',
        secure : false,
      },
    },
  },
  plugins: [react()],
})