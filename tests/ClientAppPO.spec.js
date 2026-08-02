
const { test, expect } = require('@playwright/test');

const { customTest } = require('../utils/test-base');

const dataset = require('../testData/ClientAppPOTestData.json');

const { PageObjectManager } = require('../pageObjects/PageObjectManager');

for (const data of dataset) {
    test(`@Web Client App Login ${data.productName}`, async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        // Create the object for PageObjectManager which invokes its constructor
        const pageObjectManager = new PageObjectManager(page);


        // Login Page

        // Get the loginPage object from PageObjectManager
        const loginPage = pageObjectManager.getLoginPage();

        // Go to the Login page
        await loginPage.goToLoginPage();

        // Login
        await loginPage.validLogin(data.emailAddress, data.password);


        // Dashboard Page

        // Get the dashboardPage object from PageObjectManager
        const dashboardPage = pageObjectManager.getDashboardPage();

        // Search for the Product and Add it to Cart
        await dashboardPage.searchProductAddToCart(data.productName);

        // Click on the 'Cart' icon
        await dashboardPage.navigateToCartPage();


        // Cart Page

        // Get the cartPage object from PageObjectManager
        const cartPage = pageObjectManager.getCartPage();

        // Display the items in the Cart
        await cartPage.displayItemsInCart();

        // Validate that the item added to cart, is visible On the Cart page.
        await expect(page.locator(`h3:has-text("${data.productName}")`)).toBeVisible();

        // Click on the 'Checkout' button
        await cartPage.navigateToCheckoutPage();


        // Checkout Page

        // Get the checkoutPage object from PageObjectManager
        const checkoutPage = pageObjectManager.getCheckoutPage();

        // Fill details on the Checkout page
        await checkoutPage.fillDetailsOnCheckoutPage();

        // Validate the emailLabel to have the emailAddress
        await expect(checkoutPage.emailLabel).toHaveText(data.emailAddress);

        // Click on 'Place Order'
        await checkoutPage.placeOrder();


        // Order Confirmation Page

        // Get the orderConfirmationPage object from PageObjectManager
        const orderConfirmationPage = pageObjectManager.getOrderConfirmationPage();

        // Validate the order confirmation message    
        await expect(orderConfirmationPage.orderConfirmation).toHaveText(' Thankyou for the order. ');

        // Get Order Id
        const orderIdText = await orderConfirmationPage.getOrderId();

        // Click on the 'ORDERS' button
        await orderConfirmationPage.navigateToYourOrdersPage();


        // Your Orders Page

        // Get the yourOrdersPage object from PageObjectManager
        const yourOrdersPage = pageObjectManager.getYourOrdersPage();

        // Search for the current order
        await yourOrdersPage.searchCurrentOrderAndViewOrderSummary(orderIdText);


        // Order Summary Page

        // Get the orderSummaryPage object from PageObjectManager
        const orderSummaryPage = pageObjectManager.getOrderSummaryPage();

        // Get the Order Id on the Order Summary Page
        const orderSummaryOrderId = await orderSummaryPage.getOrderSummaryOrderId();

        // Validate that the Order Id (after removing the spaces and the | on both sides) on the Order Confirmation page is same as the Order Id on the Order Summary Page
        await expect(orderIdText).toBe(orderSummaryOrderId)

        await context.close();

    });
}

customTest.skip('@CustomFixture Client App Login using Custom Test Fixture', async ({ browser, testDataForOrder }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    // Create the object for PageObjectManager which invokes its constructor
    const pageObjectManager = new PageObjectManager(page);


    // Login Page

    // Get the loginPage object from PageObjectManager
    const loginPage = pageObjectManager.getLoginPage();

    // Go to the Login page
    await loginPage.goToLoginPage();

    // Login
    await loginPage.validLogin(testDataForOrder.emailAddress, testDataForOrder.password);


    // Dashboard Page

    // Get the dashboardPage object from PageObjectManager
    const dashboardPage = pageObjectManager.getDashboardPage();

    // Search for the Product and Add it to Cart
    await dashboardPage.searchProductAddToCart(testDataForOrder.productName);

    // Click on the 'Cart' icon
    await dashboardPage.navigateToCartPage();


    // Cart Page

    // Get the cartPage object from PageObjectManager
    const cartPage = pageObjectManager.getCartPage();

    // Display the items in the Cart
    await cartPage.displayItemsInCart();

    // Validate that the item added to cart, is visible On the Cart page.
    await expect(page.locator(`h3:has-text("${testDataForOrder.productName}")`)).toBeVisible();

    // Click on the 'Checkout' button
    await cartPage.navigateToCheckoutPage();


    // Checkout Page

    // Get the checkoutPage object from PageObjectManager
    const checkoutPage = pageObjectManager.getCheckoutPage();

    // Fill details on the Checkout page
    await checkoutPage.fillDetailsOnCheckoutPage();

    // Validate the emailLabel to have the emailAddress
    await expect(checkoutPage.emailLabel).toHaveText(testDataForOrder.emailAddress);

    // Click on 'Place Order'
    await checkoutPage.placeOrder();


    // Order Confirmation Page

    // Get the orderConfirmationPage object from PageObjectManager
    const orderConfirmationPage = pageObjectManager.getOrderConfirmationPage();

    // Validate the order confirmation message    
    await expect(orderConfirmationPage.orderConfirmation).toHaveText(' Thankyou for the order. ');

    // Get Order Id
    const orderIdText = await orderConfirmationPage.getOrderId();

    // Click on the 'ORDERS' button
    await orderConfirmationPage.navigateToYourOrdersPage();


    // Your Orders Page

    // Get the yourOrdersPage object from PageObjectManager
    const yourOrdersPage = pageObjectManager.getYourOrdersPage();

    // Search for the current order
    await yourOrdersPage.searchCurrentOrderAndViewOrderSummary(orderIdText);


    // Order Summary Page

    // Get the orderSummaryPage object from PageObjectManager
    const orderSummaryPage = pageObjectManager.getOrderSummaryPage();

    // Get the Order Id on the Order Summary Page
    const orderSummaryOrderId = await orderSummaryPage.getOrderSummaryOrderId();

    // Validate that the Order Id (after removing the spaces and the | on both sides) on the Order Confirmation page is same as the Order Id on the Order Summary Page
    await expect(orderIdText).toBe(orderSummaryOrderId)

    await context.close();

});
