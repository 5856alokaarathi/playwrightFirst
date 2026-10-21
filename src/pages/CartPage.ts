import {test, Locator, expect, Page} from "@playwright/test";

export class CartPage {
  private readonly page: Page   

    private readonly checkoutButton: Locator;  
    private readonly addToCartButton: Locator;
    private readonly itemName: Locator;
    private readonly itemPrice: Locator;
    private readonly itemCard: Locator;
    private cartMap:Map<string, string>[]=[];
    private readonly cartButton:Locator
    private readonly itemNameIntheCart:Locator;
    private readonly itemPriceIntheCart:Locator;
    private readonly cartPageTitle:Locator;

    
    
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
        this.itemName = this.page.locator('[data-test="inventory-item-name"]');
        this.itemPrice = this.page.locator('[data-test="inventory-item-price"]');
        this.itemCard = this.page.locator('[data-test="inventory-item"]');
        this.cartButton = this.page.locator('[data-test="shopping-cart-link"]');
        this.itemNameIntheCart = this.page.locator('[data-test="inventory-item-name"]');
        this.itemPriceIntheCart = this.page.locator('[data-test="inventory-item-price"]');
        this.cartPageTitle = this.page.locator('[data-test="title"]')
    }

    async clickOnRandomItem() {
        const items = await this.itemCard.elementHandles();
        const randomIndex = Math.floor(Math.random() * items.length);
        const selectedItem = this.itemCard.nth(randomIndex);
        const itemName = await selectedItem.locator('[data-test="inventory-item-name"]').innerText();
        const itemPrice = await selectedItem.locator('[data-test="inventory-item-price"]').innerText();
        console.log(`Selected Item: ${itemName} - Price: ${itemPrice}`);
        const itemDetails = new Map<string, string>()
        itemDetails.set('name', itemName.trim());
        itemDetails.set('price', itemPrice.trim() );
        this.cartMap.push(itemDetails);
        const selectedAddtoCartButton = await selectedItem.getByRole('button', { name: 'Add to cart' });
        await selectedAddtoCartButton.click();
        return itemDetails;
    }

    async verifyCartDetails(){
        await this.cartButton.click();
        await expect(this.cartPageTitle).toBeVisible();
        const  itemIntheCartName = await this.itemNameIntheCart.innerText();
        const itemIntheCartPrice = await this.itemPriceIntheCart.innerText();
        const firstItem = this.cartMap[0];
        const itemNameInUi = firstItem?.get('name') ?? '';
        const itemPriceInUi = firstItem?.get('price')?? '';
        await expect(this.itemNameIntheCart).toContainText(itemNameInUi);
        await expect(this.itemPriceIntheCart).toContainText(itemPriceInUi);
    }

    async convertPrice()
    {
        const firstItem = this.cartMap[0];
        const itemPriceUi = firstItem?.get('price')?? '';
        const cleanedPrice = itemPriceUi.replace(/[^0-9.]/g, "");
        const priceNumber = parseFloat(cleanedPrice);
    }

    async clickCheckoutButton()
    {
        await this.checkoutButton.click();
    }


}