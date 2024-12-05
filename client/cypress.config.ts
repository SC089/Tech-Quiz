import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add e2e-specific node event listeners here if needed
    },
    baseUrl: 'http://localhost:3001', // Ensure this matches your Vite dev server
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
