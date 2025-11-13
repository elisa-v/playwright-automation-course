const {test, expect} = require('@playwright/test');


test.skip('Browser Context Playwright test', async ({page})=>
    {
        const products = page.locator(".card-body");
        const email = "anshika@gmail.com";
        const productName = 'ZARA COAT 3'
        await page.goto("http://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill("Iamking@000");
        await page.locator("[value='Login']").click();
        // await page.waitForLoadState('networkidle');
        // alternatives
        await page.locator(".card b").first().waitFor(); //I need to pass a single element

        const titles = await page.locator(".card b").allTextContents();
        console.log(titles);

        // Zara coat 3
        const count = await products.count();
        for(let i=0; i< count; ++i)
        {
            //chaining locator, you search inside products
            if(await products.nth(i).locator("b").textContent() === productName)
            {
                //add to cart
                await products.nth(i).locator("text= Add to Cart").click(); //find whatever element that is on the page
                break;
            }
        }

        await page.locator("[routerlink*='cart']").click();
        //find whatever element that is on the page with tag h3
        // so we need to put the waitFor
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        // isVisible does not wait 
        await expect(bool).toBeTruthy();

        await page.locator("text=Checkout").click();
        // type is depricated, fill put it all at once, but we need to put it sequentially
        await page.locator("[placeholder*='Select Country']").pressSequentially("ind");
        const dropdown = await page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for(let i=0; i<optionsCount; i++)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text.trim() === "India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".action__submit").click();

        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId)

        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        /* await page.locator(".ng-star-inserted").nth(3).waitFor();
        const bool2 = await page.locator("th:has-text('681a0ab2fd2af1c99e11c3bc')").isVisible();
        expect(bool2).toBeTruthy(); */

        const rows = await page.locator("tbody tr");

        for(let i=0; i<await rows.count(); ++i)
        {
            const rowOrderID = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderID))
            {
                await rows.nth(i).locator("button").first().click()
                break;
            }
        }

        const orderIdDetail = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetail)).toBeTruthy();





    });