import { expect, test, Page } from '@playwright/test';
import { login } from './helpers/auth.helper';
import { generateRandomString } from './helpers/test-data.helper';

const BASE_URL_GENRES = 'https://gibiverse.local/genres';

async function createGenre(page: Page, genreName: string) {
    await page.goto(BASE_URL_GENRES);
    await page.locator('button[type="button"]:has-text("Criar Gênero")').click();

    await page.getByRole('textbox', { name: 'Nome' }).fill(genreName);
    await page.getByRole('button', { name: 'Salvar' }).click();

    await page.reload();

    await expect(page.getByText(genreName)).toBeVisible({ timeout: 10000 });
}

test.describe('Genres Page', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('list genre', async ({ page }) => {
        await page.goto(BASE_URL_GENRES);
        await expect(page.getByRole('heading', { name: 'Gêneros' })).toBeVisible();
        await expect(page.locator('button[type="button"]:has-text("Criar Gênero")')).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Nome' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Ações' })).toBeVisible();
    });

    test('create genre', async ({ page }) => {
        const genreUniqueName = `Gênero para Criação ${generateRandomString(6)}`;
        await createGenre(page, genreUniqueName);
    });

    test('edit genre', async ({ page }) => {
        const genreToEdit = `Gênero para Edição ${generateRandomString(6)}`;
        await createGenre(page, genreToEdit);

        const editedGenreName = `${genreToEdit} - Editado`;

        await page.locator('tr', { hasText: genreToEdit }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Editar').click();
        await page.getByRole('textbox', { name: 'Nome' }).fill(editedGenreName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(editedGenreName)).toBeVisible();
    });

    test('delete genre', async ({ page }) => {
        const genreToDelete = `Gênero para Exclusão ${generateRandomString(6)}`;
        await createGenre(page, genreToDelete);

        await page.locator('tr', { hasText: genreToDelete }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Excluir').click();
        await page.locator('button[type="button"]:has-text("Excluir")').click();

        await page.reload();

        await expect(page.getByText(genreToDelete)).not.toBeVisible();
    });

    test('should not create genre with empty name', async ({ page }) => {
        await page.goto(BASE_URL_GENRES);
        await page.locator('button[type="button"]:has-text("Criar Gênero")').click();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome deve ter pelo menos 3 caracteres')).toBeVisible();
    });

    test('should not edit genre with empty name', async ({ page }) => {
        const genreToEdit = `Gênero para Edição Falha ${generateRandomString(6)}`;
        await createGenre(page, genreToEdit);

        await page.locator('tr', { hasText: genreToEdit }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Editar').click();
        await page.getByRole('textbox', { name: 'Nome' }).fill('');
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome deve ter pelo menos 3 caracteres')).toBeVisible();
    });

    test('should not delete genre when canceling confirmation', async ({ page }) => {
        const genreToKeep = `Gênero para Cancelar Exclusão ${generateRandomString(6)}`;
        await createGenre(page, genreToKeep);

        await page.locator('tr', { hasText: genreToKeep }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Excluir').click();
        await page.locator('button[type="button"]:has-text("Cancelar")').click();

        await page.reload();

        await expect(page.getByText(genreToKeep)).toBeVisible();
    });
});