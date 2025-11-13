const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName =page.locator('#username');
        const signIn = page.locator('#signInBtn');
        const cardTitle = page.locator(".card-body a");
        await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        // css
        // type and fill, but type is depricated now
        await userName.fill("rahulshetty");
        await page.locator("[type='password']").fill("learning");
        await signIn.click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        // type - fill
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();

        // How to access the 1st element nth(0) or first()
        console.log(await cardTitle.first().textContent()); 
        console.log(await cardTitle.nth(1).textContent());
        // no synchr, allTextContents doesn't wait
        const allTitles = await cardTitle.allTextContents(); 
        console.log(allTitles);
    });

test('UI controls', async ({page})=>
    {
        await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
        const userName =page.locator('#username');
        const signIn = page.locator('#signInBtn');
        const dropDown = page.locator ("select.form-control");
        const documentLink = page.locator("[href*='documents-request']");

        await dropDown.selectOption("consult");

        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(await page.locator(".radiotextsty").last()).toBeChecked();

        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();

        
        await expect(documentLink).toHaveAttribute("class", "blinkingText");
        });

test('Child windows hadl', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName =page.locator('#username');
        await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']");

        //it won't proceed until both are fulfilled, they need to go asynch and in parallel  
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), //listen for any new page to open. pending, rejected, fulfilled
            documentLink.click(),// new page is opening
        ]) // new page is open
        // you need to give an array in case it opens multiple windows

        const text = await newPage.locator(".red").textContent();
        const arrayText =  text.split("@")
        const domain = arrayText[1].split(" ")[0]
        console.log(domain);

        await userName.fill(domain);
        console.log(await userName.textContent());

        });