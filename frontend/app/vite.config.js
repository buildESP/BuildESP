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
      host: true, // Permet au serveur de Vite d'être accessible depuis des hôtes externes
      port: 5173, // Utilisation du port 5173 pour le serveur frontend
      allowedHosts: [
        'neighborrow.hephel.fr',  // Hôte sans www
        'www.neighborrow.hephel.fr',  // Hôte avec www
        'localhost',  // Accès local
      ],
      proxy: {
        // Si tu veux utiliser Vite en mode dev avec un proxy vers Nginx
        '/api': {
          target: 'http://localhost', // Remplace avec l'adresse de ton serveur backend ou Nginx
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
