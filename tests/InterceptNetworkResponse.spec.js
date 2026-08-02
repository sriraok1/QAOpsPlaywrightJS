
const{test,expect,request} = require('@playwright/test');
const{APIUtils} = require('../utils/APIUtils');

const loginUrl = 'https://rahulshettyacademy.com/api/ecom/auth/login';
const loginPayLoad = { userEmail: "sriraok@gmail.com", userPassword: "Terminator329@" };

const orderUrl = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;
const fakeResponseNoOrders = { data: [], message: "No Orders" };

test.beforeAll( async() => {    
    
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginUrl, loginPayLoad);
    response = await apiUtils.createOrder(orderUrl, orderPayLoad);

})

test('@API Place Order through API and Intercept Network Response', async ({page}) => {
    
    await page.addInitScript( (value) => {
        window.localStorage.setItem('token', value);
        }, response.tokenValue
    );

    await page.goto('https://rahulshettyacademy.com/client');

    // Print the order id
    console.log('Order Id: ' + response.orderId);

    // Fetch the current response and inject a fake response in that place
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const routeResponse = await page.request.fetch(route.request());
            let fakeBody = JSON.stringify(fakeResponseNoOrders);
            route.fulfill(
                {
                    routeResponse,
                    fakeBody,
                }
            )
        }
    )

    // Click on the 'ORDERS' button
    await page.locator("button[routerlink*='myorders']").click();

    // Wait for the response of the mentioned URL
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');

    console.log(await page.locator('.mt-4').textContent());

})
