// tests/loginPOM Self Heal.spec.js

// Import 'test' from your custom fixtures file
const { test, expect } = require('./test-fixtures.js');

// Import the new LoginPageSH class from its file
const { LoginPageSH } = require('../pages/LoginPageSH.js');
// Assuming you have a standard HomePage/LoggedInPage for the next step
const { HomePage } = require('../pages/HomePage.js');

test.describe('Login Functionality with Self-Healing', () => {

  test('should allow a user to log in successfully', async ({ page, username, password }) => {
    
    // ---> CREATE AN INSTANCE OF LoginPageSH <---
    const loginPage = new LoginPageSH(page);
    const homePage = new HomePage(page);

    // The rest of the test remains exactly the same!
    // The complexity is hidden in the page object.

    // 1. Go to the login page
    await loginPage.goto();

    // 2. Perform the login action
    await loginPage.login(username, password);

    // 3. Verify that the login was successful
    await homePage.assertIsLoggedIn();
  });
});
