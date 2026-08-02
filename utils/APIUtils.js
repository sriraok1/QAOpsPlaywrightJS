
class APIUtils {

    constructor(apiContext, loginUrl, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
        this.loginUrl = loginUrl;

    }

    async getToken() {

        const loginResponse = await this.apiContext.post(this.loginUrl, { data: this.loginPayLoad });
        const loginResponseJson = await loginResponse.json(); // Get the JSON from the response
        const loginTokenValue = loginResponseJson.token; // Get the token from the JSON
        console.log(loginTokenValue);
        return loginTokenValue;
    }

    async createOrder(orderUrl, orderPayLoad) {

        let response = {}; // Create an empty object
        response.tokenValue = await this.getToken();

        const orderResponse = await this.apiContext.post(orderUrl,
            {
                data: orderPayLoad,
                headers: {
                    'authorization': response.tokenValue,
                    'content-type': 'application/json'
                }
            }
        )
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }

}

module.exports = { APIUtils };
