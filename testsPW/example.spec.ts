import { expect, test } from '@playwright/test';

test('success autorization', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').pressSequentially('standard_user');
  await page.locator('#password').pressSequentially('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('autorization without required fields', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.error-message-container > h3')).toBeVisible();
});

test('autorization locked out user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').pressSequentially('locked_out_user');
  await page.locator('#password').pressSequentially('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('autorization with not valid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').pressSequentially('standard_user');
  await page.locator('#password').pressSequentially('secret');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.error-message-container > h3')).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('open about page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').pressSequentially('standard_user');
  await page.locator('#password').pressSequentially('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('#about_sidebar_link').click();

  await expect(page).toHaveTitle(
    'Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing',
  );
});
