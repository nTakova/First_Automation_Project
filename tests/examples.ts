//Verify that 'Logged in as username' is visible
page.locator("a", { has: page.locator("i.fa-user") })
const valueUserName = (await page.locator("a", { has: page.locator("i.fa-user") }).textContent())!.trim();
await expect(valueUserName).toBe(`Logged in as ${userName}`);



//click on Login button
await page.locator('a', { has: page.locator('i.fa-lock') }).click();



//Enter name and email address
const userName: string = "TEST";
const email: string = config.email;
await page.locator('input[data-qa="signup-name"]').fill(userName);
await page.locator('input[data-qa="signup-email"]').fill(email);



await page.locator('a', {
    has: page.locator('i.fa-list')
}).filter({
    hasText: 'Test Cases'
}).click();



//Click on Products button
await page.locator('a', { has: page.locator('i.card_travel') }).click();



//Click on 'Cart' buttoн

await page.locator('a[href="/view_cart"]', {
    has: page.locator('i.fa-shopping-cart')
}).filter({
    hasText: 'Cart'
}).click();




//Click 'Add to cart' button
const addToCart: Locator = page.locator('.product-information');
const cartButton: Locator = addToCart.locator('.fa-shopping-cart');
await cartButton.click();

//Click 'View Cart' button
await expect(page.locator('#cartModal')).toBeVisible();
const viewCart = page.locator('.modal-body a[href="/view_cart"]');
await viewCart.click();




//Hover over first product and click 'Add to cart'

await page.locator('a', { has: page.locator('i.card_travel') }).click();
const firstItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
await firstItem.hover();
await firstItem.locator('.overlay-content').locator('a[data-product-id="1"]').click();