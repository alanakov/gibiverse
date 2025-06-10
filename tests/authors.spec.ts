import { expect, test, Page } from '@playwright/test';
import { login } from './helpers/auth.helper';
import { generateRandomString } from './helpers/test-data.helper';

const BASE_URL_AUTHORS = 'http://localhost:5173/authors';
const BIO = 'Este é um exemplo para teste.';
const COVER_URL = 'https://i.pinimg.com/736x/34/5d/bd/345dbd1cfdb190df9940a53c5fe36049.jpg';

async function createAuthor(page: Page, authorName: string) {
    await page.goto(BASE_URL_AUTHORS);
    await page.locator('button[type="button"]:has-text("Criar Autor")').click();

    await page.getByRole('textbox', { name: 'Nome do Autor' }).fill(authorName);
    await page.getByRole('textbox', { name: 'Biografia' }).fill(BIO);
    await page.getByRole('textbox', { name: 'URL da Imagem do Autor' }).fill(COVER_URL);

    await page.getByRole('button', { name: 'Salvar' }).click();

    await page.reload();

    await expect(page.getByText(authorName)).toBeVisible();
}

test.describe('Authors Page', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('list author', async ({ page }) => {
        await page.goto(BASE_URL_AUTHORS);
        await expect(page.getByRole('heading', { name: 'Autores' })).toBeVisible();
        await expect(page.locator('button[type="button"]:has-text("Criar Autor")')).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Nome' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Biografia' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Ações' })).toBeVisible();
    });

    test('create author', async ({ page }) => {
        const authorUniqueName = `Autor para Criação ${generateRandomString(10)}`;
        await createAuthor(page, authorUniqueName);
    });

    test('edit author', async ({ page }) => {
        const authorToEdit = `Autor para Edição ${generateRandomString(6)}`;
        await createAuthor(page, authorToEdit);

        const editedAuthorName = `${authorToEdit} - Editado`;

        await page.locator('tr', { hasText: authorToEdit }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Editar').click();
        await page.getByRole('textbox', { name: 'Nome do Autor' }).fill(editedAuthorName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(editedAuthorName)).toBeVisible();
    });

    test('delete author', async ({ page }) => {
        const authorToDelete = `Autor para Exclusão ${generateRandomString(10)}`;
        await createAuthor(page, authorToDelete);

        await page.locator('tr', { hasText: authorToDelete }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Excluir').click();
        await page.locator('button[type="button"]:has-text("Excluir")').click();

        await page.reload();

        await expect(page.getByText(authorToDelete)).not.toBeVisible();
    });

    test('should not create author with empty name', async ({ page }) => {
        await page.goto(BASE_URL_AUTHORS);
        await page.locator('button[type="button"]:has-text("Criar Autor")').click();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome deve ter pelo menos 3 caracteres')).toBeVisible();
    });

    test('should not edit author with empty name', async ({ page }) => {
        const authorToEdit = `Autor para Edição Falha ${generateRandomString(6)}`;
        await createAuthor(page, authorToEdit);

        await page.locator('tr', { hasText: authorToEdit }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Editar').click();
        await page.getByRole('textbox', { name: 'Nome do Autor' }).fill('');
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome deve ter pelo menos 3 caracteres')).toBeVisible();
    });

    test('should not delete author when canceling confirmation', async ({ page }) => {
        const authorToKeep = `Autor para Cancelar Exclusão ${generateRandomString(10)}`;
        await createAuthor(page, authorToKeep);

        await page.locator('tr', { hasText: authorToKeep }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Excluir').click();
        await page.locator('button[type="button"]:has-text("Cancelar")').click();

        await page.reload();

        await expect(page.getByText(authorToKeep)).toBeVisible();
    });
});