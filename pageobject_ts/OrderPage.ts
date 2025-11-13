import {Page, Locator} from '@playwright/test';

export class OrderPage{
    page:Page;
    tableRows:Locator;

    constructor(page:Page){
        this.page = page;
        this.tableRows = page.locator("tbody tr")
    }

    async viewOrder(orderid:any){

        for(let i=0; i<await this.tableRows.count(); ++i)
        {
            const orderidTemp:any = await this.tableRows.nth(i).locator("th").textContent();
            if(orderid.includes(orderidTemp))
            {
                await this.tableRows.nth(i).locator("button").first().click()
                await this.page.locator(".col-text").waitFor();
                break;
            }
        } 
    }

}

module.exports = {OrderPage}