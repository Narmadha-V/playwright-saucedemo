const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pageObjects/LoginPage');
const { ProductsPage } = require('../../pageObjects/ProductsPage');
const { users, products } = require('../../utils/testData');
const { CheckoutPage } = require('../../pageObjects/CheckoutPage');
const { CartPage } = require('../../pageObjects/CartPage');

test('Add products to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(page).toHaveURL(/.*inventory.html/, { timeout: 15000 });

  for (const product of products) {
    await productsPage.addProductToCart(product);
  }

  await productsPage.openCart();
  for (const product of products) {
    await expect(page.locator(`.cart_item:has-text("${product}")`)).toBeVisible();
  }
});

test('Empty cart checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Go to cart without adding products
  await productsPage.openCart();
  await productsPage.goToCheckout()
  
  await checkoutPage.verifyFieldsToBeEmpty()
});

test.only('Cart count and product validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cartPage = new CartPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Add products to cart
  for (const product of products) {
    await productsPage.addProductToCart(product);
  }

  await productsPage.openCart();

  await cartPage.validateCartAndCheckout(
    products,
    checkoutPage,
    'John',
    'Doe',
    '12345'
  );
});

