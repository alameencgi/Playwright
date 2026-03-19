// tests/test-fixtures.js

const base = require('@playwright/test');

// Extend the base test object with your custom fixtures.
exports.test = base.test.extend({
  // Define a new "username" test fixture.
  username: [
    // The first argument is the default value. It's pulled from the config.
    async ({}, use, testInfo) => {
      await use(testInfo.project.use.username);
    },
    // The second argument marks this as an option.
    { scope: 'test', option: true }
  ],

  // Define a new "password" test fixture.
  password: [
    async ({}, use, testInfo) => {
      await use(testInfo.project.use.password);
    },
    { scope: 'test', option: true }
  ]
});

// Re-export 'expect' so you can import it from this file as well.
exports.expect = base.expect;
