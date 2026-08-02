
const { test,expect } = require('@playwright/test');

test('@Web Network Abort Example', async ({ page }) => {

    // For any URL, abort loading the css
    await page.route('**/*.css',route => route.abort());

    await page.goto('https://rahulshettyacademy.com/loginpagePractise');

    //await page.pause();
 

})