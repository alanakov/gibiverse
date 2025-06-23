import { expect, test } from '@playwright/test';
import { generateRandomString, generateValidCPF } from './helpers/test-data.helper';

const BASE_URL_SIGNUP = 'https://gibiverse.local/signup';

test.describe('Signup Page', () => {
    const uniqueId = generateRandomString(5);
    const baseUrl = 'https://gibiverse.local';

    test('successful register redirects to login', async ({ page }) => {
        await page.goto(BASE_URL_SIGNUP);

        const userEmail = `testuser_${uniqueId}@email.com`;
        const userCpf = generateValidCPF();

        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', userEmail);
        await page.fill('input[name="cpf"]', userCpf);
        await page.fill('input[name="password"]', 'Password123@');
        await page.fill('input[name="confirmPassword"]', 'Password123@');

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('https://gibiverse.local/login');
    })

    test('failed register', async ({ page }) => {
        await page.goto(BASE_URL_SIGNUP);

        const userEmail = `testuser_${uniqueId}@email.com`;

        const userCpf = generateValidCPF();

        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', userEmail);
        await page.fill('input[name="cpf"]', userCpf);
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password123');

        await page.click('button[type="submit"]');

        await expect(page.getByText('Senha muito fraca')).toBeVisible();
    })
})


