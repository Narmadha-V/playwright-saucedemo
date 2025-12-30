const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pageObjects/LoginPage');
const { users } = require('../../utils/testData');

test('Valid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');

  await loginPage.login(users.validUser.username, users.validUser.password);

  await expect(page).toHaveURL(/inventory.html/);
});

test('Locked user login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');

  await loginPage.login(users.lockedUser.username, users.lockedUser.password);
  const msg = await loginPage.getErrorMessage();
  expect(msg).toContain('locked');
});

test('Invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('invalid_user', 'wrong_password');
  const msg = await loginPage.getErrorMessage();
  expect(msg).toContain('Epic sadface: Username and password do not match any user in this service');
});