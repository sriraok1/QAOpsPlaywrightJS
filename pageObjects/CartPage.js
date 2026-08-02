
class CartPage {

    constructor(page) {

        this.page = page;
        this.itemsInCart = page.locator('.cart li h3');
        this.checkoutButton = page.locator('button:has-text("Checkout")');
    }

    async displayItemsInCart() {

        // Wait for the Cart page to load
        await this.itemsInCart.first().waitFor();

        // Print the Products in the Cart
        console.log('Products in the Cart: ' + await this.itemsInCart.allTextContents());

    }

    async navigateToCheckoutPage() {

        // Click on the 'Checkout' button
        await this.checkoutButton.click();

    }

}

module.exports = { CartPage };
