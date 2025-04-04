import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'neighborrow.hephel.fr',
      protocol: 'ws',
      clientPort: 5173,
    },
    allowedHosts: [
      'neighborrow.hephel.fr',
      'www.neighborrow.hephel.fr',
      '13.39.105.132',
    ],
  },
});
