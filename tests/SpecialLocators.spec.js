
const{test,expect} = require('@playwright/test');

test('@Web Special Locators Demo', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/angularpractice');

    await page.getByLabel('Check me out if you Love IceCreams!').check(); //Check/Select the check box.
    await page.getByLabel('Employed').check(); // Check/Select the Employed Radio button
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('password@123');
    await page.locator(".form-control[name='name']").fill('John Doe');
    await page.locator(".form-control[name='email']").fill('abc@gmail.com');
    await page.getByRole("button", {name: 'Submit'}).click();

    await expect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible();

    await page.getByRole("link", {name: 'Shop'}).click();

    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole("button", {name: 'Add'}).click();

    await context.close();

})