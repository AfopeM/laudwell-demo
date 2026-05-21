import { test, expect } from '@playwright/test';
import { goToScreen4Low, BASE } from './helpers';

test.describe('Low-rater critical path', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/api/submit', (route) => route.fulfill({ status: 200, body: '{}' }));
  });

  test('Screen 4 shows private feedback textarea', async ({ page }) => {
    await goToScreen4Low(page);
    await expect(page.locator('textarea')).toBeVisible();
  });

  test('Submit advances to Screen 5 immediately', async ({ page }) => {
    await goToScreen4Low(page);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-5`);
  });

  test('Screen 5 shows thank you message', async ({ page }) => {
    await goToScreen4Low(page);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Thank you for being honest with us.')).toBeVisible();
  });

  test('Google review link is present on Screen 5', async ({ page }) => {
    await goToScreen4Low(page);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('link', { name: 'Leave a Google review' })).toBeVisible();
  });
});
