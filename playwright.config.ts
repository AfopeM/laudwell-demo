import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e', // all Playwright tests live here
  timeout: 30_000, // 30s per test — generous for CI
  retries: 1, // one auto-retry on flaky failures
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 390, height: 844 }, // iPhone 14 — spec says 390px
    trace: 'on-first-retry', // records a trace only when something fails
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'pnpm dev', // boots Next.js before the suite runs
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI, // reuse your running dev server locally
  },
});
