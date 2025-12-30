const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pageObjects/LoginPage');
const { ProductsPage } = require('../../../pageObjects/ProductsPage');
const { users, products } = require('../../../utils/testData');

test('Add products to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(users.validUser.username, users.validUser.password);

  for (const product of products) {
    await productsPage.addProductToCart(product);
  }

  await productsPage.openCart();
  for (const product of products) {
    await expect(page.locator(`.cart_item:has-text("${product}")`)).toBeVisible();
  }
});
