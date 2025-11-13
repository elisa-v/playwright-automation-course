   const {test,expect} = require('@playwright/test')

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});

test.describe.configure({mode: 'serial'});
// it make sure that if one test fails the other will stop if I precisely mention "serial"

test("@Web Popup validations",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
   // await page.pause();
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
     const textCheck =await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


})

test("Screenshot & Visual comparision",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'}) // partial screenshot
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'}); // capture entire page
    await expect(page.locator("#displayed-text")).toBeHidden();
});


// VISUAL TESTING
// screenshot -> store -> screenshot --> to compare screenshot

test("visual",async({page})=>
{
    await page.goto("https://google.com/");
    await expect(await page.screenshot()).toMatchSnapshot('landing.png');
    // take screenshot after landing on the page
    // on the first run the test will fail because you don't have the 'landing.png' file
});





