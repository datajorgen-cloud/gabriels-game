const path = require('path');
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: `file://${path.resolve(__dirname, 'index.html')}`,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
