import { expect, type Page } from '@playwright/test';

const BIZ = 'demo-business';
export const BASE = `/${BIZ}`;

export async function goToScreen4High(page: Page) {
  await page.goto(`${BASE}/screen-0`);

  await page.getByRole('button', { name: 'Begin Review' }).click();
  await expect(page).toHaveURL(`${BASE}/screen-1`);
  await page.waitForLoadState('networkidle');

  await page.getByText('The people I dealt with were genuinely great').click();
  await expect(page).toHaveURL(`${BASE}/screen-2`);
  await page.waitForLoadState('networkidle');

  await page.getByText('Professional and reliable').click();
  await expect(page).toHaveURL(`${BASE}/screen-3`);
  await page.waitForLoadState('networkidle');

  const slider = page.locator('input[type="range"]');
  await expect(slider).toBeVisible();
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
  await expect(page).toHaveURL(`${BASE}/screen-4`);
}

export async function goToScreen4Low(page: Page) {
  await page.goto(`${BASE}/screen-0`);

  await page.getByRole('button', { name: 'Begin Review' }).click();
  await expect(page).toHaveURL(`${BASE}/screen-1`);
  await page.waitForLoadState('networkidle');

  await page.getByText('The people I dealt with were genuinely great').click();
  await expect(page).toHaveURL(`${BASE}/screen-2`);
  await page.waitForLoadState('networkidle');

  await page.getByText('Professional and reliable').click();
  await expect(page).toHaveURL(`${BASE}/screen-3`);
  await page.waitForLoadState('networkidle');

  const slider = page.locator('input[type="range"]');
  await expect(slider).toBeVisible();
  await slider.evaluate((el: HTMLInputElement) => {
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )!.set!;
    nativeSetter.call(el, '2');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(`${BASE}/screen-4`);
}
