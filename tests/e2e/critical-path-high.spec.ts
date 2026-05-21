import { test, expect } from '@playwright/test';
import { BASE } from './helpers';

test.describe('Critical path — High rater (full flow)', () => {
  test('completes screen-0 through screen-5 high-rater path', async ({ page }) => {
    // Screen 0
    await page.goto(`${BASE}/screen-0`);
    await expect(page.getByRole('button', { name: 'Begin Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Begin Review' }).click();

    // Screen 1
    await expect(page).toHaveURL(`${BASE}/screen-1`);
    await page.getByText('The people I dealt with were genuinely great').click();

    // Screen 2
    await expect(page).toHaveURL(`${BASE}/screen-2`);
    await page.getByText('Professional and reliable').click();

    // Screen 3
    await expect(page).toHaveURL(`${BASE}/screen-3`);
    const slider = page.locator('input[type="range"]');
    await slider.evaluate((el: HTMLInputElement) => {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )!.set!;
      nativeSetter.call(el, '5');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.getByRole('button', { name: 'Continue' }).click();

    // Screen 4 — high rater
    await expect(page).toHaveURL(`${BASE}/screen-4`);
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
    await page.getByRole('button', { name: 'Submit Review' }).click();

    // Screen 5 — Google redirect variant
    await expect(page).toHaveURL(`${BASE}/screen-5`);
    await expect(page.getByText('Your review has been copied')).toBeVisible();
    await expect(page.getByText(/Heading to Google in/)).toBeVisible();

    // Opt out of redirect
    await page.getByText('Prefer not to?').click();
    await expect(page.getByText(/Heading to Google in/)).not.toBeVisible();
  });
});
