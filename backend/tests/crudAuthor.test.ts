import { Request, Response } from "express";
import request from "supertest";
import AuthorModel from "../src/models/AuthorModel";
import sequelize from "../src/config/database";
import { updateAuthor } from "../src/controllers/author/updateAuthor.controller";
import { deleteAuthorById } from "../src/controllers/author/deleteAuthorById.controller";
import app from "../src/index";

// Mock do authMiddleware deve vir antes de qualquer import que possa usá-lo
jest.mock("../src/middleware/authMiddleware", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    // Simula o comportamento do middleware real
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        error: "Acesso negado. Token ausente ou malformado.",
      });
    }

    if (token === "Bearer valid") {
      req.user = { id: 1, email: "test@example.com" };
      return next();
    }

    return res.status(401).json({
      error: "Acesso negado. Falha na autenticação.",
    });
  }),
}));

describe("Testes das rotas de autores", () => {
  beforeAll(async () => {
    // Garante que o mock está ativo antes dos testes
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Testes de autenticação nas rotas", () => {
    test("GET /authors deve retornar 401 sem token", async () => {
      const response = await request(app).get("/authors");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("GET /authors/:id deve retornar 401 sem token", async () => {
      const response = await request(app).get("/authors/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("POST /authors deve retornar 401 sem token", async () => {
      const response = await request(app).post("/authors").send({
        name: "Novo Autor",
        bio: "Biografia do autor",
        coverUrl: "url-da-foto.jpg",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("PUT /authors/:id deve retornar 401 sem token", async () => {
      const response = await request(app).put("/authors/1").send({
        name: "Autor Atualizado",
        bio: "Nova biografia",
        coverUrl: "nova-url.jpg",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("DELETE /authors/:id deve retornar 401 sem token", async () => {
      const response = await request(app).delete("/authors/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "Acesso negado. Token ausente ou malformado."
      );
    });

    test("Deve retornar 401 com token inválido", async () => {
      const response = await request(app)
        .get("/authors")
        .set("Authorization", "Bearer invalid");

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso negado. Falha na autenticação.");
    });
  });
});
