class CartPage{
    constructor(page){
        this.checkoutButt = page.locator("text=Checkout");
    }

    async goToCheckout(){
        await this.checkoutButt.click();
    }
}

module.exports = {CartPage}