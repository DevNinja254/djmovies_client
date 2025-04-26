import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from "vite-plugin-require";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginRequire.default(),
  ],
  server: {
    port: 8001,
    // origin:'https://smooth-vast-thrush.ngrok-free.app',
  }
})
