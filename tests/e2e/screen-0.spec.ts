import { BASE } from './helpers';
import { test, expect } from '@playwright/test';

test.describe('Screen 0 — Welcome', () => {
  test('renders business name and Get started button', async ({ page }) => {
    await page.goto(`${BASE}/screen-0`);

    // Business name appears — pulled from businesses.ts at runtime
    await expect(page.locator('h1')).toContainText('How was your');

    // The CTA is present
    await expect(page.getByRole('button', { name: 'Begin Review' })).toBeVisible();
  });

  test('tapping Begin Review navigates to screen-1', async ({ page }) => {
    await page.goto(`${BASE}/screen-0`);
    await page.getByRole('button', { name: 'Begin Review' }).click();

    // URL must change — flow state init is a side effect of this tap
    await expect(page).toHaveURL(`${BASE}/screen-1`);
  });
});
