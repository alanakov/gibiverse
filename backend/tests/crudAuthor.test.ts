import { Request, Response } from "express";
import request from "supertest";
import AuthorModel from "../src/models/AuthorModel";
import sequelize from "../src/config/database";
import { updateAuthor } from "../src/controllers/author/updateAuthor.controller";
import { deleteAuthorById } from "../src/controllers/author/deleteAuthorById.controller";
import app from "../src";

// Mock do authMiddleware para todos os testes
jest.mock("../src/middleware/authMiddleware", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Acesso negado. Token ausente ou malformado." });
    }

    // Simula um token válido quando o header contém "Bearer valid"
    if (token === "Bearer valid") {
      req.user = { id: 1, email: "test@example.com" };
      return next();
    }

    return res
      .status(401)
      .json({ error: "Acesso negado. Falha na autenticação." });
  }),
}));

describe("Testes das rotas de autores", () => {
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
    test("Erro 404 ao atualizar autor inexistente", async () => {
      req.params = { id: "999" };
      req.body = {
        name: "Autor Atualizado",
        bio: "Nova biografia",
        coverUrl: "nova-url.jpg",
      };
      req.headers = { authorization: "Bearer valid" }; // Adiciona token válido

      jest.spyOn(AuthorModel, "findByPk").mockResolvedValue(null);

      await updateAuthor(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Author not found" });
    });

    test("Erro 404 ao deletar autor inexistente", async () => {
      req.headers = { authorization: "Bearer valid" }; // Adiciona token válido
      jest.spyOn(AuthorModel, "findByPk").mockResolvedValue(null);

      await deleteAuthorById(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Author not found" });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    test("GET /authors deve exigir autenticação", async () => {
      const response = await request(app).get("/authors");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("GET /author/:id deve exigir autenticação", async () => {
      const response = await request(app).get("/author/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("POST /author deve exigir autenticação", async () => {
      const response = await request(app).post("/author").send({
        name: "Novo Autor",
        bio: "Biografia do autor",
        coverUrl: "url-da-foto.jpg",
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("PUT /author/:id deve exigir autenticação", async () => {
      const response = await request(app).put("/author/1").send({
        name: "Autor Atualizado",
        bio: "Nova biografia",
        coverUrl: "nova-url.jpg",
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("DELETE /author/:id deve exigir autenticação", async () => {
      const response = await request(app).delete("/author/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("Rotas devem aceitar requisições com token válido", async () => {
      // Mock da resposta do AuthorModel
      jest.spyOn(AuthorModel, "findAll").mockResolvedValue([]);

      const response = await request(app)
        .get("/authors")
        .set("Authorization", "Bearer valid");

      expect(response.status).not.toBe(401);
    });
  });
});
