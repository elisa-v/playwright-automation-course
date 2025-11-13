import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {CheckoutPage} from './CheckoutPage';
import {OrderConfirmationPage} from './OrderConfirmationPage';
import {OrderPage} from './OrderPage';
import {OrderSummaryPage} from './OrderSummaryPage';
import {Page} from '@playwright/test'

export class POManager{
        loginPage: LoginPage;
        dashboardPage: DashboardPage; 
        cartPage: CartPage;
        checkoutPage: CheckoutPage;
        orderConfirmationPage: OrderConfirmationPage;
        orderPage: OrderPage;
        orderSummaryPage: OrderSummaryPage;
        page: Page;

    constructor(page:Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.orderSummaryPage = new OrderSummaryPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }

    getOrderPage(){
        return this.orderPage;
    }

    getOrderSummaryPage(){
        return this.orderSummaryPage;
    }
}

module.exports = {POManager}