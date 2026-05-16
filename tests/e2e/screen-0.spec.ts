import { BASE } from './helpers';
import { test, expect } from '@playwright/test';

test.describe('Screen 0 — Welcome', () => {
  test('renders business name and Get started button', async ({ page }) => {
    await page.goto(`${BASE}/screen-0`);

    // Business name appears — pulled from businesses.ts at runtime
    await expect(page.getByText('Demo business', { exact: false })).toBeVisible();

    // The CTA is present
    await expect(page.getByRole('button', { name: 'Get started' })).toBeVisible();
  });

  test('tapping Get started navigates to screen-1', async ({ page }) => {
    await page.goto(`${BASE}/screen-0`);
    await page.getByRole('button', { name: 'Get started' }).click();

    // URL must change — flow state init is a side effect of this tap
    await expect(page).toHaveURL(`${BASE}/screen-1`);
  });
});
