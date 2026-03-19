npx playwright test >> Run Tests in headless
npx playwright test --headed >> Run tests in UI
npx playwright test --debug >> Open playwright debugger
npx playwright test --ui >> Runs in playwright native UI in headless mode
npx playwright test --ui --headed >> Runs in playwright native UI in UI mode
npx playwright test --headed with await page.pause(); in the script will pause and open debug from there
npx playwright test --ui --headed will also work with await page.pause();
Also use VS code Playright extension for debug with debug pointers