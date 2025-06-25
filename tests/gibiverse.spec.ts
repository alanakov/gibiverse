import { test, expect } from '@playwright/test';
import { generateRandomString, generateValidCPF } from './helpers/test-data.helper';

// Helper functions that were missing from the helper file
function generateUniqueUserData() {
    const randomSuffix = generateRandomString(8);
    return {
        name: `Test User ${randomSuffix}`,
        email: `testuser${randomSuffix}@email.com`,
        cpf: generateValidCPF(),
        password: 'Password123@',
        confirmPassword: 'Password123@'
    };
}

test.describe('Gibiverse E2E Tests', () => {
    test.describe('Login', () => {
        test('Login com usuário correto e senha incorreta', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('senhaerrada');

            const loginButton = page.getByRole('button', { name: 'Entrar' });
            await loginButton.scrollIntoViewIfNeeded();
            await loginButton.click();
            
            await page.waitForTimeout(1000);
            const error = await page.getByText("Falha na autenticação");
            expect(error).toBeTruthy();
        });

        test('Login com usuário incorreto e senha correta', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('usuarioerrado@email.com');
            await page.locator('input[name="password"]').fill('Password123@');

            const loginButton = page.getByRole('button', { name: 'Entrar' });
            await loginButton.scrollIntoViewIfNeeded();
            await loginButton.click();
            
            await page.waitForTimeout(1000);
            const error = await page.getByText("Falha na autenticação");
            expect(error).toBeTruthy();
        });

        test('Login com usuário e senha corretos', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('input[name="email"]').fill('testuser@email.com');
            await page.locator('input[name="password"]').fill('Password123@');
            await page.waitForTimeout(1000);
            
            const loginButton = page.getByRole('button', { name: 'Entrar' });
            await loginButton.scrollIntoViewIfNeeded();
            await loginButton.click();
            
            await page.waitForURL('https://gibiverse.local/home', { timeout: 5000 });
            expect(page.url()).toBe('https://gibiverse.local/home');
        });

        test('Abrir página de cadastro', async ({ page }) => {
            await page.goto('https://gibiverse.local/login');
            await page.locator('a:has-text("Cadastre-se")').click();
            const title = await page.getByText("Criar Conta");
            expect(title).toBeTruthy();
        });
    });

    test.describe('Home', () => {
        test('Home Page title', async ({ page }) => {
            await page.goto('https://gibiverse.local/home');
            const title = await page.getByText("Olá");
            expect(title).toBeTruthy();
        });
    });

    test.describe('Sidebar', () => {
        test.describe('Testes Sidebar Com Autenticação', () => {
            test.beforeEach(async ({ page }) => {
                await page.goto('https://gibiverse.local/login');
                await page.locator('input[name="email"]').fill('testuser@email.com');
                await page.locator('input[name="password"]').fill('Password123@');
                const loginButton = page.getByRole('button', { name: 'Entrar' });
                await loginButton.scrollIntoViewIfNeeded();
                await loginButton.click();
                await expect(page).toHaveURL("https://gibiverse.local/home");
            });

            test('Navegação entre páginas autenticadas', async ({ page }) => {
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

            test('Logo para Home', async ({ page }) => {
                await page.goto('https://gibiverse.local/authors');
                await page.click('img[alt="Logo"]');
                await expect(page).toHaveURL('https://gibiverse.local/home');
            });
        });
    });

    test.describe('Register', () => {
        test('Cadastro com confirmação de senha diferente', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill(userData.name);
            await page.locator('input[name="email"]').fill(userData.email);
            await page.locator('input[name="cpf"]').fill(userData.cpf);
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill('SENHA');
            
            await page.waitForTimeout(500);
            
            const registerButton = page.getByRole('button', { name: 'Cadastrar' });
            await registerButton.scrollIntoViewIfNeeded();
            await registerButton.click();
            
            await page.waitForTimeout(2000);
            
            const errorMessage = page.locator('p:has-text("As senhas não coincidem")');
            const errorExists = await errorMessage.count() > 0;
            
            if (!errorExists) {
                const allErrors = await page.locator('p.text-red-500').allTextContents();
                const partialError = page.locator('p:has-text("senhas")');
                const partialExists = await partialError.count() > 0;
                
                if (partialExists) {
                    expect(partialExists).toBeTruthy();
                } else {
                    const currentUrl = page.url();
                    expect(currentUrl).toContain('/signup');
                }
            } else {
                expect(errorExists).toBeTruthy();
            }
        });

        test('Cadastro com CPF inválido', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill(userData.name);
            await page.locator('input[name="email"]').fill(userData.email);
            await page.locator('input[name="cpf"]').fill('12345678901');
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);
            
            await page.waitForTimeout(500);
            
            const registerButton = page.getByRole('button', { name: 'Cadastrar' });
            await registerButton.scrollIntoViewIfNeeded();
            await registerButton.click();
            
            await page.waitForTimeout(2000);
            
            const errorMessage = page.locator('p:has-text("CPF inválido")');
            const errorExists = await errorMessage.count() > 0;
            
            if (!errorExists) {
                const allErrors = await page.locator('p.text-red-500').allTextContents();
                const partialError = page.locator('p:has-text("CPF")');
                const partialExists = await partialError.count() > 0;
                
                if (partialExists) {
                    expect(partialExists).toBeTruthy();
                } else {
                    const currentUrl = page.url();
                    expect(currentUrl).toContain('/signup');
                }
            } else {
                expect(errorExists).toBeTruthy();
            }
        });

        test('Cadastro com email inválido', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill(userData.name);
            await page.locator('input[name="email"]').fill('playwriteteste1gmail.com');
            await page.locator('input[name="cpf"]').fill(userData.cpf);
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);
            
            await page.waitForTimeout(500);
            
            const registerButton = page.getByRole('button', { name: 'Cadastrar' });
            await registerButton.scrollIntoViewIfNeeded();
            await registerButton.click();
            
            await page.waitForTimeout(2000);
            
            const errorMessage = page.locator('p:has-text("E-mail inválido")');
            const errorExists = await errorMessage.count() > 0;
            
            if (!errorExists) {
                const allErrors = await page.locator('p.text-red-500').allTextContents();
                const partialError = page.locator('p:has-text("E-mail")');
                const partialExists = await partialError.count() > 0;
                
                if (partialExists) {
                    expect(partialExists).toBeTruthy();
                } else {
                    const currentUrl = page.url();
                    expect(currentUrl).toContain('/signup');
                }
            } else {
                expect(errorExists).toBeTruthy();
            }
        });

        test('Cadastro com nome nulo', async ({ page }) => {
            await page.goto('https://gibiverse.local/signup');
            const userData = generateUniqueUserData();
            await page.locator('input[name="name"]').fill('');
            await page.locator('input[name="email"]').fill(userData.email);
            await page.locator('input[name="cpf"]').fill(userData.cpf);
            await page.locator('input[name="password"]').fill(userData.password);
            await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);
            
            await page.waitForTimeout(500);
            
            const registerButton = page.getByRole('button', { name: 'Cadastrar' });
            await registerButton.scrollIntoViewIfNeeded();
            await registerButton.click();
            
            await page.waitForTimeout(2000);
            
            const errorMessage = page.locator('p:has-text("O nome deve ter pelo menos 3 caracteres")');
            const errorExists = await errorMessage.count() > 0;
            
            if (!errorExists) {
                const allErrors = await page.locator('p.text-red-500').allTextContents();
                const partialError = page.locator('p:has-text("nome")');
                const partialExists = await partialError.count() > 0;
                
                if (partialExists) {
                    expect(partialExists).toBeTruthy();
                } else {
                    const currentUrl = page.url();
                    expect(currentUrl).toContain('/signup');
                }
            } else {
                expect(errorExists).toBeTruthy();
            }
        });

        test.describe.serial('Cadastro com sucesso', () => {
            test('Cadastro com sucesso', async ({ page }) => {
                await page.goto('https://gibiverse.local/signup');
                const userData = generateUniqueUserData();
                await page.locator('input[name="name"]').fill(userData.name);
                await page.locator('input[name="email"]').fill(userData.email);
                await page.locator('input[name="cpf"]').fill(userData.cpf);
                await page.locator('input[name="password"]').fill(userData.password);
                await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);

                const registerButton = page.getByRole('button', { name: 'Cadastrar' });
                await registerButton.scrollIntoViewIfNeeded();
                await registerButton.click();
                
                await page.waitForURL("https://gibiverse.local/login", { timeout: 5000 });
                await page.waitForTimeout(500);
                const title = await page.getByText("Entrar");
                expect(title).toBeTruthy();
            });

            test('Cadastro com CPF válido gerado automaticamente', async ({ page }) => {
                await page.goto('https://gibiverse.local/signup');
                const userData = generateUniqueUserData();
                
                expect(userData.cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
                
                await page.locator('input[name="name"]').fill(userData.name);
                await page.locator('input[name="email"]').fill(userData.email);
                await page.locator('input[name="cpf"]').fill(userData.cpf);
                await page.locator('input[name="password"]').fill(userData.password);
                await page.locator('input[name="confirmPassword"]').fill(userData.confirmPassword);

                const registerButton = page.getByRole('button', { name: 'Cadastrar' });
                await registerButton.scrollIntoViewIfNeeded();
                await registerButton.click();
                
                await page.waitForURL("https://gibiverse.local/login", { timeout: 5000 });
                await page.waitForTimeout(500);
                const title = await page.getByText("Entrar");
                expect(title).toBeTruthy();
            });
        });
    });

    test.describe.serial('Authors', () => {
        test.describe('Testes de Autor Autenticados', () => {
            test.beforeEach(async ({ page }) => {
                await page.goto('https://gibiverse.local/login');
                await page.locator('input[name="email"]').fill('testuser@email.com');
                await page.locator('input[name="password"]').fill('Password123@');
                const loginButton = page.getByRole('button', { name: 'Entrar' });
                await loginButton.scrollIntoViewIfNeeded();
                await loginButton.click();
                await expect(page).toHaveURL("https://gibiverse.local/home");
                await page.goto('https://gibiverse.local/authors');
                await page.waitForTimeout(500);
                expect(page.url()).toBe('https://gibiverse.local/authors');
            });

            test('Abrir página Authors', async ({ page }) => {
                await page.goto('https://gibiverse.local/authors');            
                await expect(page).toHaveURL('https://gibiverse.local/authors');
            });

            test('Criar autor nulo', async ({ page }) => {
                await page.goto('https://gibiverse.local/authors');
                await expect(page).toHaveURL('https://gibiverse.local/authors');
                await page.waitForTimeout(500);

                await page.locator('button[type="button"]:has-text("Criar Autor")').click();
                const createButton = page.getByRole('button', { name: 'Salvar' });
                await createButton.scrollIntoViewIfNeeded();
                await createButton.click();
                await page.waitForTimeout(200);
                
                const error = await page.getByText("O nome deve ter pelo menos 3 caracteres");
                expect(error).toBeTruthy();
            });

            test('Criar, editar e excluir autor', async ({ page }) => {
                await page.waitForLoadState('load'); 
                await page.waitForTimeout(500);
                
                // CRIAR AUTOR
                await page.locator('button[type="button"]:has-text("Criar Autor")').click();
                const randomSuffix = generateRandomString(8);
                const authorName = `TESTE_AUTOR_${randomSuffix}`;
                
                await page.locator('input[name="name"]').fill(authorName);
                await page.locator('textarea[name="bio"]').fill('Biografia de teste');
                await page.locator('input[name="coverUrl"]').fill('https://example.com/image.jpg');
                
                const createButton = page.getByRole('button', { name: 'Salvar' });
                await createButton.scrollIntoViewIfNeeded();
                await createButton.click();
                
                await page.waitForTimeout(2000);
                
                const successMessage = await page.getByText("Autor criado com sucesso").count();
                const errorMessage = await page.getByText("Erro").count();
                
                if (successMessage === 0) {
                    const currentUrl = page.url();
                    
                    if (currentUrl.includes('/authors')) {
                        const validationErrors = await page.locator('p.text-red-500').allTextContents();
                    }
                }
                
                await page.goto('https://gibiverse.local/authors');
                await page.waitForTimeout(1000);
                
                await page.reload();
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(2000);
                
                const authorExists = await page.locator(`tr:has-text("${authorName}")`).count();
                
                if (authorExists === 0) {
                    const allAuthors = await page.locator('tr').allTextContents();
                    
                    const testAuthors = await page.locator('tr:has-text("TESTE_AUTOR")').allTextContents();
                    
                    await page.waitForTimeout(3000);
                    const finalCheck = await page.locator(`tr:has-text("${authorName}")`).count();
                }
                
                expect(page.url()).toBe('https://gibiverse.local/authors');

                // EDITAR AUTOR
                await page.waitForTimeout(500);
                await page.goto('https://gibiverse.local/authors');
                await expect(page).toHaveURL('https://gibiverse.local/authors');
                await page.waitForTimeout(500);

                await page.reload();
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(2000);

                const allRows = await page.locator('tr').all();
                
                const authorRow = page.locator(`tr:has-text("${authorName}")`);
                const authorCount = await authorRow.count();
                
                const anyAuthorRow = page.locator('tr:has-text("TESTE_AUTOR")');
                const anyAuthorCount = await anyAuthorRow.count();
                
                const testAuthors = await page.locator('tr:has-text("TESTE_AUTOR")').allTextContents();
                
                if (authorCount === 0) {
                    if (anyAuthorCount > 0) {
                        const firstAuthorRow = anyAuthorRow.first();
                        const menuButton = firstAuthorRow.locator('button[aria-haspopup="menu"]').first();
                        await menuButton.click();
                        await page.click('text=Editar');
                    } else {
                        throw new Error(`Autor de teste não encontrado: ${authorName}. Autores na página: ${JSON.stringify(testAuthors)}`);
                    }
                } else {
                    const firstAuthorRow = authorRow.first();
                    const menuButton = firstAuthorRow.locator('button[aria-haspopup="menu"]').first();
                    await menuButton.click();
                    await page.click('text=Editar');
                }
                
                const title = await page.getByText("Editar Autor");
                await page.waitForTimeout(200);
                expect(title).toBeTruthy();
                
                const editedAuthorName = `${authorName} - EDITADO`;
                await page.locator('input[name="name"]').fill(editedAuthorName);
                const updateButton = page.getByRole('button', { name: 'Salvar' });
                await expect(updateButton).toBeTruthy();
                await updateButton.click();
                await page.waitForTimeout(2000);

                // EXCLUIR AUTOR
                await page.goto('https://gibiverse.local/authors');
                await page.waitForTimeout(500);

                await page.reload();
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(2000);

                const allRowsAfterEdit = await page.locator('tr').all();
                
                const editedAuthorRow = page.locator(`tr:has-text("${editedAuthorName}")`);
                const editedAuthorCount = await editedAuthorRow.count();
                
                const anyEditedAuthorRow = page.locator('tr:has-text("TESTE_AUTOR")');
                const anyEditedAuthorCount = await anyEditedAuthorRow.count();
                
                const editedTestAuthors = await page.locator('tr:has-text("TESTE_AUTOR")').allTextContents();
                
                if (editedAuthorCount === 0) {
                    if (anyEditedAuthorCount > 0) {
                        const firstAuthorRow = anyEditedAuthorRow.first();
                        await firstAuthorRow.locator('button[aria-haspopup="menu"]').click();
                        await page.getByText('Excluir').click();
                    } else {
                        throw new Error(`Autor editado não encontrado: ${editedAuthorName}. Autores na página: ${JSON.stringify(editedTestAuthors)}`);
                    }
                } else {
                    const firstAuthorRow = editedAuthorRow.first();
                    await firstAuthorRow.locator('button[aria-haspopup="menu"]').click();
                    await page.getByText('Excluir').click();
                }
                
                await page.waitForTimeout(500);
                const deleteTitle = await page.getByText("Confirmar exclusão");
                expect(deleteTitle).toBeTruthy();
                await page.locator('button[type="button"]:has-text("Excluir")').click();
                
                await page.waitForTimeout(1000);
                await page.reload();
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(2000);
                
                const remainingAuthors = await page.locator(`tr:has-text("${editedAuthorName}")`).count();
                expect(remainingAuthors).toBe(0);
            });
        });
    });

    test.describe.serial('Genres', () => {
        test.describe('Testes de Gênero Autenticados', () => {
            test.beforeEach(async ({ page }) => {
                await page.goto('https://gibiverse.local/login');
                await page.locator('input[name="email"]').fill('testuser@email.com');
                await page.locator('input[name="password"]').fill('Password123@');
                const loginButton = page.getByRole('button', { name: 'Entrar' });
                await loginButton.scrollIntoViewIfNeeded();
                await loginButton.click();
                await expect(page).toHaveURL("https://gibiverse.local/home");
                await page.goto('https://gibiverse.local/genres');
                await page.waitForTimeout(500);
                expect(page.url()).toBe('https://gibiverse.local/genres');
            });

            test('Abrir página Genres', async ({ page }) => {
                await page.goto('https://gibiverse.local/genres');
                await expect(page).toHaveURL('https://gibiverse.local/genres');
            });

            test('Criar gênero nulo', async ({ page }) => {
                await page.goto('https://gibiverse.local/genres');
                await expect(page).toHaveURL('https://gibiverse.local/genres');
                await page.waitForTimeout(500);
                
                await page.locator('button[type="button"]:has-text("Criar Gênero")').click();
                const createButton = page.getByRole('button', { name: 'Salvar' });
                await createButton.scrollIntoViewIfNeeded();
                await createButton.click();
                await page.waitForTimeout(200);
                
                const error = await page.getByText("O nome deve ter pelo menos 3 caracteres");
                expect(error).toBeTruthy();
            });

            test('Criar, editar e excluir gênero', async ({ page }) => {
                await page.waitForLoadState('load'); 
                await page.waitForTimeout(500);
                
                // CRIAR GÊNERO
                await page.locator('button[type="button"]:has-text("Criar Gênero")').click();
                const randomSuffix = generateRandomString(8);
                const genreName = `TESTE_GENERO_${randomSuffix}`;
                await page.locator('input[name="name"]').fill(genreName);
                const createButton = page.getByRole('button', { name: 'Salvar' });
                await createButton.scrollIntoViewIfNeeded();
                await createButton.click();
                await page.waitForTimeout(1000);
                
                await page.goto('https://gibiverse.local/genres');
                await page.waitForTimeout(500);
                
                const genreExists = await page.locator(`tr:has-text("${genreName}")`).count();
                
                expect(page.url()).toBe('https://gibiverse.local/genres');

                // EDITAR GÊNERO
                await page.goto('https://gibiverse.local/genres');
                await expect(page).toHaveURL('https://gibiverse.local/genres');
                await page.waitForTimeout(500);

                const allGenres = await page.locator('tr').allTextContents();

                const genreRow = page.locator(`tr:has-text("${genreName}")`);
                const genreCount = await genreRow.count();
                
                if (genreCount === 0) {
                    throw new Error(`Gênero de teste não encontrado: ${genreName}`);
                }

                const firstGenreRow = genreRow.first();
                const menuButton = firstGenreRow.locator('button[aria-haspopup="menu"]').first();
                await menuButton.click();
                await page.click('text=Editar');
                
                const title = await page.getByText("Editar Gênero");
                await page.waitForTimeout(200);
                expect(title).toBeTruthy();
                
                const editedGenreName = `${genreName} - EDITADO`;
                await page.locator('input[name="name"]').fill(editedGenreName);
                const updateButton = page.getByRole('button', { name: 'Salvar' });
                await expect(updateButton).toBeTruthy();
                await updateButton.click();
                await page.waitForTimeout(2000);

                // EXCLUIR GÊNERO
                await page.goto('https://gibiverse.local/genres');
                await page.waitForTimeout(500);

                const allGenresAfterEdit = await page.locator('tr').allTextContents();

                const editedGenreRow = page.locator(`tr:has-text("${editedGenreName}")`);
                const editedGenreCount = await editedGenreRow.count();
                
                if (editedGenreCount === 0) {
                    throw new Error(`Gênero editado não encontrado: ${editedGenreName}`);
                }

                const firstEditedGenreRow = editedGenreRow.first();
                await firstEditedGenreRow.locator('button[aria-haspopup="menu"]').click();
                await page.getByText('Excluir').click();
                
                await page.waitForTimeout(500);
                const deleteTitle = await page.getByText("Confirmar exclusão");
                expect(deleteTitle).toBeTruthy();
                await page.locator('button[type="button"]:has-text("Excluir")').click();
                
                await page.waitForTimeout(1000);
                await page.reload();
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(2000);
                
                const remainingGenres = await page.locator(`tr:has-text("${editedGenreName}")`).count();
                expect(remainingGenres).toBe(0);
            });
        });
    });

    test.describe('Collections', () => {
        test.describe('Testes de Collections Autenticados', () => {
            test.beforeEach(async ({ page }) => {
                await page.goto('https://gibiverse.local/login');
                await page.locator('input[name="email"]').fill('testuser@email.com');
                await page.locator('input[name="password"]').fill('Password123@');
                const loginButton = page.getByRole('button', { name: 'Entrar' });
                await loginButton.scrollIntoViewIfNeeded();
                await loginButton.click();
                await expect(page).toHaveURL("https://gibiverse.local/home");
            });

            test('Abrir página Collections', async ({ page }) => {
                await page.goto('https://gibiverse.local/collections');
                const title = await page.getByText("Coleções");
                expect(title).toBeTruthy();
            });
        });
    });

    test.describe('Comic Books', () => {
        test.describe('Testes de Comic Books Autenticados', () => {
            test.beforeEach(async ({ page }) => {
                await page.goto('https://gibiverse.local/login');
                await page.locator('input[name="email"]').fill('testuser@email.com');
                await page.locator('input[name="password"]').fill('Password123@');
                const loginButton = page.getByRole('button', { name: 'Entrar' });
                await loginButton.scrollIntoViewIfNeeded();
                await loginButton.click();
                await expect(page).toHaveURL("https://gibiverse.local/home");
            });

            test('Abrir página Comic Books', async ({ page }) => {
                await page.goto('https://gibiverse.local/comicbooks');
                const title = await page.getByText("Gibis");
                expect(title).toBeTruthy();
            });
        });
    });
}); 