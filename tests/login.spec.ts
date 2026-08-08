import { LoginPage } from "../src/pages/LoginPage";
import { test, expect } from "@playwright/test";
import * as loginData from "../src/testData/LoginData.json";

test.describe("Login Tests", () => { 

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
})

test("Valid Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(loginData.validUsername, loginData.validPassword);
  await expect(page).toHaveURL("/inventory.html");
})

test("Verify that user cannot login to the page with incorrect username with correct password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(loginData.invalidUsername, loginData.validPassword);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
})

test("Verify that user cannot login to the page with correct username with incorrect password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(loginData.validUsername, loginData.invalidPassword);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
})

test.afterEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.closeBrowser();
})

});