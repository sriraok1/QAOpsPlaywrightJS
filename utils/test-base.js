
const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testDataForOrder:
        {
            "emailAddress": "sriraok@gmail.com",
            "password": "Terminator329@",
            "productName": "ZARA COAT 3"
        }
    }
)
