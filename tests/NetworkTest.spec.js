
const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');

const loginPayLoad = { userEmail: "elisa@gmail.com", userPassword: "Ciao1998@" };
const orderPayLoad = { orders: [{ country: "Italy", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = { data: [], message: "No orders" }; // java script object

let response;
test.beforeAll(async () => {
    // login API
    const apiContext = await request.newContext(); // you can request the context, as in browser
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})

// create order is success
test('Place the order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    // which element we want to route, 2nd argument is a function 
    // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/681a6477fd2af1c99e126b8d",
    // the * is to generalise so it's not linked to a specific account
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            // intercepting response -> API response --> {fake response playwright} -> browser -> render data
            const rows = await page.request.fetch(route.request()); //page.request is a method, from browser page to helper mode, we fetch the response of the API call
            // you send that response to browser, to render it automatically to browser
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
                // if you don't put anything you will send the same response, but now we are overwriting the body
            );
        }
    );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());


    /* await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr"); */



});
