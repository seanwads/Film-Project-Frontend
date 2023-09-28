const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://store.steampowered.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Welcome to Steam/);
});

test('store link', async ({ page }) => {
  await page.goto('https://store.steampowered.com/');

  // Hover over store page link
  await page.getByRole('link', { name: 'STORE', exact:true }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Featured & Recommended' })).toBeVisible();
});

test('community link', async ({ page }) => {
    await page.goto('https://store.steampowered.com/');
  
    await page.getByRole('link', { name: 'COMMUNITY', exact:true }).click();
  
    await expect(page).toHaveTitle(/Steam Community/);
  });

test('search function', async({ page }) => {
    await page.goto('https://store.steampowered.com/');

    await page.getByRole('textbox').fill('skyrim');
    await page.getByRole('textbox').press('Enter');

    await expect(page.getByText('The Elder Scrolls V: Skyrim Special Edition', { exact:true })).toBeVisible();

    await page.getByText('The Elder Scrolls V: Skyrim Special Edition', { exact:true }).click();

    await expect(page).toHaveTitle(/The Elder Scrolls V: Skyrim Special Edition/);
    
})

test('scroll page', async({ page }) => {
    await page.goto('https://store.steampowered.com/');

    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

})

test('age gate', async({ page }) => {
    await page.goto('https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/');

    await expect(page).toHaveTitle(/The Elder Scrolls V: Skyrim Special Edition/);

    if(page.getByText('Please enter your birth date to continue')) {
        await page.locator('#ageYear').selectOption('2002');
        await page.getByRole('link', {name: 'View Page'}).click();
    } 
    else if(page.getByText('By clicking the "View Page" button below you affirm')) {
        await page.getByRole('link', {name: 'View Page'}).click();
    }

    await expect(page.getByRole('heading', {name: 'Buy the Elder Scrolls V: Skyrim Special Edition'})).toBeVisible();

})

test('add to cart then remove from cart', async({ page}) => {
    await page.goto('https://store.steampowered.com/app/413150/Stardew_Valley/');
    await page.getByRole('link', {name: 'Add to Cart'}).click();
    await expect(page).toHaveTitle(/Shopping Cart/);

    await expect(page.getByRole('link', {name: 'Stardew Valley'})).toBeVisible();

    await page.getByRole('link', {name:'Remove', exact:true}).click();
    await expect(page.getByText('Your item has been removed!')).toBeVisible();
    await expect(page.locator('.cart_item_list')).toBeEmpty();
})

test('sign in', async({ page }) => {
    await page.goto('https://store.steampowered.com/');

    await page
        .locator('#content_login')
        .getByRole('link', {name: 'Sign In'})
        .click();

    await expect(page.getByText('Sign in', {exact:true}).first()).toBeVisible();

    await page.locator('#responsive_page_template_content input[type="text"]').fill('username');
    await page.locator('input[type="password"]').fill('password');

    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Please check your password and account name and try again')).toBeVisible();
    
})