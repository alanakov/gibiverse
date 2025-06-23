import { Request, Response } from "express"; //OK
import request from "supertest";
import app from "../src/index";
import UserModel from "../src/models/UserModel";
import * as cpfValidator from "cpf-cnpj-validator";
import bcrypt from "bcrypt";
import { deleteUserById } from "../src/controllers/user/deleteUserById.controller";

jest.mock("../src/models/UserModel", () => ({
  findByPk: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  validarNivelSenha: jest.fn().mockReturnValue({
    valida: true,
    requisitos: {
      temMaiuscula: true,
      temMinuscula: true,
      temNumero: true,
      temEspecial: true,
      tamanhoMinimo: true,
    },
  }),
}));

jest.mock("cpf-cnpj-validator", () => ({
  cpf: {
    isValid: jest.fn().mockReturnValue(true),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword"),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock("../src/middleware/authMiddleware", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Acesso negado. Token ausente ou malformado.",
      });
    }

    req.user = { id: 1, email: "test@example.com" };
    next();
  }),
}));

describe("Testes das rotas de usuário", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  beforeEach(() => {
    req = {
      body: {},
      params: { id: "1" },
      headers: {},
      user: { id: 1, email: "test@example.com" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("Testes de validação", () => {
    test("Erro 404 ao deletar usuário inexistente", async () => {
      (UserModel.findByPk as jest.Mock).mockResolvedValueOnce(null);
      req.params = { id: "999" };

      await deleteUserById(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Usuário não encontrado",
      });
    });
  });
});

export {};
