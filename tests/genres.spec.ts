import { expect, test } from '@playwright/test';
import { login } from './helpers/auth.helper';

test.describe('Genres Page', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('list genre', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');

        await expect(page.getByRole('heading', { name: 'Gêneros' })).toBeVisible();


    });

    test('create genre', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');

        const nameGenre = 'Gênero de Teste';

        await page.click('button:has-text("Criar gênero")');

        await page.fill('input[name="name"]', nameGenre);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.getByText('Close').click();


        expect(page.getByText(nameGenre)).toBeVisible();
    });
});