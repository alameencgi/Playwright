// tests/loginPOM.spec.js

// ---> THIS IS THE CRITICAL CHANGE <---
// Import 'test' from your new fixtures file, NOT from '@playwright/test'.
const { test, expect } = require('./test-fixtures.js');
// ------------------------------------

const { LoginPage } = require('../pages/LoginPage.js');
const { HomePage } = require('../pages/HomePage.js');

test.describe('Login Functionality', () => {

  // This line will now work perfectly!
  test('should allow a user to log in successfully', async ({ page, username, password }) => {
    
    // Create instances of the page objects
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // --- The test steps ---

    // 1. Go to the login page
    await loginPage.goto();
    await page.pause();

    // 2. Perform the login action, passing in the credentials
    await loginPage.login(username, password);

    // 3. Verify that the login was successful
    await homePage.assertIsLoggedIn();
  });
});
