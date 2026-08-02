
class CheckoutPage {

    constructor(page) {

        this.page = page;
        this.cvvCode = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
        this.nameOnCard = page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
        this.emailLabel = page.locator(".user__name label[type='text']");
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.countryDropDown = page.locator('.ta-results')
        this.placeOrderButton = page.locator('.action__submit');

    }

    async fillDetailsOnCheckoutPage() {

        // Enter the CVV code        
        await this.cvvCode.fill('239');

        // Enter the Name on the card
        await this.nameOnCard.fill('John Doe');

        // Select the Country drop-down and enter the characters i,n,d one by one
        await this.selectCountry.pressSequentially('ind', { delay: 150 });

        // Wait for the drop-down values to appear
        await this.countryDropDown.waitFor();

        // Select the option ' India'
        await this.page.locator(".ta-item").filter({ hasText: /^ India$/ }).click();

    }

    async placeOrder() {

        // Click on 'Place Order'
        await this.placeOrderButton.click();

    }

}

module.exports = { CheckoutPage };
