
import {expect, test} from '@playwright/test'
import { createUser } from '../helpers/createUser'

test.beforeEach(async({page}) => {
   //login to admin
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
   await page.fill('[name="username"]', 'Admin');
   await page.fill('[name="password"]', 'admin123');
   await page.locator('[type="submit"]').click()
})


test('add a PIM user', async ({page}) => {
   await page.getByText('PIM').click()
   await page.getByText('Add').first().click()
   await page.locator('[name="firstName"]').fill('Zoran1')
   await page.locator('[name="middleName"]').fill('ga')
   await page.locator('[name="lastName"]').fill('Jovanov')
   //Create login details
   await page.locator('form span').click()
   await page.locator('input.oxd-input.oxd-input--active').nth(5).fill("marey")
   //password
   await page.locator('input[type="password"]').first().fill("testmare123")
   //confirm password
   await page.locator('input[type="password"]').nth(1).fill("testmare123")
   //save employee
   await page.getByRole('button', {name: " Save "}).click()
   const successSaved = page.getByText("Successfully Saved")
   await expect(successSaved).toHaveText("Successfully Saved")

})

test('add personal details', async ({page}) => {
   await page.getByText('PIM').click()
   //employe name
   const firstInput = page.getByRole('textbox', { name: 'Type for hints...' }).first()
   await firstInput.fill('Zoran');
   await page.keyboard.press('Backspace')
   await page.waitForSelector('[role="option"]')
   await page.getByText('Zoran1 ga Jovanov').click()
   await page.getByRole('button', { name: 'Search' }).click()
   //click on the profile name
   await page.getByText('Zoran1 ga').click()
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
   await page.waitForTimeout(4000)
   await page.locator('form').filter({ hasText: 'Blood TypeA-' }).getByRole('button').click()
   const successSaved1 = page.getByText("Successfully Saved")
   await expect(successSaved1).toHaveText("Successfully Saved")
})

test('edit a driving licen and mationality status', async ({page}) => {
   //click on pim
   await page.getByRole('link', { name: 'PIM' }).click()
   await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill("Zoran1 ga Jovanov")
   await page.getByText('Zoran1 ga Jovanov').first().click()
   await page.getByRole('button', { name: 'Search' }).click()
   //click on the profile name
   await page.getByText('Zoran1 ga').click()
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
})

test('edit contact details', async ({page}) => {
   await page.getByText('PIM').click()
   //employe name
   const firstInput = page.getByRole('textbox', { name: 'Type for hints...' }).first()
   await firstInput.fill('Zoran');
   await page.keyboard.press('Backspace')
   await page.waitForSelector('[role="option"]')
   await page.getByText('Zoran1 ga Jovanov').click()
   await page.getByRole('button', { name: 'Search' }).click()
   await page.getByText('Zoran1 ga').click()
   //contact details click
   await page.getByText('Contact Details').click()
   //street 1 2
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

test('delete a PIM user', async ({page}) => {
   //click on the PIM
   await page.getByRole('link', { name: 'PIM' }).click()
   await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill("Zoran1 ga Jovanov")
   await page.getByText('Zoran1 ga Jovanov').first().click()
   await page.getByRole('button', { name: 'Search' }).click()
   //click on checkbout to mark teh PIM user
   await page.getByRole('cell', { name: '' }).locator('i').click()
   //click edit button
   //click delete trash button
   await page.getByRole('button', { name: ' Delete Selected' })
   await page.getByText(" Delete Selected ").click()
   await page.getByText(" Yes, Delete ").click()
   //check is it delete successfully
   const successSaved1 = page.getByText("Successfully Deleted")
   await expect(successSaved1).toHaveText("Successfully Deleted")
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
