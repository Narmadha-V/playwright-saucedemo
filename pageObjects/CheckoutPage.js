const { test, expect } = require('@playwright/test');
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.postalCodeInput = page.locator('input[name="postalCode"]')
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
     await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click({timeout:3000});
  }

  async finishCheckout() {
    await this.finishBtn.click({timeout:3000});
  }
  async verifyFieldsToBeEmpty(){
    await this.continueBtn.click({timeout:3000});
    const error = await this.page.locator('[data-test="error"]').textContent();
    await expect(error).toContain('First Name is required');
  }
  
}

module.exports = { CheckoutPage };
