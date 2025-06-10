import { Page } from '@playwright/test';

export async function login(page: Page) {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'testuser@email.com');
    await page.fill('input[name="password"]', 'Password123@');

    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:5173/home');
}