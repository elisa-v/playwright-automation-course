// Login --> json
// it can copy all the data in the storgae space when you login

// there is a way to copy the entire storage space 
// test browser, cart-, oerder, order details, order history 

const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("elisa@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Ciao1998@");
    await page.getByRole('button', {name: "Login"}).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'}); 
});

test('@API Client App login', async () => {

    const email = "";
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto("http://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    
    // await page.locator(".card b").first().waitFor(); 

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).
    getByRole('button', {name: "Add to Cart"}).click();

    await page.getByRole("listitem").getByRole('button', {name: "Cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", {name: 'Checkout'}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    /* const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor(); */
    await page.getByRole("button", {name: 'India'}).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
});
