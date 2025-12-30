class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMsg = '[data-test="error"]';
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton,{timeout:3000});
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMsg);
  }
}

module.exports = { LoginPage };
