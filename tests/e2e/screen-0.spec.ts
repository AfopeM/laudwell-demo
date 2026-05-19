import { BASE } from './helpers';
import { test, expect } from '@playwright/test';

test.describe('Screen 0 — Welcome', () => {
  test('renders business name and Get started button', async ({ page }) => {
    await page.goto(`${BASE}/screen-0`);

    await expect(page.locator('h1')).toContainText('How was your');

    await expect(page.getByRole('button', { name: 'Begin Review' })).toBeVisible();
  });

  test('tapping Begin Review navigates to screen-1', async ({ page }) => {
    await page.goto(`${BASE}/screen-0`);
    await page.getByRole('button', { name: 'Begin Review' }).click();

    await expect(page).toHaveURL(`${BASE}/screen-1`);
  });
});
