import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';


test.beforeEach(async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goto();
});

test('add item to cart shows badge count', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await expect(inventoryPage.getCartBadge()).toHaveText('1');
});

test('add two different items to cart shows badge count', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart('Sauce Labs Bike Light');
  await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
  await expect(inventoryPage.getCartBadge()).toHaveText('2');
});

test('remove one item from cart shows badge count', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart('Sauce Labs Bike Light');
  await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
  await expect(inventoryPage.getCartBadge()).toHaveText('2');
  await inventoryPage.removeFromCart('Sauce Labs Bike Light');
  await expect(inventoryPage.getCartBadge()).toHaveText('1');
});

test('sort items by price low to high', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortBy('lohi');
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
  const sortedPrices = [...numericPrices].sort((a, b) => a - b);
  expect(numericPrices).toEqual(sortedPrices);
});