import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "https://github.io/kakashinho/deploy_react_vite",
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Exemplo: se no frontend você fizer api.get("/usuario/list")
      // o Vite vai "proxyar" esse pedido para o backend real
      '^/(usuario/list|login)': {
        target: 'https://2a8a59134e14.ngrok-free.app',
        changeOrigin: true,
        secure: false,  // se necessário
      },
    }
  }
})