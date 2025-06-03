import { Request, Response } from "express";
import request from "supertest";
import ComicBookModel from "../src/models/ComicBookModel";
import app from "../src/index";
import sequelize from "../src/config/database";
import { updateComicBook } from "../src/controllers/comicBook/updateComicBook.controller";
import { deleteComicBookById } from "../src/controllers/comicBook/deleteComicBookById.controller";

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
      req.params = { id: "999" };
      jest.spyOn(ComicBookModel, "findByPk").mockResolvedValue(null);

      await deleteComicBookById(
        req as Request<{ id: string }>,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Comic Book not found" });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    // Teste para verificar se as rotas estão protegidas
    test("GET /comicbooks deve exigir autenticação", async () => {
      const response = await request(app).get("/comicbooks");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("GET /comicbooks/:id deve exigir autenticação", async () => {
      const response = await request(app).get("/comicbooks/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("POST /comicbooks deve exigir autenticação", async () => {
      const response = await request(app).post("/comicbooks").send({
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

    test("PUT /comicbooks/:id deve exigir autenticação", async () => {
      const response = await request(app).put("/comicbooks/1").send({
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

    test("DELETE /comicbooks/:id deve exigir autenticação", async () => {
      const response = await request(app).delete("/comicbooks/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    // Teste adicional para verificar acesso com token válido
    test("Acesso com token válido deve retornar sucesso", async () => {
      // Mock da resposta do controller
      jest.spyOn(ComicBookModel, "findAll").mockResolvedValueOnce([]);

      const response = await request(app)
        .get("/comicbooks")
        .set("Authorization", "Bearer valid-token");

      expect(response.status).not.toBe(401);
    });
  });
});
