import {Locator, Page} from '@playwright/test';

export class CartPage{
    checkoutButt: Locator;
    
    constructor(page:Page){
        this.checkoutButt = page.locator("text=Checkout");
    }

    async goToCheckout(){
        await this.checkoutButt.click();
    }
}

module.exports = {CartPage}