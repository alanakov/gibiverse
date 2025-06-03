import { Request, Response } from "express";
import request from "supertest";
import GenreModel from "../src/models/GenreModel";
import app from "../src/index";
import sequelize from "../src/config/database";
import { updateGenre } from "../src/controllers/genre/updateGenre.controller";
import { deleteGenreById } from "../src/controllers/genre/deleteGenreById.controller";

// Mock do authMiddleware antes de importar o app
jest.mock("../src/middleware/authMiddleware", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    const token = req.headers.authorization;

    if (!token || token !== "Bearer valid-token") {
      return res.status(401).json({ error: "Acesso não autorizado" });
    }
    req.user = { id: 1, email: "test@example.com" };
    next();
  }),
}));

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
      req.params = { id: "999" }; // Adicionando o parâmetro que estava faltando
      jest.spyOn(GenreModel, "findByPk").mockResolvedValue(null);

      await deleteGenreById(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Genre not found" });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    test("GET /genres deve exigir autenticação", async () => {
      const response = await request(app).get("/genres");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("GET /genres/:id deve exigir autenticação", async () => {
      const response = await request(app).get("/genres/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("POST /genres deve exigir autenticação", async () => {
      const response = await request(app).post("/genres").send({
        name: "Novo Gênero",
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("PUT /genres/:id deve exigir autenticação", async () => {
      const response = await request(app).put("/genres/1").send({
        name: "Gênero Atualizado",
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("DELETE /genres/:id deve exigir autenticação", async () => {
      const response = await request(app).delete("/genres/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("Acesso com token válido deve retornar sucesso", async () => {
      // Mock da resposta do controller
      jest.spyOn(GenreModel, "findAll").mockResolvedValueOnce([]);

      const response = await request(app)
        .get("/genres")
        .set("Authorization", "Bearer valid-token");

      expect(response.status).not.toBe(401);
    });
  });
});
