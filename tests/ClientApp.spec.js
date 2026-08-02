
const { test, expect } = require('@playwright/test');

test.skip('@WebStandalone Client App Login', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const emailAddress = 'sriraok@gmail.com';

    // Login
    await page.locator('#userEmail').fill(emailAddress);
    await page.locator('#userPassword').fill('Terminator329@');
    const loginButton = page.locator('#login');
    await loginButton.click();

    //console.log(await page.locator('.card-body b').nth(0).textContent()); //To fetch the 1st element

    await page.locator('.card-body b').first().waitFor(); // Wait for the page to load the first element
    const allTitles = await page.locator('.card-body b').allTextContents();
    console.log('Available Products: ' + allTitles);

    // Add To Cart
    await page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' }).getByRole('button', { name: ' Add To Cart' }).click();

    /*  This is another way of adding the item to the cart:
    
        const products = await page.locator('.card-body');
        const count = await products.count();
        
        await console.log('Products count = ' + count);
        for(let i=0; i<count; i++){
            const product = await products.nth(i);
            const productName = await product.locator('b').textContent();
            if(productName.trim() === 'ZARA COAT 3'){
                await product.locator('button').filter({hasText: ' Add To Cart'}).first().click();            
                break;
            }        
        }
     */

    // Click on the 'Cart' icon
    await page.locator("[routerlink*='cart']").click();

    // Wait for the Cart page to load
    await page.locator('.cart li h3').first().waitFor();
    await console.log('Products in the Cart: ' + await page.locator('.cart li h3').allTextContents());

    // Validate that the item added to cart, is visible On the Cart page.
    await expect(page.locator('h3:has-text("ZARA COAT 3")')).toBeVisible();

    // Click on the 'Checkout' button
    await page.locator('button:has-text("Checkout")').click();

    // Wait for the Checkout page to be loaded, by checking for the 'Place Order' button on the Checkout page
    // await page.locator('.action__submit').waitFor();  --> This waitFor() is not needed because the .fill action below already has the auto-wait capability.

    // Enter the CVV code
    const cvvCode = await page.locator("//div[@class='payment__cc']//div[2]//input[1]");
    await cvvCode.fill('239');

    // Enter the Name on the card
    const nameOnCard = await page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
    await nameOnCard.fill('John Doe');

    // Validate the email address
    const emailLabel = await page.locator(".user__name label[type='text']");

    await expect(emailLabel).toHaveText(emailAddress);

    // Select the Country drop-down
    const selectCountry = await page.locator("[placeholder*='Country']");

    // Enter the characters i,n,d one by one
    await selectCountry.pressSequentially('ind', { delay: 150 });

    // Wait for the drop-down values to appear
    const countryDropDown = await page.locator('.ta-results').waitFor();

    // Select the option ' India'
    const selectIndia = await page.locator(".ta-item")
        .filter({ hasText: /^ India$/ })
        .click();


    /* To find the actual inner text. This is how we found that there was a space in front of the text 'India' as in ' India' and hence replaced the above text with .filter({ hasText: /^ India$/ }) instead of .filter({ hasText: /^India$/ })
        const items = await page.locator(".ta-item");
        const itemsCount = await items.count();
        for (let i = 0; i < itemsCount; i++) {
          console.log(JSON.stringify(await items.nth(i).innerText()));
        }
    */

    // Click on 'Place Order'
    await page.locator('.action__submit').click();

    // Wait for the 'Click To Download Order Details in CSV' button to appear on the Order Confirmation page
    // await page.locator('button.btn-primary').waitFor();  --> This waitFor() is not needed because the toHaveText() below is an auto-retrying assertion similar to auto-wait.

    // Validate the order confirmation message
    const orderConfrmtion = await page.locator('.hero-primary');
    await expect(orderConfrmtion).toHaveText(' Thankyou for the order. ');

    // Print the order id
    const orderId = await page.locator('label.ng-star-inserted').textContent();
    console.log('Order Id: ' + orderId);

    const orderIdText = orderId.split(' ')[2];
    console.log('Order Id after removing the spaces and the | on both sides: ' + orderIdText);

    // Click on the 'ORDERS' button
    await page.locator("button[routerlink*='myorders']").click();

    // Wait for the 'Your Orders' page to load. This waitFor() is needed, because the count() below does NOT have the auto-wait capability.
    await page.locator('tbody').waitFor();

    const orders = page.locator('tbody tr');
    const ordersCount = await orders.count();

    console.log('Number of Orders listed: ' + ordersCount);

    // Print all the Orders on the 'Your Orders' page
    const allTexts = await orders.locator('th').allTextContents();
    allTexts.forEach((t, idx) => console.log(`Row ${idx}:`, JSON.stringify(t)));

    // Find the current order on the 'Your Orders' page
    for (let i = 0; i < ordersCount; i++) {
        const order = await orders.nth(i).locator('th').textContent();
        if (order === orderIdText) {
            console.log('Current Order found on row# ' + (i + 1));
            await orders.nth(i).getByRole('button', { name: 'View' }).click();
            break;
        }
        else if (i === (ordersCount - 1))
            console.log('Current Order not found in the Orders History page');
    }

    // Wait for the Order Summary page to be loaded by checking for the 'ORDER SUMMARY' title
    await page.locator('.email-title').waitFor();

    const orderSummaryOrderId = await page.locator('.col-text').textContent();
    await expect(orderIdText).toBe(orderSummaryOrderId)

    await context.close();

})
