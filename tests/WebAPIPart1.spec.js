
const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayLoad = {userEmail:"elisa@gmail.com",userPassword:"Ciao1998@"};
const orderPayLoad = {orders: [{country: "Italy", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};

let response;
test.beforeAll( async()=>
{
    // login API
   const apiContext = await request.newContext(); // you can request the context, as in browser
   const apiUtils = new ApiUtils(apiContext, loginPayLoad);
   response = await apiUtils.createOrder(orderPayLoad);

})

test('Place the order', async ({ page }) => {
    //js file- Login js, DashboardPage

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
  
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (response.orderID.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    /* await page.pause(); */
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();
  
 });

 // verifiy if order is showing in history page
 // precondition - create order - check if there is an API for that
 // in Network -> Fetch/XHR -> Headers, there is also Request Headers with Authorization



 /* const {APiUtils} = require('../utils/APiUtils'); */
/* const loginPayLoad = {userEmail:"elisa@gmail.com",userPassword:"Ciao1998@"};
const orderPayLoad = {orders: [{country: "Italy", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
 */
/* let token; 
let orderID;
test.beforeAll( async()=>
{
    // login API
   const apiContext = await request.newContext(); // you can request the context, as in browser
   //later we need an API call instead of a page. here you need to put the request URL
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayLoad
    });
    // we need to make sure that the response works, normally it's something like 200,201..
    expect(loginResponse.ok()).toBeTruthy();
    // you need to go to Network -> Fetch -> login -> Response
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }
    )
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderID = orderResponseJson.orders[0];

})
 */