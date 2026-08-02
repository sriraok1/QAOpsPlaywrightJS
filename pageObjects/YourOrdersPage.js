
class YourOrdersPage {

    constructor(page) {

        this.page = page;
        this.orders = page.locator('tbody tr');

    }

    async searchCurrentOrderAndViewOrderSummary(orderIdText) {

        // Wait for the 'Your Orders' page to load. This waitFor() is needed, because the count() below does NOT have the auto-wait capability.
        await this.page.locator('tbody').waitFor();

        const ordersCount = await this.orders.count();

        console.log('Number of Orders listed: ' + ordersCount);

        // Print all the Orders on the 'Your Orders' page
        const allTexts = await this.orders.locator('th').allTextContents();
        allTexts.forEach((t, idx) => console.log(`Row ${idx}:`, JSON.stringify(t)));

        // Find the current order on the 'Your Orders' page
        for (let i = 0; i < ordersCount; i++) {
            const order = await this.orders.nth(i).locator('th').textContent();
            if (order === orderIdText) {
                console.log('Current Order found on row# ' + (i + 1));
                await this.orders.nth(i).getByRole('button', { name: 'View' }).click(); // Click on the 'View' button
                break;
            }
            else if (i === (ordersCount - 1))
                console.log('Current Order not found in the Orders History page');
        }

    }

}

module.exports = { YourOrdersPage };
