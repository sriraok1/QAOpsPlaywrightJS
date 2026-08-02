
class DashboardPage {

    constructor(page) {

        this.page = page;
        this.products = page.locator('.card-body');
        this.productsTitles = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");

    }

    async searchProductAddToCart(productName) {

        // Wait for the Dashboard page to load the first element
        await this.productsTitles.first().waitFor();

        // Print all the Titles of the Products on the Dashboard page
        const allTitles = await this.productsTitles.allTextContents();
        console.log('Available Products: ' + allTitles);

        // Add To Cart
        await this.products.filter({ hasText: productName }).getByRole('button', { name: ' Add To Cart' }).click();

    }

    async navigateToCartPage() {

        // Click on the 'Cart' icon
        await this.cart.click();

    }

}

module.exports = { DashboardPage };
