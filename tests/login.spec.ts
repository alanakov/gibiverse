import { expect, test } from '@playwright/test';

const BASE_URL_LOGIN = 'http://localhost:5173/login';

test.describe('Login Page', () => {
    test('successful login redirects to dashboard', async ({ page }) => {
        await page.goto(BASE_URL_LOGIN);

        await page.fill('input[name="email"]', 'testuser@email.com');
        await page.fill('input[name="password"]', 'Password123@');

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('http://localhost:5173/home');
    })

    test('failed login', async ({ page }) => {
        await page.goto(BASE_URL_LOGIN);

        await page.click('button[type="submit"]');

        await expect(page.getByText('E-mail inválido')).toBeVisible();
        await expect(page.getByText('A senha deve ter no mínimo 6 caracteres')).toBeVisible();
    })
})