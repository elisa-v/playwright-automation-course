import {Page, Locator} from '@playwright/test';

export class OrderSummaryPage{
    page:Page;
    orderIdDetail:Locator;

    constructor(page:Page){
        this.orderIdDetail = page.locator(".col-text")
    }

    ciao(){
        
    }

}

module.exports = {OrderSummaryPage}