import { expect, test } from '@playwright/test';
import config from '../framework/config/configSauce';

test('success autorization', async ({ page }) => {
  await page.goto(config.baseURL);

  await page
    .getByPlaceholder('Username')
    .pressSequentially(config.credentials.userName);
  await page
    .locator('#password')
    .pressSequentially(config.credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);
});

test('autorization without required fields', async ({ page }) => {
  await page.goto(config.baseURL);

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.error-message-container > h3')).toBeVisible();
});

test('autorization locked out user', async ({ page }) => {
  await page.goto(config.baseURL);

  await page
    .getByPlaceholder('Username')
    .pressSequentially(config.credentials.userNameFail);
  await page
    .locator('#password')
    .pressSequentially(config.credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).not.toHaveURL(/inventory.html/);
});

test('autorization with not valid password', async ({ page }) => {
  await page.goto(config.baseURL);

  await page
    .getByPlaceholder('Username')
    .pressSequentially(config.credentials.userName);
  await page.locator('#password').pressSequentially('secret');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.error-message-container > h3')).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('open about page', async ({ page }) => {
  await page.goto(config.baseURL);

  await page
    .getByPlaceholder('Username')
    .pressSequentially(config.credentials.userName);
  await page
    .locator('#password')
    .pressSequentially(config.credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('#about_sidebar_link').click();

  await expect(page).toHaveTitle(
    'Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing',
  );
});
