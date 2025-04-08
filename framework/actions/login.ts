import { Page } from 'playwright-core';
import { LoginPage } from '../pages';

export function login(page: Page) {
  const loginPage = LoginPage({ page });

  return () => {
    return loginPage.login();
  };
}

export function loginUser(page: Page) {
  return login(page)();
}
