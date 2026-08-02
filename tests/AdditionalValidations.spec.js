
const { test, expect } = require('@playwright/test');

// Run tests in parallel within the same test file
//test.describe.configure({mode:'parallel'});

test('@Web Additional Validations', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator('#displayed-text')).toBeVisible();

    await page.locator('#hide-textbox').click();

    await page.screenshot({ path: 'screenshot_1.png' });

    await expect(page.locator('#displayed-text')).toBeHidden();

    await page.locator('#show-textbox').click();

    await expect(page.locator('#displayed-text')).toBeVisible();

    await page.locator('#displayed-text').screenshot({ path: 'Element_Screenshot.png' });

    // Listener for the pop-up
    page.on('dialog', async dialog => { await dialog.accept() });

    await page.locator('#confirmbtn').click();

    await page.getByRole('button', { name: 'Mouse Hover' }).hover();

    // Locating a frame inside the page
    const frameWindow = page.frameLocator('#courses-iframe');

    //Click on 'All Access Plan'
    await frameWindow.getByRole('link', { name: 'All Access plan' }).click();

    const joinMessage = await frameWindow.locator('.text h2').textContent();
    console.log(joinMessage.split(" ")[1]);

    await context.close();

})

test('@Web Visual Test', async ({ page }) => {

    await page.goto('https://www.google.com');

    // Match the page screenshot exactly with the LandingPage.png. Note that the test will fail for the very first time as the 'LandingPage.png' will not be present during the first run, but it gets created as the test fails the very first time
    expect(await page.screenshot()).toMatchSnapshot('LandingPage.png');

})