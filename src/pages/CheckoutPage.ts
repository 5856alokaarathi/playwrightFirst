import {test, Locator, expect, Page} from "@playwright/test";
import {DataGenerators} from  '../utils/DataGenerators';


class CheckoutPage {
    private readonly page: Page

    private readonly checkoutPageTitle:Locator;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly postalCode:Locator;
    private readonly continueButton;
    private readonly finishButton:Locator;
    private readonly completeOrderBanner:Locator;
    private readonly generatePDF:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.checkoutPageTitle = this.page.locator('[data-test="title"]');
        this.firstName = this.page.locator('[data-test="firstName"]');
        this.lastName = this.page.locator('[data-test="lastName"]');
        this.postalCode = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.finishButton = this.page.locator('[data-test="finish"]');
        this.completeOrderBanner = this.page.locator('[data-test="complete-header"]');
        this.generatePDF = this.page.locator('[data-test="generate-pdf-order"]');
    }

    async submitInformation()
    {
        await expect(this.checkoutPageTitle).toBeVisible();
        await expect(this.firstName).toBeEditable();
        const user = DataGenerators.generateCheckoutCustomer();
        const firstNameGenerated = user.firstName;
        const secondNameGenerated = user.lastName;
        const postalCodeGenerated = user.postalCode;

        await this.firstName.fill(firstNameGenerated);
        await this.lastName.fill(secondNameGenerated);
        await this.postalCode.fill(postalCodeGenerated);
        await this.continueButton.click();

        await expect(this.finishButton).toBeVisible();
        await this.finishButton.click();

        await expect(this.completeOrderBanner).toBeVisible();
    }

    async downloadPDF()
    {
        await expect(this.generatePDF).toBeVisible();
        const downloadPromise = this.page.waitForEvent('download');

        await this.generatePDF.click();
        const download = await downloadPromise;
        const fileName = download.suggestedFilename();
        expect(fileName).toContain('.pdf');

    }

}

module.exports = {CheckoutPage};