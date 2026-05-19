import { test, expect, type Page } from '@playwright/test';
import { BASE } from './helpers';
import { SCREEN_2_QUESTION, SCREEN_2_OPTIONS } from '@/config/questions';

async function goToScreen2(page: Page) {
  await page.goto(`${BASE}/screen-0`);
  await page.getByRole('button', { name: 'Begin Review' }).click();
  await expect(page).toHaveURL(`${BASE}/screen-1`);
  await page.waitForLoadState('networkidle');
  await page.getByText('The people I dealt with were genuinely great').click();
  await expect(page).toHaveURL(`${BASE}/screen-2`);
  await page.waitForLoadState('networkidle');
}

test.describe('Screen 2 — Question 2', () => {
  test('renders the question label and heading', async ({ page }) => {
    await goToScreen2(page);
    await expect(page.getByText('Question 2 of 2')).toBeVisible();
    await expect(page.locator('h2')).toContainText(SCREEN_2_QUESTION);
  });

  test('renders all four option cards', async ({ page }) => {
    await goToScreen2(page);
    for (const option of SCREEN_2_OPTIONS) {
      await expect(page.getByText(option)).toBeVisible();
    }
  });

  for (const option of SCREEN_2_OPTIONS) {
    test(`option "${option}" navigates to screen-3`, async ({ page }) => {
      await goToScreen2(page);
      await page.getByText(option).click();
      await expect(page).toHaveURL(`${BASE}/screen-3`);
    });
  }
});
