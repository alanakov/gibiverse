import { Request, Response } from "express";
import request from "supertest";
import UserModel from "../src/models/UserModel";
import app from "../src/app";
import sequelize from "../src/config/database";
import * as cpfValidator from "cpf-cnpj-validator";
import bcrypt from "bcrypt";
import { deleteUserById } from "../src/controllers/user/deleteUserById.controller";

// Mock dos models e validações
jest.mock("../src/models/UserModel");
jest.mock("cpf-cnpj-validator", () => ({
  cpf: {
    isValid: jest.fn(),
  },
}));
jest.mock("bcrypt");

describe("Testes das rotas de usuario", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      headers: {},
      user: {}, // Adicionado para simular usuário autenticado
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Testes de validação", () => {
    test("Erro 404 ao deletar usuario inexistente", async () => {
      jest.spyOn(UserModel, "findByPk").mockResolvedValue(null);

      req.params = { id: "1" };
      await deleteUserById(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Usuário não encontrado",
      });
    });

    test("Erro 400 ao atualizar com CPF inválido", async () => {
      const mockUser = {
        id: 1,
        name: "Teste",
        email: "teste@example.com",
        cpf: "11111111111",
        save: jest.fn(),
      };

      jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUser);
      cpfValidator.cpf.isValid.mockReturnValue(false);

      req.params = { id: "1" };
      req.body = {
        name: "Teste",
        email: "teste@example.com",
        cpf: "12345678901", // CPF inválido
      };
      req.user = { id: 1 }; // Usuário autenticado

      await request(app)
        .put("/users/1")
        .set("Authorization", "Bearer validtoken")
        .send(req.body)
        .expect(400)
        .then((response) => {
          expect(response.body.error).toBe("CPF inválido");
        });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    // Mock para simular middleware de autenticação não autenticado
    const unauthenticatedAuthMiddleware = jest.fn((req, res, next) => {
      return next(); // Simula rota sem autenticação
    });

    beforeEach(() => {
      jest.resetModules();
    });

    test("GET /users deve exigir autenticação", async () => {
      jest.mock("../src/middlewares/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/users");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("GET /users/:id deve exigir autenticação", async () => {
      jest.mock("../src/middlewares/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/users/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("PUT /users/:id deve exigir autenticação", async () => {
      jest.mock("../src/middlewares/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).put("/users/1").send({
        name: "Alana",
        cpf: "12345678901",
        email: "alana@example.com",
        password: "SenhaForte@123",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("DELETE /users/:id deve exigir autenticação", async () => {
      jest.mock("../src/middlewares/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).delete("/users/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("POST /users/login deve validar email e senha", async () => {
      const mockUser = {
        id: 1,
        name: "Teste",
        email: "teste@example.com",
        validarSenha: jest.fn().mockResolvedValue(false),
      };

      jest.spyOn(UserModel, "findOne").mockResolvedValue(mockUser);

      const response = await request(app).post("/users/login").send({
        email: "emailinvalido",
        password: "senhainvalida",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Formato de e-mail inválido");
    });
  });

  describe("Testes de rotas autenticadas", () => {
    // Mock para simular middleware de autenticação autenticado
    const authenticatedAuthMiddleware = jest.fn((req, res, next) => {
      req.user = { id: 1 }; // Simula usuário autenticado
      return next();
    });

    beforeEach(() => {
      jest.mock("../src/middlewares/authMiddleware", () => ({
        authMiddleware: authenticatedAuthMiddleware,
      }));
    });

    test("GET /users/me deve retornar usuário logado", async () => {
      const mockUser = {
        id: 1,
        name: "Teste",
        email: "teste@example.com",
        cpf: "12345678901",
      };

      jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUser);

      const response = await request(app)
        .get("/users/me")
        .set("Authorization", "Bearer validtoken");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: "Teste",
        email: "teste@example.com",
        cpf: "12345678901",
      });
    });

    test("PUT /users/:id deve atualizar com dados válidos", async () => {
      const mockUser = {
        id: 1,
        name: "Antigo",
        email: "antigo@example.com",
        cpf: "11111111111",
        password: "hashantigo",
        save: jest.fn().mockResolvedValue(true),
      };

      jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUser);
      cpfValidator.cpf.isValid.mockReturnValue(true);
      jest.spyOn(bcrypt, "hash").mockResolvedValue("novohash" as never);

      const response = await request(app)
        .put("/users/1")
        .set("Authorization", "Bearer validtoken")
        .send({
          name: "Novo Nome",
          email: "novo@example.com",
          password: "NovaSenhaForte@123",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: "Novo Nome",
        email: "novo@example.com",
        cpf: "11111111111",
      });
    });
  });
});
