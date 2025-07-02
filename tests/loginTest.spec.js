import {expect, test} from '@playwright/test'

test('the login to OrangeHRM', async ({page}) => {
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
   await page.fill('[name="username"]', 'Admin');
   await page.fill('[name="password"]', 'admin123');
   await page.locator('[type="submit"]').click()
   const header = await page.locator('h6')
   await expect(header).toHaveText('Dashboard')
})
