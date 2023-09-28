const { test, expect } = require('@playwright/test');

test('page load', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect page to contain page heading - thus, page has loaded
    await expect(page.getByText('Totally Real And Not Auto-Generated Movies')).toBeVisible();
});

test('fetch films', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    //Assert page contains first film card of list of films
    await expect(page.getByTestId('film-card-1')).toBeVisible();
    await expect(page.getByText('ABSOLUTE DINOSAUR')).toBeVisible();

    //Assert page contains correct number of elements
    const count = await page.locator(".card").count();
    expect(count).toBeGreaterThan(1000);
        
})

test('filter films', async({ page }) => {
    await page.goto('http://localhost:3000/');

    //Select 'Action' category filter
    await page.getByRole('button', {name:'Action'}).click();

    //Assert that page does not contain first film card - thus films have been filtered
    await expect(page.getByTestId('film-card-1')).toBeHidden();
    await expect(page.getByText('ABSOLUTE DINOSAUR')).toBeHidden();

    //Select 'All' category filter
    await page.getByRole('button', {name:'All'}).click();

    //Assert page contains first film card of list of films
    await expect(page.getByTestId('film-card-1')).toBeVisible();
    await expect(page.getByText('ABSOLUTE DINOSAUR')).toBeVisible();

    //Assert page contains correct number of elements
    const count = await page.locator(".card").count();
    expect(count).toBeGreaterThan(1000);
})

test('edit film', async({ page }) => {
    await page.goto('http://localhost:3000/');

    //Assert that update menu is not open on load
    await expect(page.getByRole('textbox')).toBeHidden();

    //Open update menu for first film in list
    await page
        .getByTestId('film-card-1')
        .getByRole('button', {name:'Update'})
        .click(); 
    
    //Fill update input field and submit
    await page.getByTestId('nameTextbox').fill('EDIT_TEST_PLACEHOLDER_TITLE');
    await page.getByTestId('descTextbox').fill('EDIT_TEST_PLACEHOLDER_DESC');
    await page.getByRole('button', {name:'Submit'}).click();

    //Assert that film has been edited and page has been updated
    await expect(page.getByText('EDIT_TEST_PLACEHOLDER_TITLE')).toBeVisible();

    //Open update menu for first film in list
    await page
        .getByTestId('film-card-1')
        .getByRole('button', {name:'Update'})
        .click(); 
    
    //Reset film name to original
    await page.getByTestId('nameTextbox').fill('ABSOLUTE DINOSAUR');
    await page.getByTestId('descTextbox').fill('A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies');
    await page.getByRole('button', {name:'Submit'}).click();
})

test('create film', async({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(page.getByRole('button', {name: 'Submit'})).toBeHidden();

    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByRole('button', {name: 'Submit'})).toBeVisible();

    await page.getByTestId('title-input').fill('CREATE_TEST_PLACEHOLDER_TITLE');
    await page.getByTestId('desc-input').fill('CREATE_TEST_PLACEHOLDER_DESC');
    await page.getByTestId('desc-input').fill('2000');
    await page.getByRole('button', {name:'Submit'}).click();

    await expect(page.getByText('CREATE_TEST_PLACEHOLDER_TITLE')).toBeVisible();

    await page
        .getByRole('button',{name:'Delete'})
        .last()
        .click();
})

test('delete film', async({ page }) => {
    await page.goto('http://localhost:3000/');

    //Click delete button for most recently created film (film created in 'create film' test)
    await page
        .getByRole('button',{name:'Delete'})
        .last()
        .click();

    //Assert that test film has been deleted
    await expect(page.getByText('CREATE_TEST_PLACEHOLDER_TITLE')).toBeHidden();
})