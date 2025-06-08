import { expect, test } from '@playwright/test';
import { login } from './helpers/auth.helper';

test.describe('Genres Page', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('list genre', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');

        await expect(page.getByRole('heading', { name: 'Gêneros' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Criar gênero' })).toBeVisible();

        await expect(page.getByRole('columnheader', { name: 'Nome' })).toBeVisible();
        await expect(page.getByRole('columnheader', { name: 'Ações' })).toBeVisible();
    });

    test('create genre', async ({ page }) => {
    await page.goto('http://localhost:5173/genres');

    const genreNameToCreate = 'Gênero de Teste';

    await page.getByRole('button', { name: 'Criar gênero' }).click();

    await page.locator('input[name="name"]').fill(genreNameToCreate);
    await page.getByRole('button', { name: 'Salvar' }).click();
    
    await expect(page.getByText(genreNameToCreate)).toBeVisible();
    });

    test('edit genre', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');

        const genreNameToCreate = 'Gênero Para Editar';
        const genreNameEdited = 'Gênero Editado';

        await page.getByRole('button', { name: 'Criar gênero' }).click();
        await page.locator('input[name="name"]').fill(genreNameToCreate);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText(genreNameToCreate)).toBeVisible();

        const genreRow = page.locator('tr', { hasText: genreNameToCreate });

        await genreRow.getByRole('button').click(); 

        await page.getByText('Editar').click();

        await page.locator('input[name="name"]').fill(genreNameEdited);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText(genreNameEdited)).toBeVisible();
        await expect(page.getByText(genreNameToCreate)).not.toBeVisible();
    });

    test('delete genre', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');

        const genreNameToDelete = 'Gênero Para Excluir';

        await page.getByRole('button', { name: 'Criar gênero' }).click();
        await page.locator('input[name="name"]').fill(genreNameToDelete);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText(genreNameToDelete)).toBeVisible();

        const genreRow = page.locator('tr', { hasText: genreNameToDelete });

        await genreRow.getByRole('button').click();

        await page.getByText('Excluir').click();

        await page.getByRole('dialog').getByRole('button', { name: 'Excluir' }).click();

        await expect(page.getByText(genreNameToDelete)).not.toBeVisible();
    });
    
    test('should not create genre with empty name', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');
        
        await page.getByRole('button', { name: 'Criar gênero' }).click();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome é obrigatório')).toBeVisible();
    });

    test('should not edit genre with empty name', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');
        const initialName = 'Gênero para Teste de Falha';

        await page.getByRole('button', { name: 'Criar gênero' }).click();
        await page.locator('input[name="name"]').fill(initialName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        const genreRow = page.locator('tr', { hasText: initialName });
        await genreRow.getByRole('button').click();
        await page.getByText('Editar').click();
        await page.locator('input[name="name"]').fill('');
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('O nome é obrigatório')).toBeVisible();
    });

    test('should not delete genre when canceling confirmation', async ({ page }) => {
        await page.goto('http://localhost:5173/genres');
        const genreName = 'Gênero para Cancelar Exclusão';

        await page.getByRole('button', { name: 'Criar gênero' }).click();
        await page.locator('input[name="name"]').fill(genreName);
        await page.getByRole('button', { name: 'Salvar' }).click();

        const genreRow = page.locator('tr', { hasText: genreName });
        await genreRow.getByRole('button').click();
        await page.getByText('Excluir').click();
        
        await page.getByRole('dialog').getByRole('button', { name: 'Cancelar' }).click();

        await expect(page.getByText(genreName)).toBeVisible();
    });
});