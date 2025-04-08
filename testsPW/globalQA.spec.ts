import { expect, test } from '@playwright/test';
import { AccountPage, LoginPage, loginUser } from '../framework';

test('Успешная авторизация', async ({ page }) => {
  const loginPage = LoginPage({ page });

  await loginPage.visit();

  await loginPage.choiceCustomerLogin();
  await loginPage.choiceUser();
  await loginPage.submit();

  await expect(page).toHaveURL(/account/);
});

test('После авторизации нужное имя в приветствии', async ({ page }) => {
  const loginPage = LoginPage({ page });

  await loginPage.visit();

  await loginPage.choiceCustomerLogin();
  const userName = 'Albus Dumbledore';
  await loginPage.choiceUser(userName);
  await loginPage.submit();

  await expect(page.getByText(`${userName}`)).toBeVisible();
});

test('Успешное разлогирование', async ({ page }) => {
  const loginPage = LoginPage({ page });
  await loginPage.login();
  const accountPage = AccountPage({ page });

  await accountPage.logout();

  await expect(page).toHaveURL(/customer/);
});

test('Увеличение счёта', async ({ page }) => {
  await loginUser(page);
  const accountPage = AccountPage({ page });

  const balance: number = await +accountPage.getBalance();
  await accountPage.deposit(50);

  await expect(+accountPage.getBalance()).toBe(balance + 50);
});

test('Уменьшение счёта', async ({ page }) => {
  await loginUser(page);
  const accountPage = AccountPage({ page });

  const balance: number = await +accountPage.getBalance();
  await accountPage.deposit(60);
  await accountPage.withdrawl(50);

  await expect(+accountPage.getBalance()).toBe(balance + 10);
});
