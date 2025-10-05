import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),         // Página principal
        registro: resolve(__dirname, 'registro.html'),   // Página de registro
        inicio: resolve(__dirname, 'inicio.html'),
        
        
        // ejemplo: dashboard: resolve(__dirname, 'dashboard.html')
      },
    },
  },
});