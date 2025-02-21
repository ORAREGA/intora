import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [react(), viteCompression()],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Moves dependencies to a separate chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Reduce warning threshold
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
});
