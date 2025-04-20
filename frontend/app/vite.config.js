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
        provider: 'v8', // Use v8 for better performance and compatibility
        reporter: ['text', 'html', 'lcov'], // Generate text, HTML, and lcov reports
        reportsDirectory: './coverage', // Directory for coverage reports
        include: ['src/**/*.{js,ts,jsx,tsx}'], // Include all source files for coverage
        exclude: ['node_modules', 'test'], // Exclude node_modules and test files// vite.config.js
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react'; // Or vue(), etc.
        import istanbul from 'vite-plugin-istanbul',
        
        export default defineConfig({
          plugins: [
            react(),
            // Add istanbul plugin
            istanbul({
              include: 'src/*', // Adjust to target your source files
              exclude: ['node_modules', 'test/'],
              extension: ['.js', '.ts', '.jsx', '.tsx', '.vue'], // Add relevant extensions
              requireEnv: true, // Recommended: Only instrument when VITE_COVERAGE=true
              // Or use cypressOnly: true if you prefer that flag
            }),
          ],
          // Ensure source maps are enabled for accurate reporting
          build: {
            sourcemap: true,
          },
          // ... other config
        }),
        
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