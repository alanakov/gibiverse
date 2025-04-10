import { Request, Response } from "express";
import request from "supertest";
import {
  updateComicBook,
  destroyComicBookById,
} from "../src/controllers/ComicBookController";
import ComicBookModel from "../src/models/ComicBookModel";
import app from "../src/index";
import sequelize from "../src/config/database";

describe("Testes das rotas de gibis", () => {
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
    test("Erro 404 ao atualizar gibi inexistente", async () => {
      req.params = { id: "999" };
      req.body = {
        title: "Gibi Atualizado",
        description: "Nova descrição",
        coverUrl: "nova-url.jpg",
        genreId: 1,
        collectionId: 1,
        authorId: 1,
      };

      jest.spyOn(ComicBookModel, "findByPk").mockResolvedValue(null);

      await updateComicBook(req as Request<{ id: string }>, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Comic Book not found" });
    });

    test("Erro 404 ao deletar gibi inexistente", async () => {
      jest.spyOn(ComicBookModel, "findByPk").mockResolvedValue(null);

      await destroyComicBookById(
        req as Request<{ id: string }>,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Comic Book not found" });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    const unauthenticatedAuthMiddleware = jest.fn((req, res, next) => {
      next();
    });

    test("GET /comic-books deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/comic-books");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("GET /comic-book/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).get("/comic-book/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("POST /comic-book deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).post("/comic-book").send({
        title: "Novo Gibi",
        description: "Descrição do gibi",
        coverUrl: "url-da-foto.jpg",
        genreId: 1,
        collectionId: 1,
        authorId: 1,
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("PUT /comic-book/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).put("/comic-book/1").send({
        title: "Gibi Atualizado",
        description: "Nova descrição",
        coverUrl: "nova-url.jpg",
        genreId: 1,
        collectionId: 1,
        authorId: 1,
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("DELETE /comic-book/:id deve exigir autenticação", async () => {
      jest.mock("../src/middleware/authMiddleware", () => ({
        authMiddleware: unauthenticatedAuthMiddleware,
      }));

      const response = await request(app).delete("/comic-book/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });
  });
});
