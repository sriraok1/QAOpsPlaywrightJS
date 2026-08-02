
class OrderSummaryPage {

    constructor(page) {

        this.page = page;
        this.orderSummaryTitle = page.locator('.email-title');
        this.orderSummaryOrderIdLabel = page.locator('.col-text');
    }

    async getOrderSummaryOrderId() {

        // Wait for the Order Summary page to be loaded by checking for the 'ORDER SUMMARY' title
        await this.orderSummaryTitle.waitFor();

        const orderSummaryOrderId = await this.orderSummaryOrderIdLabel.textContent();

        return orderSummaryOrderId;

    }

}

module.exports = { OrderSummaryPage };
