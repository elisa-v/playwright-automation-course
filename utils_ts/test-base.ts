import {test as baseTest} from '@playwright/test';

interface TestDataForOrder{
    username: string;
    password: string;
    productName: string;
    countryForOrder: string;
    textToSelectCountry: string;
}

export const customtest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
testDataForOrder: {
        username: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3",
        countryForOrder: "India",
        textToSelectCountry: "ind"
        }
    });