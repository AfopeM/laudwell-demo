import { expect, type Page } from '@playwright/test';

// The demo business ID matches the entry in src/config/businesses.ts
const BIZ = 'demo-business';
export const BASE = `/${BIZ}`;

export async function goToScreen4High(page: Page) {
  await page.goto(`${BASE}/screen-0`);
  await page.getByRole('button', { name: 'Get started' }).click();
  await page.getByText('The people I dealt with were genuinely great').click();
  await page.getByText('Professional and reliable').click();
  const slider = page.locator('input[type="range"]');
  await slider.evaluate((el: HTMLInputElement) => {
    el.value = '5';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page).toHaveURL(`${BASE}/screen-4`);
}

export async function goToScreen4Low(page: Page) {
  await page.goto(`${BASE}/screen-0`);
  await page.getByRole('button', { name: 'Get started' }).click();
  await page.getByText('The people I dealt with were genuinely great').click();
  await page.getByText('Professional and reliable').click();
  const slider = page.locator('input[type="range"]');
  await slider.evaluate((el: HTMLInputElement) => {
    el.value = '2';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page).toHaveURL(`${BASE}/screen-4`);
}
