
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { CartPage } = require('../pageObjects/CartPage');
const { CheckoutPage } = require('../pageObjects/CheckoutPage');
const { OrderConfirmationPage } = require('../pageObjects/OrderConfirmationPage');
const { YourOrdersPage } = require('../pageObjects/YourOrdersPage');
const { OrderSummaryPage } = require('../pageObjects/OrderSummaryPage');

class PageObjectManager {

    constructor(page) {

        this.page = page;

        // Create the object for LoginPage which invokes its constructor
        this.loginPage = new LoginPage(this.page);

        // Create the object for DashboardPage which invokes its constructor
        this.dashboardPage = new DashboardPage(this.page);

        // Create the object for CartPage which invokes its constructor
        this.cartPage = new CartPage(this.page);

        // Create the object for CheckoutPage which invokes its constructor
        this.checkoutPage = new CheckoutPage(this.page);

        // Create the object for OrderConfirmationPage which invokes its constructor
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);

        // Create the object for YourOrdersPage which invokes its constructor
        this.yourOrdersPage = new YourOrdersPage(this.page);

        // Create the object for OrderSummaryPage which invokes its constructor
        this.orderSummaryPage = new OrderSummaryPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }

    getYourOrdersPage() {
        return this.yourOrdersPage;
    }

    getOrderSummaryPage() {
        return this.orderSummaryPage;
    }

}

module.exports = { PageObjectManager };
