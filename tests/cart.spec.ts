import { LoginPage } from "../src/pages/LoginPage";
import { test, expect } from "@playwright/test";
import * as loginData from "../src/testData/LoginData.json";
import { CartPage } from "../src/pages/CartPage";

test.describe("Cart Tests", () => {

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login(loginData.validUsername, loginData.validPassword);
})

test("Verify that user can add a random item to the cart and verify the details", async ({ page }) => {
  const cartPage = new CartPage(page);
  const itemDetails = await cartPage.clickOnRandomItem();
  console.log(`Item added to cart: ${itemDetails.get('name')} - Price: ${itemDetails.get('price')}`);
  // Here you can add assertions to verify the item details in the cart
  // For example, you can navigate to the cart page and check if the item is present
  await cartPage.verifyCartDetails();
  
})

})