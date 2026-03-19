// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Login Functionality', () => {
  test('should allow a user to log in successfully', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Expect a title "to contain" a substring.
    //await expect(page).toHaveTitle(/Test Login Page/);
    await expect(page).toHaveTitle(/Test Login | Practice Test Automation/);

    // Fill in the username and password
    await page.locator('#username').fill('student');
    await page.locator('#password').fill('Password123');

    // Click the submit button
    await page.locator('#submit').click();

    // Verify the URL after login
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');

    // Verify the success message is visible
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
  });
});
