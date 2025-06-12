//home page is opened
await expect(page.locator('#slider')).toBeVisible();

//click on Login button
await page.locator('a i.fa-lock').click();

//Verify 'New User Signup!' is visible
await expect(page.locator('div.signup-form')).toContainText('New User Signup!');