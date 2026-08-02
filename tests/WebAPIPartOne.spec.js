
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginUrl = 'https://rahulshettyacademy.com/api/ecom/auth/login';
const loginPayLoad = { userEmail: "sriraok@gmail.com", userPassword: "Terminator329@" };

const orderUrl = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;

test.beforeAll(async () => {

    // Create a new API request context so that it can be independently used to make HTTP requests (GET, POST, PUT, DELETE, etc.) directly, without going through a browser page.
    const apiContext = await request.newContext();

    // Create the apiUtils object which invokes its constructor
    const apiUtils = new APIUtils(apiContext, loginUrl, loginPayLoad);

    // Create order
    response = await apiUtils.createOrder(orderUrl, orderPayLoad);

})

test('@API Place Order through API', async ({ page }) => {

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, response.tokenValue
    );

    await page.goto('https://rahulshettyacademy.com/client');

    // Print the order id
    console.log('Order Id: ' + response.orderId);

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
        if (order === response.orderId) {
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
    await expect(response.orderId).toBe(orderSummaryOrderId);

})
