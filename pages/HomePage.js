const {expect} = require('@playwright/test');
exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.successMessage = page.getByText('Congratulations student. You successfully logged in!');
  }

  /**
   * Asserts that the user is on the logged-in page.
   */
  async assertIsLoggedIn() {
    await expect(this.page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    await expect(this.successMessage).toBeVisible();
  }

}