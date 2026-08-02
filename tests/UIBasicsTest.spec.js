
const{test,expect} = require('@playwright/test');

test('@Web Browser Context Playwright Test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // Log the Request URL
    page.on('request', request => console.log(request.url()));

    // Log the Response URL and the corresponding Status Code
    page.on('response', response => console.log(response.url(), response.status()));

    const userName = page.locator('#username');
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const roleDropDown = page.locator('select.form-control');
    const userRadioButton = page.locator('#usertype').nth(1);
    const termsCheckBox = page.locator('#terms');
    const documentLink = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");
    
    await userName.fill("johndoe");
    await password.fill("Learning@830$3mK2");

    await signInButton.click();

    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await roleDropDown.selectOption('consult');

    await userRadioButton.click();    
    await page.locator('#okayBtn').click();

    await expect(userRadioButton).toBeChecked();
    
    await termsCheckBox.check();
    await expect(termsCheckBox).toBeChecked();

    await termsCheckBox.uncheck();
    await expect(termsCheckBox).not.toBeChecked();

    await expect(documentLink).toHaveAttribute('class','blinkingText');

    await signInButton.click();

    console.log(await page.locator('.card-body a').nth(0).textContent());
    console.log(await page.locator('.card-body a').nth(1).textContent());
    console.log(await page.locator('.card-body a').nth(2).textContent());
    console.log(await page.locator('.card-body a').nth(3).textContent()); 

    await context.close();
})

test('@Web Handle multiple pages Test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const roleDropDown = page.locator('select.form-control');
    const userRadioButton = page.locator('#usertype').nth(1);
    const termsCheckBox = page.locator('#terms');
    const documentLink = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");
    
    await userName.fill("johndoe");
    await password.fill("Learning@830$3mK2");

    await signInButton.click();

    const userNameErrorMessage = page.locator("[style*='block']");
    console.log(await userNameErrorMessage.textContent());

    await expect(userNameErrorMessage).toContainText('Incorrect');    

    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await roleDropDown.selectOption('consult');

    await userRadioButton.click();    
    await page.locator('#okayBtn').click();

    await expect(userRadioButton).toBeChecked();
    
    await termsCheckBox.check();
    await expect(termsCheckBox).toBeChecked();

    await termsCheckBox.uncheck();
    await expect(termsCheckBox).not.toBeChecked();

    await expect(documentLink).toHaveAttribute('class','blinkingText');

    const [pageTwo] = await Promise.all([page.context().waitForEvent('page'), documentLink.click()]);
    await pageTwo.waitForLoadState();

   const emailText = await pageTwo.locator('.red').textContent();
   await console.log('Text is: ' + emailText);

   const arrayText = emailText.split('@');
   const domainName = arrayText[1].split(' ')[0];

   await userName.fill(domainName);
   //await page.pause();
   await console.log(await userName.inputValue());

   await context.close();

})

test('@Web Page Context Playwright Test', async ({page}) => {
    test.setTimeout(120_000);    
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})
