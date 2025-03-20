import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      host: '0.0.0.0',  // Permet d'accepter les connexions externes
      port: 5173,  // Port d'écoute du frontend
      allowedHosts: [
        'neighborrow.hephel.fr',  // Hôte sans www
        'www.neighborrow.hephel.fr',  // Hôte avec www
        'localhost',  // Accès local
      ],
    },
  };
});
