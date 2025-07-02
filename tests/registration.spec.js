import {expect, test} from '@playwright/test'
import { createUser } from '../helpers/createUser'

test.beforeEach(async({page}) => {
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
   await page.fill('[name="username"]', 'Admin');
   await page.fill('[name="password"]', 'admin123');
   await page.locator('[type="submit"]').click()
   const header = await page.locator('h6')
   await expect(header).toHaveText('Dashboard')
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
