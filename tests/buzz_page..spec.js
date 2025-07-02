import {expect, test} from '@playwright/test'
import { createUser } from '../helpers/createUser'



test.beforeEach(async({page}) => {
    //login to pim user
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
   await page.fill('[name="username"]', 'marey');
   await page.fill('[name="password"]', 'testmare123');
   await page.locator('[type="submit"]').click()
})

test('add a buzz post with a PIM user', async ({page}) => {
   //click on buzz menu item
   await page.getByRole('link', { name: 'Buzz' }).click()
   //fill "what's on your mind" post
   await page.getByRole('textbox', { name: 'What\'s on your mind?' }).fill("Jon has been wokring in Filipins for ten years")
   await page.getByRole('button', { name: 'Post', exact: true }).click()
   const postBuzz = await page.getByText('Jon has been wokring in').first()
   await expect(postBuzz).toHaveText('Jon has been wokring in Filipins for ten years')

})