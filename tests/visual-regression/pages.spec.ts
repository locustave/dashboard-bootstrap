import { test, expect } from '@playwright/test';

const pages = [
  { name: 'overview', path: '/' },
  { name: 'users', path: '/users' },
  { name: 'user-detail', path: '/users/1' },
  { name: 'settings', path: '/settings' },
  { name: 'onboarding', path: '/onboarding' },
  { name: 'integrations', path: '/integrations' },
  { name: 'workflow-builder', path: '/workflow-builder' },
  { name: 'messages', path: '/messages' },
  { name: 'getting-started', path: '/getting-started' },
];

for (const { name, path } of pages) {
  test(`${name} page matches baseline`, async ({ page }) => {
    await page.goto(path);
    // Wait for content to settle
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}.png`);
  });
}
