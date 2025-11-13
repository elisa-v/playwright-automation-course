class DashboardPage{
    constructor(page){
        this.page = page
        this.products = page.locator(".card-body");
        this.productsText= page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.textCartProduct = page.locator("h3:has-text('ZARA COAT 3')")
    }

    async searchProductsAddCart(productName){

        const titles = await this.productsText.allTextContents();
        console.log(titles);

        // Zara coat 3
        const count = await this.products.count();
        for(let i=0; i< count; ++i)
        {
            //chaining locator, you search inside products
            if(await this.products.nth(i).locator("b").textContent() === productName)
            {
                //add to cart
                await this.products.nth(i).locator("text= Add to Cart").click(); //find whatever element that is on the page
                break;
            }
        }
    }

    async getProductLocator(productName){
        return await this.page.locator("h3:has-text('"+productName+"')")
        }

    async navigateToCart(){
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();
    }
}

module.exports = {DashboardPage}