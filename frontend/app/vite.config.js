import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setup-test.js",
    },
    define: {
      'process.env': process.env,
      '__dirname': JSON.stringify(__dirname),
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      host: '0.0.0.0', // Écouter sur toutes les interfaces réseau
      port: 5173,
      hmr: {
        host: 'neighborrow.hephel.fr', // Remplacez par votre domaine ou adresse IP publique
        protocol: 'ws',
        clientPort: 5173 // Assurez-vous que ce port est ouvert et accessible
      },
      allowedHosts: [
        'neighborrow.hephel.fr',
        'www.neighborrow.hephel.fr',
        '13.39.105.132'
      ]
    }
  };
});
