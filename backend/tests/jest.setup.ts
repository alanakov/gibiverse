// Mock global do Sequelize
jest.mock("sequelize", () => {
    class MockModel {
        static init = jest.fn();
        static hasMany = jest.fn();
        static belongsTo = jest.fn();
        static define = jest.fn();
        static findAll = jest.fn();
        static findByPk = jest.fn();
        static create = jest.fn();
        static update = jest.fn();
        static destroy = jest.fn();
    }
    return {
        Sequelize: jest.fn(),
        DataTypes: {
            INTEGER: "INTEGER",
            STRING: "STRING",
            TEXT: "TEXT",
        },
        Model: MockModel,
    };
});

// Mock de validação de CPF
jest.mock("cpf-cnpj-validator", () => ({
    cpf: { isValid: () => true },
}));

// Mock de validação de senha forte
jest.mock("../src/utils/auth/validateDecodedToken", () => ({
    validarNivelSenha: () => ({ valida: true, requisitos: {} }),
}));

// Mock de geração de token JWT
jest.mock("../src/utils/auth/jwt", () => ({
    generateToken: () => "fake-jwt-token",
}));

// Mock de middlewares
jest.mock("../src/middleware/authMiddleware", () => ({
    authMiddleware: (req: any, res: any, next: any) => next(),
})); 