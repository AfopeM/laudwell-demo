import { test, expect, type Page } from '@playwright/test';
import { BASE } from './helpers';
import { SCREEN_1_QUESTION, SCREEN_1_OPTIONS } from '@/config/questions';

async function goToScreen1(page: Page) {
  await page.goto(`${BASE}/screen-0`);
  await page.getByRole('button', { name: 'Begin Review' }).click();
  await expect(page).toHaveURL(`${BASE}/screen-1`);
  await page.waitForLoadState('networkidle');
}

test.describe('Screen 1 — Question 1', () => {
  test('renders the question label and heading', async ({ page }) => {
    await goToScreen1(page);
    await expect(page.getByText('Question 1 of 2')).toBeVisible();
    await expect(page.locator('h2')).toContainText(SCREEN_1_QUESTION);
  });

  test('renders all four option cards', async ({ page }) => {
    await goToScreen1(page);
    for (const option of SCREEN_1_OPTIONS) {
      await expect(page.getByText(option)).toBeVisible();
    }
  });

  for (const option of SCREEN_1_OPTIONS) {
    test(`option "${option}" navigates to screen-2`, async ({ page }) => {
      await goToScreen1(page);
      await page.getByText(option).click();
      await expect(page).toHaveURL(`${BASE}/screen-2`);
    });
  }
});
