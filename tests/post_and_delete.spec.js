import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
   await page.fill('[name="username"]', 'Admin');
   await page.fill('[name="password"]', 'admin123');
   await page.locator('[type="submit"]').click()
   const header = await page.locator('h6')
   await expect(header).toHaveText('Dashboard')
})

test('add a buzz post with a PIM user', async ({page}) => {
   await page.getByText('PIM').click()
   await page.getByText('Add').first().click()
   await page.locator('[name="firstName"]').fill('Zoran3')
   await page.locator('[name="middleName"]').fill('ga3')
   await page.locator('[name="lastName"]').fill('Jovanov')
   //click on the checkbox create login details
   await page.locator('form span').click()
   //Create login details
   await page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').fill("tes Mim6")
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
   await page.fill('[name="username"]', 'tes Mim6');
   await page.fill('[name="password"]', 'testmare123');
   await page.locator('[type="submit"]').click()
   //click on buzz menu item
   await page.getByRole('link', { name: 'Buzz' }).click()
   //fill "what's on your mind" post
   await page.getByRole('textbox', { name: 'What\'s on your mind?' }).fill("Jon has been wokring in Filipins for ten years")
   await page.getByRole('button', { name: 'Post', exact: true }).click()
})

test('create, edit and delete a PIM user', async ({page}) => {
   await page.getByText('PIM').click()
   await page.getByText('Add').first().click()
   await page.locator('[name="firstName"]').fill('Goran')
   await page.locator('[name="middleName"]').fill('ga3')
   await page.locator('[name="lastName"]').fill('Jovanov')
   //save employee
   await page.locator('[type="submit"]').click()
   const successSaved = page.getByText("Successfully Saved")
   await expect(successSaved).toHaveText("Successfully Saved")
   //click on the PIM
   await page.getByRole('link', { name: 'PIM' }).click()
   await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill("Goran ga3 Jovanov")
   await page.getByText('Goran ga3 Jovanov').first().click()
   await page.getByRole('button', { name: 'Search' }).click()
   //click on checkbout to mark teh PIM user
   await page.getByRole('cell', { name: '' }).locator('i').click()
   //click edit button
   await page.getByRole('button', { name: '' }).click()
   //enter the driving license
   await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first().clear();
   await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first().pressSequentially("987654321", { delay: 100 })
   await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first().clear()
   await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first().fill("987654321")
   await page.waitForTimeout(4000)
   //enteer the license expiry date
   await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByPlaceholder('yyyy-dd-mm').click()
   await page.getByText("30").click()
   await page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).locator('i').nth(1).click()
   await page.getByText('Argentinean').click()
   await page.locator('[type="submit"]').first().click()
   //click on PIM and search
   await page.getByRole('link', { name: 'PIM' }).click()
   await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill("Goran ga3 Jovanov")
   await page.getByText('Goran ga3 Jovanov').first().click()
   await page.getByRole('button', { name: 'Search' }).click()
   //click on checkbout to mark teh PIM user
   await page.getByRole('cell', { name: '' }).locator('i').click()
   //click delete trash button
   await page.getByText(" Delete Selected ").click()
   await page.getByText(" Yes, Delete ").click()
   //check is it delete successfully
   const successSaved1 = page.getByText("Successfully Deleted")
   await expect(successSaved1).toHaveText("Successfully Deleted")
})