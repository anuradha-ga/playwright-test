import { test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page).toHaveURL(/inventory/);
});
test('add item to cart shows badge count', async ({ page }) => {
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('add Sauce Labs Bike Light to cart shows badge count', async ({ page }) => {
    await page.locator('.inventory_item', { hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('add two diffrent items to cart shows badge count', async ({ page }) => {
    await page.locator('.inventory_item', {hasText: 'Sauce Labs Bike Light'}).getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.inventory_item', {hasText: 'Sauce Labs Bolt T-Shirt'}).getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('remove one item from cart shows badge count', async ({ page }) => {
    await page.locator('.inventory_item', {hasText: 'Sauce Labs Bike Light'}).getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.inventory_item', {hasText: 'Sauce Labs Bolt T-Shirt'}).getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.locator('.inventory_item', {hasText: 'Sauce Labs Bike Light'}).getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('cart shows correct items after adding', async ({ page }) => {
    await page.locator('.inventory_item', {hasText: 'Sauce Labs Bike Light'}).getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.inventory_item', {hasText: 'Sauce Labs Backpack'}).getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.cart_item', {hasText: 'Sauce Labs Bike Light'})).toBeVisible();
    await expect(page.locator('.cart_item', {hasText: 'Sauce Labs Backpack'})).toBeVisible();
});

test('sort items by price low to high', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('lohi');
    const firstPrice = await page.locator('.inventory_item_price').first().textContent();
    const lastPrice = await page.locator('.inventory_item_price').last().textContent();
    expect(firstPrice).toBe('$7.99');
    expect(lastPrice).toBe('$49.99');
});