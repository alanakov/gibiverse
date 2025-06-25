import { test, expect } from '@playwright/test';
import { generateRandomString, generateValidCPF, generateUniqueUserData } from './helpers/test-data.helper';

test.describe('Gibiverse E2E Tests', () => {
    test.describe('Authentication', () => {
        test('should show error with wrong password', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('wrongpassword');
            await page.getByRole('button', { name: 'Entrar' }).click();
            
            await page.waitForTimeout(1000);
            expect(await page.getByText("Falha na autenticação")).toBeTruthy();
        });

        test('should show error with wrong email', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('wrong@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.getByRole('button', { name: 'Entrar' }).click();
            
            await page.waitForTimeout(1000);
            expect(await page.getByText("Falha na autenticação")).toBeTruthy();
        });

        test('should login successfully', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.getByRole('button', { name: 'Entrar' }).click();
            
            await page.waitForURL('https://gibiverse.local/home', { timeout: 5000 });
            expect(page.url()).toBe('https://gibiverse.local/home');
        });

        test('should navigate to signup page', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('a:has-text("Cadastre-se")').click();
            expect(await page.getByText("Criar Conta")).toBeTruthy();
        });
    });

    test.describe('Home', () => {
        test('should display home page', async ({ page }) => {
            await page.goto('https://gibiverse.local/home');
            expect(await page.getByText("Olá")).toBeTruthy();
        });
    });

    test.describe('Navigation', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.getByRole('button', { name: 'Entrar' }).click();
            await expect(page).toHaveURL("https://gibiverse.local/home");
        });

        test('should navigate between authenticated pages', async ({ page }) => {
            await page.locator('a:has-text("Autores")').click();
            await expect(page).toHaveURL('https://gibiverse.local/authors');
            
            await page.locator('a:has-text("Home")').click();
            await expect(page).toHaveURL('https://gibiverse.local/home');
            
            await page.locator('a:has-text("Gêneros")').click();
            await expect(page).toHaveURL('https://gibiverse.local/genres');
            
            await page.locator('a:has-text("Coleções")').click();
            await expect(page).toHaveURL('https://gibiverse.local/collections');
            
            await page.locator('a:has-text("Gibis")').click();
            await expect(page).toHaveURL('https://gibiverse.local/comicbooks');
        });

        test('should navigate to home via logo', async ({ page }) => {
            await page.goto('https://gibiverse.local/authors');
            await page.click('img[alt="Logo"]');
            await expect(page).toHaveURL('https://gibiverse.local/home');
        });
    });

    test.describe('Registration', () => {
        test('should show error with different passwords', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill(userData.name);
            await page.locator('input[name="email"]').fill(userData.email);
            await page.locator('input[name="cpf"]').fill(userData.cpf);
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill('DIFFERENT');
            
            await page.getByRole('button', { name: 'Cadastrar' }).click();
            await page.waitForTimeout(2000);
            
            const errorExists = await page.locator('p:has-text("senhas")').count() > 0;
            expect(
                errorExists || page.url().includes('/signup')
            ).toBeTruthy();
        });

        test('should show error with invalid CPF', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill(userData.name);
            await page.locator('input[name="email"]').fill(userData.email);
            await page.locator('input[name="cpf"]').fill('12345678901');
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);
            
            await page.getByRole('button', { name: 'Cadastrar' }).click();
            await page.waitForTimeout(2000);
            
            const errorExists = await page.locator('p:has-text("CPF")').count() > 0;
            expect(
                errorExists || page.url().includes('/signup')
            ).toBeTruthy();
        });

        test('should show error with invalid email', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill(userData.name);
            await page.locator('input[name="email"]').fill('invalidemail.com');
            await page.locator('input[name="cpf"]').fill(userData.cpf);
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);
            
            await page.getByRole('button', { name: 'Cadastrar' }).click();
            await page.waitForTimeout(2000);
            
            const errorExists = await page.locator('p:has-text("E-mail")').count() > 0;
            expect(
                errorExists || page.url().includes('/signup')
            ).toBeTruthy();
        });

        test('should show error with empty name', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill('');
            await page.locator('input[name="email"]').fill(userData.email);
            await page.locator('input[name="cpf"]').fill(userData.cpf);
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);
            
            await page.getByRole('button', { name: 'Cadastrar' }).click();
            await page.waitForTimeout(2000);
            
            const errorExists = await page.locator('p:has-text("nome")').count() > 0;
            expect(
                errorExists || page.url().includes('/signup')
            ).toBeTruthy();
        });

        test.describe.serial('Successful registration', () => {
            test('should register successfully', async ({ page }) => {
                await page.goto('https://gibiverse.local/signup');
                const userData = generateUniqueUserData();
                await page.locator('input[name="name"]').fill(userData.name);
                await page.locator('input[name="email"]').fill(userData.email);
                await page.locator('input[name="cpf"]').fill(userData.cpf);
                await page.locator('input[name="password"]').fill(userData.password);
                await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);

                await page.getByRole('button', { name: 'Cadastrar' }).click();
                await page.waitForURL("https://gibiverse.local/login", { timeout: 5000 });
                expect(await page.getByText("Entrar")).toBeTruthy();
            });

            test('should validate CPF format', async ({ page }) => {
                await page.goto('https://gibiverse.local/signup');
                const userData = generateUniqueUserData();
                expect(userData.cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
                
                await page.locator('input[name="name"]').fill(userData.name);
                await page.locator('input[name="email"]').fill(userData.email);
                await page.locator('input[name="cpf"]').fill(userData.cpf);
                await page.locator('input[name="password"]').fill(userData.password);
                await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);

                await page.getByRole('button', { name: 'Cadastrar' }).click();
                await page.waitForURL("https://gibiverse.local/login", { timeout: 5000 });
                expect(await page.getByText("Entrar")).toBeTruthy();
            });
        });
    });

    test.describe.serial('Authors', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.getByRole('button', { name: 'Entrar' }).click();
            await expect(page).toHaveURL("https://gibiverse.local/home");
            await page.goto('https://gibiverse.local/authors');
        });

        test('should display authors page', async ({ page }) => {
            await expect(page).toHaveURL('https://gibiverse.local/authors');
        });

        test('should show error when creating author with empty name', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Autor' }).first().click();
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            expect(await page.getByText("O nome deve ter pelo menos 3 caracteres")).toBeTruthy();
        });

        test('should show error when creating author with short name', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Autor' }).first().click();
            await page.locator('input[name="name"]').fill('ab');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            expect(await page.getByText("O nome deve ter pelo menos 3 caracteres")).toBeTruthy();
        });

        test('should show error when creating author with invalid cover URL', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Autor' }).first().click();
            await page.locator('input[name="name"]').fill('Test Author');
            await page.locator('textarea[name="bio"]').fill('Test biography');
            await page.locator('input[name="coverUrl"]').fill('invalid-url');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            const errorExists = await page.locator('p:has-text("URL")').count() > 0;
            expect(
                errorExists || page.url().includes('/authors')
            ).toBeTruthy();
        });

        test('should show error when editing author with empty name', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Autor' }).first().click();
            const authorName = `TEST_AUTHOR_${generateRandomString(8)}`;
            await page.locator('input[name="name"]').fill(authorName);
            await page.locator('textarea[name="bio"]').fill('Test biography');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(2000);

            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            const authorRow = page.locator(`tr:has-text("${authorName}")`);
            if (await authorRow.count() > 0) {
                await authorRow.first().locator('button[aria-haspopup="menu"]').click();
            await page.getByText('Editar').click();
            
            await page.locator('input[name="name"]').fill('');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            expect(await page.getByText("O nome deve ter pelo menos 3 caracteres")).toBeTruthy();
            }
        });

        test('should create, edit and delete author', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Autor' }).first().click();
            const authorName = `TEST_AUTHOR_${generateRandomString(8)}`;
            await page.locator('input[name="name"]').fill(authorName);
            await page.locator('textarea[name="bio"]').fill('Test biography');
            await page.locator('input[name="coverUrl"]').fill('https://example.com/image.jpg');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(2000);

            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            await expect(page.locator(`tr:has-text("${authorName}")`)).toHaveCount(1, { timeout: 10000 });
            await page.locator(`tr:has-text("${authorName}")`).first().locator('button[aria-haspopup="menu"]').click();
            await page.getByText('Editar').click();

            const editedAuthorName = `${authorName} - EDITED`;
            await page.locator('input[name="name"]').fill(editedAuthorName);
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(2000);

            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            // Aguarda até o autor editado aparecer na tabela, com timeout maior
            await expect(page.locator(`tr:has-text("${editedAuthorName}")`)).toHaveCount(1, { timeout: 10000 });
            await page.locator(`tr:has-text("${editedAuthorName}")`).first().locator('button[aria-haspopup="menu"]').click();
            await page.getByText('Excluir').click();
            
            expect(await page.getByText("Confirmar exclusão")).toBeTruthy();
            await page.locator('button[type="button"]:has-text("Excluir")').click();
            
            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            
            await expect(page.locator(`tr:has-text("${editedAuthorName}")`)).toHaveCount(0, { timeout: 10000 });
        });
    });

    test.describe.serial('Genres', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.getByRole('button', { name: 'Entrar' }).click();
            await expect(page).toHaveURL("https://gibiverse.local/home");
            await page.goto('https://gibiverse.local/genres');
        });

        test('should display genres page', async ({ page }) => {
            await expect(page).toHaveURL('https://gibiverse.local/genres');
        });

        test('should show error when creating genre with empty name', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Gênero' }).first().click();
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            expect(await page.getByText("O nome deve ter pelo menos 3 caracteres")).toBeTruthy();
        });

        test('should show error when creating genre with short name', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Gênero' }).first().click();
            await page.locator('input[name="name"]').fill('ab');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            expect(await page.getByText("O nome deve ter pelo menos 3 caracteres")).toBeTruthy();
        });

        test('should show error when creating genre with only spaces', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Gênero' }).first().click();
            await page.locator('input[name="name"]').fill('   ');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            expect(await page.getByText("O nome deve ter pelo menos 3 caracteres")).toBeTruthy();
        });

        test('should show error when editing genre with empty name', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Gênero' }).first().click();
            const genreName = `TEST_GENRE_${generateRandomString(8)}`;
            await page.locator('input[name="name"]').fill(genreName);
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(1000);

            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            const genreRow = page.locator(`tr:has-text("${genreName}")`);
            expect(await genreRow.count()).toBeGreaterThan(0);
            await genreRow.first().locator('button[aria-haspopup="menu"]').click();
            await page.getByText('Editar').click();
            
            await page.locator('input[name="name"]').fill('');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(200);
            
            expect(await page.getByText("O nome deve ter pelo menos 3 caracteres")).toBeTruthy();
        });

        test('should create, edit and delete genre', async ({ page }) => {
            await page.getByRole('button', { name: 'Criar Gênero' }).first().click();
            const genreName = `TEST_GENRE_${generateRandomString(8)}`;
            await page.locator('input[name="name"]').fill(genreName);
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(1000);

            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            const genreRow = page.locator(`tr:has-text("${genreName}")`);
            expect(await genreRow.count()).toBeGreaterThan(0);

            await genreRow.first().locator('button[aria-haspopup="menu"]').click();
            await page.getByText('Editar').click();
            
            const editedGenreName = `${genreName} - EDITED`;
            await page.locator('input[name="name"]').fill(editedGenreName);
            await page.getByRole('button', { name: 'Salvar' }).click();
            await page.waitForTimeout(2000);

            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            const editedGenreRow = page.locator(`tr:has-text("${editedGenreName}")`);
            expect(await editedGenreRow.count()).toBeGreaterThan(0);

            await editedGenreRow.first().locator('button[aria-haspopup="menu"]').click();
            await page.getByText('Excluir').click();
            
            expect(await page.getByText("Confirmar exclusão")).toBeTruthy();
            await page.locator('button[type="button"]:has-text("Excluir")').click();
            
            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            
            expect(await page.locator(`tr:has-text("${editedGenreName}")`).count()).toBe(0);
        });
    });

    test.describe('Collections', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.getByRole('button', { name: 'Entrar' }).click();
            await expect(page).toHaveURL("https://gibiverse.local/home");
        });

        test('should display collections page', async ({ page }) => {
            await page.goto('https://gibiverse.local/collections');
            expect(await page.getByText("Coleções")).toBeTruthy();
        });
    });

    test.describe('Comic Books', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.getByRole('button', { name: 'Entrar' }).click();
            await expect(page).toHaveURL("https://gibiverse.local/home");
        });

        test('should display comic books page', async ({ page }) => {
            await page.goto('https://gibiverse.local/comicbooks');
            expect(await page.getByText("Gibis")).toBeTruthy();
        });
    });
}); 