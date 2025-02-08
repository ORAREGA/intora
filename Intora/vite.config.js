import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        sourcemap: false, 
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: true,
    fs: {
      strict: false,
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false, // Ignores charset processing
      },
    },
  },
});
