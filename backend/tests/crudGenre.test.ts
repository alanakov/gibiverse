import { Request, Response } from "express";
import request from "supertest";
import {
  updateGenre,
  destroyGenreById,
} from "../src/controllers/GenreController";
import GenreModel from "../src/models/GenreModel";
import app from "../src/index";
import sequelize from "../src/config/database";

describe("Testes das rotas de gêneros", () => {
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
    test("Erro 404 ao atualizar gênero inexistente", async () => {
      req.params = { id: "999" };
      req.body = {
        name: "Gênero Atualizado",
      };

      jest.spyOn(GenreModel, "findByPk").mockResolvedValue(null);

      await updateGenre(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Genre not found" });
    });

    test("Erro 404 ao deletar gênero inexistente", async () => {
      jest.spyOn(GenreModel, "findByPk").mockResolvedValue(null);

      await destroyGenreById(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Genre not found" });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    const unauthenticatedAuthMiddleware = jest.fn((req, res, next) => {
      next();
    });

    test("GET /genres deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/genres");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("GET /genre/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/genre/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("POST /genre deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).post("/genre").send({
        name: "Novo Gênero",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("PUT /genre/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).put("/genre/1").send({
        name: "Gênero Atualizado",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("DELETE /genre/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).delete("/genre/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });
  });
});
