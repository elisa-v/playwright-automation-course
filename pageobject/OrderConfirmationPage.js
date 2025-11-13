class OrderConfirmationPage{
    constructor(page){
        this.page = page;
        this.message = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersButt =page.locator("button[routerlink*='myorders']")
    }

    async goToOrders(){
        await this.ordersButt.click();
        await this.page.locator("tbody").waitFor();
    }

}

module.exports = {OrderConfirmationPage}