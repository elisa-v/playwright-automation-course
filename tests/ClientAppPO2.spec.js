const { expect, test } = require('@playwright/test');
const { customtest} = require('../utils/test-base.js');

const { POManager } = require('../pageobject/POManager');
//  json -> string -> js object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));


for (const data of dataset) {
    test(`@Web Client App Place Order for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductsAddCart(data.productName);
        await dashboardPage.navigateToCart();
        await expect(await dashboardPage.getProductLocator(data.productName)).toBeVisible();

        const cartPage = poManager.getCartPage();
        await cartPage.goToCheckout();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.selectCountry(data.countryForOrder, data.textToSelectCountry);
        await expect(checkoutPage.usernameInfo).toHaveText(data.username);
        await checkoutPage.placeOrder();

        const orderConfirmationPage = poManager.getOrderConfirmationPage();
        await expect(orderConfirmationPage.message).toHaveText(" Thankyou for the order. ");

        const orderId = await orderConfirmationPage.orderID.textContent();
        await console.log(orderId);
        await orderConfirmationPage.goToOrders();

        const orderPage = poManager.getOrderPage();
        await orderPage.viewOrder(orderId);

        const orderSummaryPage = poManager.getOrderSummaryPage();
        console.log(await orderSummaryPage.orderIdDetail.textContent());
        await expect(orderId.includes(await orderSummaryPage.orderIdDetail.textContent())).toBeTruthy();

    });
}

customtest(`Client App`, async ({ page, testDataForOrder }) => {
        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductsAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();
        await expect(await dashboardPage.getProductLocator(testDataForOrder.productName)).toBeVisible();

        const cartPage = poManager.getCartPage();
        await cartPage.goToCheckout();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.selectCountry(testDataForOrder.countryForOrder, testDataForOrder.textToSelectCountry);
        await expect(checkoutPage.usernameInfo).toHaveText(testDataForOrder.username);
        await checkoutPage.placeOrder();

        const orderConfirmationPage = poManager.getOrderConfirmationPage();
        await expect(orderConfirmationPage.message).toHaveText(" Thankyou for the order. ");

        const orderId = await orderConfirmationPage.orderID.textContent();
        await console.log(orderId);
        await orderConfirmationPage.goToOrders();

        const orderPage = poManager.getOrderPage();
        await orderPage.viewOrder(orderId);

        const orderSummaryPage = poManager.getOrderSummaryPage();
        console.log(await orderSummaryPage.orderIdDetail.textContent());
        await expect(orderId.includes(await orderSummaryPage.orderIdDetail.textContent())).toBeTruthy();

    });