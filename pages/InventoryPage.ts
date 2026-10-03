import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addToCart(productName: string) {
    await this.page
      .locator('.inventory_item', { hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFromCart(productName: string) {
    await this.page
      .locator('.inventory_item', { hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  getCartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async sortBy(option: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }
}