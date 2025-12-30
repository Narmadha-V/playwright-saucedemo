const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pageObjects/LoginPage');
const { ProductsPage } = require('../../pageObjects/ProductsPage');
const { CheckoutPage } = require('../../pageObjects/CheckoutPage');
const { users, products } = require('../../utils/testData');

test('Complete checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(users.validUser.username, users.validUser.password);

  for (const product of products) {
    await productsPage.addProductToCart(product);
  }
  await productsPage.openCart();
  await productsPage.goToCheckout()
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('Checkout with missing fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(users.validUser.username, users.validUser.password);
  await productsPage.addProductToCart(products[0]);
  await productsPage.openCart();
  await productsPage.goToCheckout()
  
  await checkoutPage.verifyFieldsToBeEmpty()

  
});