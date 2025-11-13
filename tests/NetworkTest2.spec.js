const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({page}) => {

    //login
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3'
    await page.goto("http://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    // alternatives
    await page.locator(".card b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    //when user tries to click on "view" button let's try to intercept
    // * = whoever click on View, it takes any ID
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        // you continue in this way, with this other url
        // here before sending to the browser we are intercepting and changing it, previously we manipulated it after receiving
        route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',

        })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})