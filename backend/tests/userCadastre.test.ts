import { Request, Response } from "express";
import UserModel from "../src/models/UserModel";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import bcrypt from "bcrypt";
import { createUser } from "../src/controllers/user/createUser.controller";

jest.mock("../src/models/UserModel");
jest.mock("cpf-cnpj-validator");
jest.mock("bcrypt");

describe("Testes de cadastro de usuário", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Erro 400 porque todos os campos são obrigatórios", async () => {
    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Todos os campos são obrigatórios",
    });
  });

  test("Erro 400 porque o CPF é inválido", async () => {
    req.body = {
      name: "Vanderleia",
      email: "vandinha@gmail.com",
      password: "SenhaForte456@",
      cpf: "12345678902",
    };

    (cpfValidator.isValid as jest.Mock).mockReturnValue(false);

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "CPF inválido",
    });
  });

  test("Erro 400 porque o e-mail é inválido", async () => {
    req.body = {
      name: "Vanderleia",
      email: "emailinvalido",
      password: "SenhaForte345@",
      cpf: "12345678902",
    };

    (cpfValidator.isValid as jest.Mock).mockReturnValue(true);

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email inválido",
    });
  });

  test("Erro 400 porque a senha é muito fraca", async () => {
    req.body = {
      name: "Vanderleia",
      email: "vanderleia@gmail.com",
      password: "456",
      cpf: "12345678902",
    };

    (cpfValidator.isValid as jest.Mock).mockReturnValue(true);
    (UserModel.validarNivelSenha as jest.Mock).mockReturnValue({
      valida: false,
      requisitos: {
        temMaiuscula: false,
        temMinuscula: false,
        temNumero: true,
        temEspecial: false,
        tamanhoMinimo: false,
      },
    });

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Senha muito fraca",
      details: {
        temMaiuscula: false,
        temMinuscula: false,
        temNumero: true,
        temEspecial: false,
        tamanhoMinimo: false,
      },
    });
  });

  test("Erro 409 porque email ou CPF já existe", async () => {
    req.body = {
      name: "Vanderleia",
      email: "vanderleia@gmail.com",
      password: "SenhaForte123@",
      cpf: "12345678901",
    };

    (cpfValidator.isValid as jest.Mock).mockReturnValue(true);
    (UserModel.validarNivelSenha as jest.Mock).mockReturnValue({
      valida: true,
    });
    (UserModel.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: "vanderleia@gmail.com",
    });

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email ou CPF já cadastrado",
    });
  });

  test("Cadastro de usuário realizado com sucesso", async () => {
    const mockUser = {
      id: 1,
      name: "Vanderleia",
      email: "vanderleia@gmail.com",
      cpf: "12345678901",
      password: "hashedPassword123",
    };

    req.body = {
      name: "Vanderleia",
      email: "vanderleia@gmail.com",
      password: "SenhaForte123@",
      cpf: "12345678901",
    };

    (cpfValidator.isValid as jest.Mock).mockReturnValue(true);
    (UserModel.validarNivelSenha as jest.Mock).mockReturnValue({
      valida: true,
    });
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");
    (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      token: expect.any(String), // Verifica se um token foi retornado
    });
  });

  test("Erro 500 no servidor durante o cadastro", async () => {
    req.body = {
      name: "Vanderleia",
      email: "vanderleia@gmail.com",
      password: "SenhaForte123@",
      cpf: "12345678901",
    };

    (cpfValidator.isValid as jest.Mock).mockReturnValue(true);
    (UserModel.validarNivelSenha as jest.Mock).mockReturnValue({
      valida: true,
    });
    (UserModel.findOne as jest.Mock).mockRejectedValue(
      new Error("Erro no banco de dados")
    );

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro interno no servidor",
    });
  });
});
