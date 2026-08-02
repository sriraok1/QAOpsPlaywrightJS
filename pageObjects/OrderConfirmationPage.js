class OrderConfirmationPage {

    constructor(page) {

        this.page = page;
        this.orderConfirmation = page.locator('.hero-primary');
        this.orderIdLabel = page.locator('label.ng-star-inserted');        
        this.orders = page.locator("button[routerlink*='myorders']")

    }

    async getOrderId() {

        const orderId = await this.orderIdLabel.textContent();
        const orderIdText = orderId.split(' ')[2];

        // Print the order id
        console.log('Order Id: ' + orderId);        
        console.log('Order Id after removing the spaces and the | on both sides: ' + orderIdText);

        return orderIdText;

    }

    async navigateToYourOrdersPage(){

        // Click on the 'ORDERS' button
        await this.orders.click();

    }

}

module.exports = { OrderConfirmationPage };
