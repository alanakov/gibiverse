import { expect, test } from '@playwright/test';
import { login } from './helpers/auth.helper';
import { generateRandomString } from './helpers/test-data.helper';

test.describe('Genres Page', () => {
    const baseUrl = 'http://localhost:5173';
    const baseUrlGenres = baseUrl + '/genres';
    const uniqueName = generateRandomString(10);

    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('list genre', async ({ page }) => {
        await page.goto(baseUrlGenres);

        await expect(page.getByRole('heading', { name: 'Gêneros' })).toBeVisible();
        await expect(
            page.locator('button[type="button"]:has-text("Criar Gênero")')
        ).toBeVisible();

        await expect(page.getByRole('cell', { name: 'Nome' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Ações' })).toBeVisible();
    });

    test('create genre', async ({ page }) => {
        await page.goto(baseUrlGenres);
        const genreUniqueName = `Gênero de Teste : Criação ${uniqueName}`;

        await page.locator('button[type="button"]:has-text("Criar Gênero")').click();

        await page.locator('input[name="name"]').fill(genreUniqueName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(genreUniqueName)).toBeVisible();
    });

    test('edit genre', async ({ page }) => {
        await page.goto(baseUrlGenres);
        const genreUniqueName = `Gênero de Teste : Edição ${uniqueName}`;

        await page.locator('button[type="button"]:has-text("Criar Gênero")').click();

        await page.locator('input[name="name"]').fill(genreUniqueName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(genreUniqueName)).toBeVisible();

        await page.locator('tr', { hasText: genreUniqueName }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Editar').click();
        await page.locator('input[name="name"]').fill(`${genreUniqueName} - Editado`);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(`${genreUniqueName} - Editado`)).toBeVisible();
    });

    test('delete genre', async ({ page }) => {
        await page.goto(baseUrlGenres);
        const genreUniqueName = `Gênero de Teste : Exclusão ${uniqueName}`;

        await page.locator('button[type="button"]:has-text("Criar Gênero")').click();

        await page.locator('input[name="name"]').fill(genreUniqueName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(genreUniqueName)).toBeVisible();

        await page.locator('tr', { hasText: genreUniqueName }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Excluir').click();
        await page.locator('button[type="button"]:has-text("Excluir")').click();

        await page.reload();

        await expect(page.getByText(genreUniqueName)).not.toBeVisible();
    });

    test('should not create genre with empty name', async ({ page }) => {
        await page.goto(baseUrlGenres);
        const genreUniqueName = `Gênero de Teste : Falha Criação ${uniqueName}`;

        await page.locator('button[type="button"]:has-text("Criar Gênero")').click();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome deve ter pelo menos 3 caracteres')).toBeVisible();
    });

    test('should not edit genre with empty name', async ({ page }) => {
        await page.goto(baseUrlGenres);
        const genreUniqueName = `Gênero de Teste : Falha Edição ${uniqueName}`;

        await page.locator('button[type="button"]:has-text("Criar Gênero")').click();

        await page.locator('input[name="name"]').fill(genreUniqueName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(genreUniqueName)).toBeVisible();

        await page.locator('tr', { hasText: genreUniqueName }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Editar').click();
        await page.locator('input[name="name"]').fill('');
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome deve ter pelo menos 3 caracteres')).toBeVisible();
    });

    test('should not delete genre when canceling confirmation', async ({ page }) => {
        await page.goto(baseUrlGenres);
        const genreUniqueName = `Gênero de Teste : Falha exclusão ${uniqueName}`;

        await page.locator('button[type="button"]:has-text("Criar Gênero")').click();

        await page.locator('input[name="name"]').fill(genreUniqueName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await page.reload();

        await expect(page.getByText(genreUniqueName)).toBeVisible();

        await page.locator('tr', { hasText: genreUniqueName }).locator('button[aria-haspopup="menu"]').click();
        await page.getByText('Excluir').click();
        await page.locator('button[type="button"]:has-text("Cancelar")').click();

        await page.reload();

        await expect(page.getByText(genreUniqueName)).toBeVisible();
    });
});