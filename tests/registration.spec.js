import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
   await page.fill('[name="username"]', 'Admin');
   await page.fill('[name="password"]', 'admin123');
   await page.locator('[type="submit"]').click()
   const header = await page.locator('h6')
   await expect(header).toHaveText('Dashboard')
})

test('add a PIM user', async ({page}) => {
   await page.getByText('PIM').click()
   await page.getByText('Add').first().click()
   await page.locator('[name="firstName"]').fill('Zoran1')
   await page.locator('[name="middleName"]').fill('ga')
   await page.locator('[name="lastName"]').fill('Jovanov')
   await page.locator('[type="submit"]').click()
   const successSaved = page.getByText("Successfully Saved");
   await expect(successSaved).toHaveText("Successfully Saved")
   await page.locator('[type="submit"]').first().click()
})

test('add Admin user', async ({page}) => {
   await page.getByText('Admin').click()
   await page.getByText('Add').click()
   await page.getByText('Select').first().click()
   await page.locator('[role="option"]').locator(':text-is("ESS")').click()
   await page.locator('[class="oxd-grid-item oxd-grid-item--gutters"]').nth(2).click()
   await page.locator('[role="option"]').locator(':text-is("Enabled")').click()
   //employee name
   const firstInput = page.getByRole('textbox', { name: 'Type for hints...' });
   await firstInput.fill('Zoran');
   await page.keyboard.press('Backspace')
   await page.waitForSelector('[role="option"]')
   await page.getByText('Zoran1 ga Jovanov').click()
   //username
   const usernameInput = page.getByRole('textbox').nth(2);
   await usernameInput.fill('Bogdanre1234')
   //pass
   const pass = page.getByRole('textbox').nth(3);
   await pass.fill("Mar1234")
   //confirm pas
   const confPass = page.getByRole('textbox').nth(4);
   await confPass.fill("Mar1234")
   await page.locator('[type="submit"]').click()
   //verify that the user is added
   const successSaved = page.getByText("Successfully Saved")
   await expect(successSaved).toHaveText("Successfully Saved")
})

test('create PIM user add personal details and login with that user', async ({page}) => {
   await page.getByText('PIM').click()
   await page.getByText('Add').first().click()
   await page.locator('[name="firstName"]').fill('Zoran2')
   await page.locator('[name="middleName"]').fill('ga')
   await page.locator('[name="lastName"]').fill('Jovanov')
   //click on the checkbox create login details
   await page.locator('form span').click()
   //Create login details
   await page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').fill("test Mim6")
   //password
   await page.locator('input[type="password"]').first().fill("testmare123")
   //confirm password
   await page.locator('input[type="password"]').nth(1).fill("testmare123")
   //save employee
   await page.locator('[type="submit"]').click()
   const successSaved = page.getByText("Successfully Saved")
   await expect(successSaved).toHaveText("Successfully Saved")
   //click on the profile name
   await page.locator('[class="oxd-userdropdown"]').click()
   //click logout button
   await page.getByRole('menuitem', { name: 'Logout' }).click()
   //login woth new credentials
   await page.fill('[name="username"]', 'test Mim6');
   await page.fill('[name="password"]', 'testmare123');
   await page.locator('[type="submit"]').click()
   await page.getByText('My Info').click()
   //click nationality
   await page.getByText('-- Select --').first().click()
   await page.getByRole('option', { name: 'Serbian' }).click()
   //click merital status
   await page.getByText('-- Select --').first().click()
   await page.getByRole('option', { name: 'Married' }).click()
   //license expiry date
   await page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first().click()
   const button  = page.getByRole('button', { name: '' }).nth(1)
   for (let i = 0; i < 5; i++) {
   await button.click();
   }
   await page.getByText('4', { exact: true }).click()
   //blood type
   await page.getByText('-- Select --').first().click()
   await page.getByRole('option', { name: 'A-' }).click()
   //attachment
   await page.getByText(' Add ').first().click()
   const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.getByText('No file selected').click(),
   ])
   await fileChooser.setFiles(['tests/dummy.pdf'])
   await page.locator('[type="submit"]').nth(2).click()
   const successSaved1 = page.getByText("Successfully Saved")
   await expect(successSaved1).toHaveText("Successfully Saved")
})

test('edit contact details', async ({page}) => {
   await page.getByText('PIM').click()
   await page.getByText('Add').first().click()
   await page.locator('[name="firstName"]').fill('Kole')
   await page.locator('[name="middleName"]').fill('Koa')
   await page.locator('[name="lastName"]').fill('Jovic')
   //click on the checkbox create login details
   await page.locator('form span').click()
   await page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').fill("y6 Mim")
   //password
   await page.locator('input[type="password"]').first().fill("testmare123")
   //confirm password
   await page.locator('input[type="password"]').nth(1).fill("testmare123")
   //save employee
   await page.locator('[type="submit"]').click()


   //contact details click
   await page.getByText('Contact Details').click()
   //street 1 2
   // const loadingSpinner = page.locator('[class="oxd-loading-spinner"]').first();
   // await loadingSpinner.waitFor({ state: 'detached'});
   async function waitForSpinnerToDisappear(page) {
   await page.locator('[class="oxd-loading-spinner"]').waitFor({ state: 'detached', timeout: 10000 });
   }
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(1).clear();
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(1).pressSequentially("Hilandarska 1", { delay: 100 })
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(1).clear();
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(1).fill("moravska");
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(2).pressSequentially("Milutina milankovica", { delay: 100 })
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(3).pressSequentially("Kingslanding", { delay: 100 })
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(4).pressSequentially("north pole", { delay: 100 })
   await page.locator('div' , {hasText:"Street 1"}).locator('input').nth(5).pressSequentially("21000", { delay: 100 })
   //country click
   await page.getByText('-- Select --').click()
   await page.getByRole('option', { name: 'Cameroon' }).click()
   //telephone
   await page.locator('div:nth-child(6) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').first().fill('123456')
   await page.locator('div:nth-child(6) > .oxd-grid-3 > div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-input').first().fill('987654')
   await page.locator('div:nth-child(6) > .oxd-grid-3 > div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-input').fill("658974")
   //email
   await page.locator('div:nth-child(9) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').first().fill("test3@mail.com")
   await page.locator('div:nth-child(9) > .oxd-grid-3 > div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-input').fill("stale3@mail.com")
   await page.getByRole('button', { name: 'Save' }).click()
   const successSaved1 = page.getByText("Successfully Updated")
   await expect(successSaved1).toHaveText("Successfully Updated")
})

test('add emergency contact', async ({page}) => {
   await page.getByText('PIM').click()
   await page.getByText('Add').first().click()
   await page.locator('[name="firstName"]').fill('stole')
   await page.locator('[name="middleName"]').fill('tane')
   await page.locator('[name="lastName"]').fill('Sobic')
   //click on the checkbox create login details
   await page.locator('form span').click()
   await page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').fill("xasn uim")
   //password
   await page.locator('input[type="password"]').first().fill("testmare123")
   //confirm password
   await page.locator('input[type="password"]').nth(1).fill("testmare123")
   //save employee
   await page.locator('[type="submit"]').click()
   await page.getByText('Emergency Contacts').click()
   await page.getByRole('button', { name: ' Add' }).first().click()
   await page.locator('form').getByRole('textbox').first().fill('Maximus')
   await page.locator('form').getByRole('textbox').nth(1).fill("single")
   await page.locator('form').getByRole('textbox').nth(2).fill('+381098765')
   await page.locator('form').getByRole('textbox').nth(3).fill('064555000')
   await page.locator('form').getByRole('textbox').nth(4).fill('654987')
   await page.locator('[type="submit"]').click()
   await page.getByRole('button', { name: ' Add' }).nth(1).click()
   const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.getByText('No file selected').click(),
   ])
   await fileChooser.setFiles(['tests/dummy.pdf'])
   await page.getByRole('textbox', { name: 'Type comment here' }).fill('loram ipsum dolar sit')
   const saveButton = page.locator('[type="submit"]').nth(1);
   await saveButton.scrollIntoViewIfNeeded();
   await saveButton.click();
   await page.getByRole('row', { name: ' dummy.pdf loram ipsum dolar' }).locator('span i').click()
   await page.getByText(' Delete Selected ').click()
   await page.getByText(' Yes, Delete ').click()
})
