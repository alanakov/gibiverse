import { Request, Response } from "express";
import { updateUser } from "../src/controllers/UserController";
import UserModel from "../src/models/UserModel";
import * as cpfValidator from "cpf-cnpj-validator";
import bcrypt from "bcrypt";

// Mock dos models e validações
jest.mock("../src/models/UserModel");
jest.mock("cpf-cnpj-validator", () => ({
  cpf: {
    isValid: jest.fn(),
  },
}));
jest.mock("bcrypt");

const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe("Testes de edição de usuário", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: {},
      user: { id: 1 }, // Simula usuário logado
    } as Request<{ id: string }>;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Resetar mocks
    cpfValidator.cpf.isValid = jest.fn();
    mockBcrypt.hash.mockReset();
  });

  test("Erro 403 porque o usuário não tem permissão para editar", async () => {
    req.user = { id: 2 }; // Simula outro usuário tentando editar

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Você não tem permissão para editar este usuário",
    });
  });

  test("Erro 400 porque nome e email são obrigatórios", async () => {
    req.body = { cpf: "12345678901" }; // Faltam nome e email

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome e email são obrigatórios",
    });
  });

  test("Erro 400 porque o CPF é inválido", async () => {
    req.body = {
      name: "Alana",
      email: "alana@example.com",
      cpf: "12345678901",
    };

    cpfValidator.cpf.isValid.mockReturnValue(false);

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "CPF inválido",
    });
  });

  test("Erro 404 porque o usuário não foi encontrado", async () => {
    req.body = {
      name: "Alana",
      email: "alana@example.com",
      cpf: "12345678901",
    };

    cpfValidator.cpf.isValid.mockReturnValue(true);
    (UserModel.findByPk as jest.Mock).mockResolvedValue(null);

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Usuário não encontrado",
    });
  });

  test("Erro 400 porque a senha é muito fraca", async () => {
    req.body = {
      name: "Alana",
      email: "alana@example.com",
      password: "fraca",
    };

    const mockUser = {
      id: 1,
      name: "Antigo",
      email: "antigo@example.com",
      cpf: "11111111111",
      password: "hashantigo",
      save: jest.fn(),
    };

    cpfValidator.cpf.isValid.mockReturnValue(true);
    (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (UserModel.validarNivelSenha as jest.Mock).mockReturnValue({
      valida: false,
      requisitos: {
        temMaiuscula: false,
        temMinuscula: true,
        temNumero: false,
        temEspecial: false,
        tamanhoMinimo: false,
      },
    });

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Senha muito fraca",
      detalhes: {
        temMaiuscula: false,
        temMinuscula: true,
        temNumero: false,
        temEspecial: false,
        tamanhoMinimo: false,
      },
    });
  });

  test("Atualização de usuário realizada com sucesso (sem alterar senha)", async () => {
    req.body = {
      name: "Alana Atualizada",
      email: "alana.nova@example.com",
      cpf: "12345678901",
    };

    const mockUser = {
      id: 1,
      name: "Alana Antiga",
      email: "alana@example.com",
      cpf: "11111111111",
      password: "hashantigo",
      save: jest.fn().mockResolvedValue(true),
    };

    cpfValidator.cpf.isValid.mockReturnValue(true);
    (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUser);

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(mockUser.name).toBe("Alana Atualizada");
    expect(mockUser.email).toBe("alana.nova@example.com");
    expect(mockUser.cpf).toBe("12345678901");
    expect(mockBcrypt.hash).not.toHaveBeenCalled(); // Não deve chamar hash para senha
    expect(mockUser.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: "Alana Atualizada",
      email: "alana.nova@example.com",
      cpf: "12345678901",
    });
  });

  test("Atualização de usuário com alteração de senha", async () => {
    req.body = {
      name: "Alana Atualizada",
      email: "alana.nova@example.com",
      password: "NovaSenhaForte123@",
    };

    const mockUser = {
      id: 1,
      name: "Alana Antiga",
      email: "alana@example.com",
      cpf: "11111111111",
      password: "hashantigo",
      save: jest.fn().mockResolvedValue(true),
    };

    cpfValidator.cpf.isValid.mockReturnValue(true);
    (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (UserModel.validarNivelSenha as jest.Mock).mockReturnValue({
      valida: true,
      requisitos: {
        temMaiuscula: true,
        temMinuscula: true,
        temNumero: true,
        temEspecial: true,
        tamanhoMinimo: true,
      },
    });
    mockBcrypt.hash.mockResolvedValue("novohash");

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(mockUser.name).toBe("Alana Atualizada");
    expect(mockUser.email).toBe("alana.nova@example.com");
    expect(mockUser.password).toBe("novohash");
    expect(mockBcrypt.hash).toHaveBeenCalledWith("NovaSenhaForte123@", 10);
    expect(mockUser.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: "Alana Atualizada",
      email: "alana.nova@example.com",
      cpf: "11111111111",
    });
  });

  test("Erro 500 no servidor durante a atualização", async () => {
    req.body = {
      name: "Alana",
      email: "alana@example.com",
    };

    const mockUser = {
      id: 1,
      name: "Alana Antiga",
      email: "alana@example.com",
      cpf: "11111111111",
      password: "hashantigo",
      save: jest.fn().mockRejectedValue(new Error("Erro no banco de dados")),
    };

    cpfValidator.cpf.isValid.mockReturnValue(true);
    (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUser);

    await updateUser(req as Request<{ id: string }>, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro interno no servidor",
    });
  });
});
