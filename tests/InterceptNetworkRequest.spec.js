
const { test,expect } = require('@playwright/test');

test('@Web Intercept Network Request', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const emailAddress = 'sriraok@gmail.com';

    // Login
    await page.locator('#userEmail').fill(emailAddress);
    await page.locator('#userPassword').fill('Terminator329@');
    const loginButton = page.locator('#login');
    await loginButton.click();
    await page.locator('.card-body b').first().waitFor(); // Wait for the page to load the first element

    // Click on the 'ORDERS' button
    await page.locator("button[routerlink*='myorders']").click();
    
    // Get the current request and inject our own request
    page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    );

    await page.locator('button:has-text("View")').first().click();

    //await page.pause();

    await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order');

})