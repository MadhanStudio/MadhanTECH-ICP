import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      // external: [
      //   'pdfjs-dist',
      //   'pdfjs-dist/build/pdf.worker.entry',
      // ],
    },
  },
  optimizeDeps: {
    // include: ['pdfjs-dist'],
    esbuildOptions: {
      define: {
        global: "globalThis", // Menyediakan globalThis untuk bekerja dengan PDF.js
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
    headers: {
      // Uncomment if you need a custom Content-Security-Policy header
      // 'Content-Security-Policy': "default-src 'self'; img-src 'self' blob: data: blob:; worker-src 'self' blob:; script-src 'self' blob:"
    }
  },
  
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: {
      // 'pdfjs-dist': 'pdfjs-dist/build/pdf', // Menetapkan alias untuk pdfjs-dist
      find: "declarations",
      replacement: fileURLToPath(
        new URL("../declarations", import.meta.url)
      ),
    },
    dedupe: ['@dfinity/agent'], // Menghindari duplikasi dependensi
  },
});
