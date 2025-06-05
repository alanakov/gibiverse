import { expect, test } from '@playwright/test';
import { generate } from 'gerador-validador-cpf';

test.describe('Signup Page', () => {
    test('successful register redirects to login', async ({ page }) => {
        await page.goto('http://localhost:5173/signup');

        const uniqueId = Date.now();
        const userEmail = `testuser_${uniqueId}@email.com`;

        const userCpf = generate({ format: true });

        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', userEmail);
        await page.fill('input[name="cpf"]', userCpf);
        await page.fill('input[name="password"]', 'Password123@');
        await page.fill('input[name="confirmPassword"]', 'Password123@');

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('http://localhost:5173/login');
    })

    test('failed register', async ({ page }) => {
        await page.goto('http://localhost:5173/signup');

        const uniqueId = Date.now();
        const userEmail = `testuser_${uniqueId}@email.com`;

        const userCpf = generate({ format: true });

        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', userEmail);
        await page.fill('input[name="cpf"]', userCpf);
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password123');

        await page.click('button[type="submit"]');

        await expect(page.getByText('Senha muito fraca')).toBeVisible();
    })
})


