import type { Page } from 'playwright-core';
import config from '../config/configGlobalQA';

export function LoginPage({ page }: { page: Page }) {
  const visit = async () => {
    await page.goto(config.baseURL);
  };

  const choiceCustomerLogin = async () => {
    await page.getByRole('button', { name: 'Customer Login' }).click();
  };

  const choiceUser = async (userName?: string | undefined) => {
    if (userName === undefined) {
      const randomNumber: number = Math.floor(Math.random() * 5 + 1);
      await page.locator('#userSelect').selectOption(`${randomNumber}`);
    } else {
      await page.locator('#userSelect').selectOption(`${userName}`);
    }
  };

  const submit = async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  };

  const login = async () => {
    await visit();
    await choiceCustomerLogin();
    await choiceUser();
    await submit();
  };

  return {
    visit,
    choiceCustomerLogin,
    choiceUser,
    submit,
    login,
  };
}
