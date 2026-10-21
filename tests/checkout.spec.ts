import { LoginPage } from "../src/pages/LoginPage";
import { CartPage } from "../src/pages/CartPage";
import { CheckoutPage } from "../src/pages/CheckoutPage";
import * as loginData from "../src/testData/LoginData.json"
import {test, expect} from '@playwright/test';

test.describe("Checkout Page", () => {
    
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.login(loginData.validUsername, loginData.validPassword);
    })


    test("Verify that user can add a random item to the cart and verify the details and checkout", async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const itemDetails = await cartPage.clickOnRandomItem();
        console.log(`Item added to cart: ${itemDetails.get('name')} - Price: ${itemDetails.get('price')}`);
        await cartPage.verifyCartDetails();
        await cartPage.clickCheckoutButton();
        await checkoutPage.submitInformation();
        await checkoutPage.downloadPDF();
    })

})

