// pages/LoginPageSH.js

const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage.js'); // Inherits from BasePage

// The class name should also reflect the file name for clarity
exports.LoginPageSH = class LoginPageSH extends BasePage {

  constructor(page) {
    super(page); // Calls the BasePage constructor

    // Define the primary locators. The BasePage will handle fallbacks.
    this.usernameInput = this.createHealedLocator({
      primary: ['getByRole', 'textbox3', { name: 'Username' }]
    });
    //Delivberately using 'textbox3' to simulate a broken locator for testing self-healing.

    this.passwordInput = this.createHealedLocator({
      primary: ['getByRole', 'textbox', { name: 'Password' }]
    });

    this.submitButton = this.createHealedLocator({
      primary: ['getByRole', 'button', { name: 'Submit' }]
    });
  }

  async goto() {
    await this.page.goto('/practice-test-login/');
    await expect(this.page).toHaveTitle('Test Login | Practice Test Automation');
  }

  async login(username, password) {
    // Get the locators by calling the functions
    const usernameField = await this.usernameInput();
    const passwordField = await this.passwordInput();
    const submitBtn = await this.submitButton();

    // Perform the actions
    await usernameField.fill(username);
    await passwordField.fill(password);
    await submitBtn.click();
  }
};
