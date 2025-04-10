import { Request, Response } from "express";
import request from "supertest";
import {
  updateCollection,
  destroyCollectionById,
} from "../src/controllers/CollectionController";
import CollectionModel from "../src/models/CollectionModel";
import app from "../src/index";
import sequelize from "../src/config/database";

describe("Testes das rotas de coleções", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      headers: {},
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
    test("Erro 404 ao atualizar coleção inexistente", async () => {
      req.params = { id: "999" };
      req.body = {
        name: "Coleção Atualizada",
        description: "Nova descrição",
        authorId: 1,
        coverUrl: "nova-url.jpg",
      };

      jest.spyOn(CollectionModel, "findByPk").mockResolvedValue(null);

      await updateCollection(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Collection not found" });
    });

    test("Erro 404 ao deletar coleção inexistente", async () => {
      jest.spyOn(CollectionModel, "findByPk").mockResolvedValue(null);

      await destroyCollectionById(
        req as Request<{ id: string }>,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Collection not found" });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    const unauthenticatedAuthMiddleware = jest.fn((req, res, next) => {
      next();
    });

    test("GET /collections deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/collections");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("GET /collection/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/collection/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("POST /collection deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).post("/collection").send({
        name: "Nova Coleção",
        description: "Descrição da coleção",
        authorId: 1,
        coverUrl: "url-da-foto.jpg",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("PUT /collection/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).put("/collection/1").send({
        name: "Coleção Atualizada",
        description: "Nova descrição",
        authorId: 1,
        coverUrl: "nova-url.jpg",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("DELETE /collection/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).delete("/collection/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });
  });
});
