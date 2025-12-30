const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutBtn = page.locator('#checkout');
  }

  // Function to validate cart items and proceed to checkout
  async validateCartAndCheckout(products, checkoutPage, firstName, lastName, postalCode) {
    // Validate cart count
    await expect(this.cartItems).toHaveCount(products.length);

    // Validate each product individually
    for (const product of products) {
      const item = this.page.locator('.cart_item', { hasText: product });
      await expect(item).toBeVisible();
    }

    // Proceed to checkout
    await this.checkoutBtn.click();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);

    // Validate product names again in checkout-step-two
    for (const product of products) {
      const item = this.page.locator('.cart_item', { hasText: product });
      await expect(item).toBeVisible();
    }
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }
}

module.exports = { CartPage };
