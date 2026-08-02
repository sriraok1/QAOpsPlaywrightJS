
class LoginPage {

    constructor(page) {

        this.page = page;
        this.userNameTextBox = page.locator('#userEmail');
        this.passwordTextBox = page.locator('#userPassword');
        this.loginButton = page.locator('#login');

    }

    async goToLoginPage(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(emailAddress,password) {

        await this.userNameTextBox.fill(emailAddress);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();

    }

}

module.exports = {LoginPage};
