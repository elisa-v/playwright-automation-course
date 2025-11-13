import {Page, Locator} from '@playwright/test';

export class CheckoutPage{
    page:Page;
    dropDownCountry:Locator;
    dropDownCountryResults:Locator;
    dropDownCountryOptions:Locator;
    usernameInfo:Locator;
    placeOrderButt:Locator;

    constructor(page:Page){
        this.page = page;
        this.dropDownCountry = this.page.locator("[placeholder*='Select Country']")
        this.dropDownCountryResults = this.page.locator(".ta-results");
        this.dropDownCountryOptions = this.dropDownCountryResults.locator("button")
        this.usernameInfo = this.page.locator(".user__name [type='text']").first()
        this.placeOrderButt = this.page.locator(".action__submit");
    }

    async selectCountry(country:string, textCountry:string){
        await this.dropDownCountry.pressSequentially(textCountry);
        await this.dropDownCountryResults.waitFor();
        const optionsCount = await this.dropDownCountryOptions.count();
        for(let i=0; i<optionsCount; i++)
        {
            const text:any = await this.dropDownCountryOptions.nth(i).textContent();
            if(text.trim() === country)
            {
                await this.dropDownCountryOptions.nth(i).click();
                break;
            }
        }
    }

    async placeOrder(){
        await this.placeOrderButt.click();
    }

}

module.exports = {CheckoutPage}