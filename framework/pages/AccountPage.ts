import { Page } from 'playwright-core';

export function AccountPage({ page }: { page: Page }) {
  const visit = async (site: string) => {
    await page.goto(site);
  };

  const isOpen = async () => {
    await page.goto('/#/account');
  };

  const logout = async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
  };

  const choiceDeposit = async () => {
    await page.locator('//button[@ng-click="deposit()"]').click();
  };

  const choiceTransactions = async () => {
    await page.locator('//button[@ng-click="transactions()"]').click();
  };

  const choiceWithdrawl = async () => {
    await page.locator('//button[@ng-click="withdrawl()"]').click();
  };

  const getBalance = async () => {
    // return page.locator('//strong[2]').textContent();
    return page.locator('strong').nth(2).textContent();
  };

  const inputAmount = async (amount: number) => {
    await page.getByPlaceholder('amount').pressSequentially(`${amount}`);
  };

  const submit = async () => {
    await page.locator('//button[@type="submit"]').click();
  };

  const deposit = async (amount: number) => {
    await choiceDeposit();
    await inputAmount(amount);
    await submit();
  };

  const withdrawl = async (amount: number) => {
    await choiceWithdrawl();
    await inputAmount(amount);
    await submit();
  };

  return {
    visit,
    isOpen,
    logout,
    choiceDeposit,
    choiceTransactions,
    choiceWithdrawl,
    getBalance,
    inputAmount,
    submit,
    deposit,
    withdrawl,
  };
}
