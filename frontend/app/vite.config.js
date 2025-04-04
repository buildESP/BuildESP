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
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setup-test.js",
      coverage: {
        provider: 'istanbul', // Use @vitest/coverage-v8
        // reporter: ['text', 'html'], // Output formats: text summary and HTML report
        // reportsDirectory: './coverage', // Directory for coverage reports
        // include: ['src/**/*.{js,ts,jsx,tsx}'], // Files to include in coverage
        // exclude: ['node_modules', 'test'], // Files to exclude from coverage
      },
    },
    define: {
      'process.env': process.env,
      '__dirname': JSON.stringify(__dirname),
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      allowedHosts: ["www.neighborrow.hephel.fr", "neighborrow.hephel.fr"],
    },
  };
});