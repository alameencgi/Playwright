// pages/LoginPage.js

const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Define the locators
    // this.usernameInput = page.locator('#username');
    // this.passwordInput = page.locator('#password');
    // this.submitButton = page.locator('#submit');

    // ... constructor ...
    // Define the locators based on user-visible roles and names
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
// ...

  }

  async goto() {
    // Use the relative path because baseURL is set in the config
    await this.page.goto('/practice-test-login/');
    await expect(this.page).toHaveTitle('Test Login | Practice Test Automation');
  }

  /**
   * Fills the login form and submits it.
   * @param {string} username - The username to enter.
   * @param {string} password - The password to enter.
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
};
