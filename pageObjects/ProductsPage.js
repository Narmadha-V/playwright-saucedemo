const { test, expect } = require('@playwright/test');
class ProductsPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('#checkout')
  }

  // async addProductToCart(productName) {
  //   await this.page.click(`text=${productName} >> xpath=.. >> button:text("Add to cart")`);
  // }
  async addProductToCart(productName) {
    // Convert product name to lowercase, replace spaces with hyphens
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const addBtnSelector = `#add-to-cart-${formattedName}`; 
    await this.page.click(addBtnSelector,{timeout:3000});
  }

  async openCart() {
    await this.page.click('.shopping_cart_link',{timeout:3000});
  }
  async goToCheckout(){
    await this.checkoutBtn.click({timeout:3000})
    await expect(this.page).toHaveURL(/.*checkout-step-one/, { timeout: 15000 });
  
  }
}

module.exports = { ProductsPage };
