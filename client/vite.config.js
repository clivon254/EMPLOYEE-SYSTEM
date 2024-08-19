import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://employee-system-backend-s1tt.onrender.com',
        secure:true
      }
    }
  },
  plugins: [react()],
})
