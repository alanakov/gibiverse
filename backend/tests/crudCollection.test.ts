import { Request, Response } from "express";
import request from "supertest";
import CollectionModel from "../src/models/CollectionModel";
import app from "../src/index";
import sequelize from "../src/config/database";
import { updateCollection } from "../src/controllers/collection/updateCollection.controller";
import { deleteCollectionById } from "../src/controllers/collection/deleteCollectionById.controller";

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
      req.params = { id: "999" }; // Adicionei o params que estava faltando
      jest.spyOn(CollectionModel, "findByPk").mockResolvedValue(null);

      await deleteCollectionById(
        req as Request<{ id: string }>,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Collection not found" });
    });
  });

  describe("Testes de autenticação nas rotas", () => {
    // Teste para verificar se as rotas estão protegidas
    test("GET /collections deve exigir autenticação", async () => {
      const response = await request(app).get("/collections");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("GET /collections/:id deve exigir autenticação", async () => {
      const response = await request(app).get("/collections/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("POST /collections deve exigir autenticação", async () => {
      const response = await request(app).post("/collections").send({
        name: "Nova Coleção",
        description: "Descrição da coleção",
        authorId: 1,
        coverUrl: "url-da-foto.jpg",
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("PUT /collections/:id deve exigir autenticação", async () => {
      const response = await request(app).put("/collections/1").send({
        name: "Coleção Atualizada",
        description: "Nova descrição",
        authorId: 1,
        coverUrl: "nova-url.jpg",
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    test("DELETE /collections/:id deve exigir autenticação", async () => {
      const response = await request(app).delete("/collections/1");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Acesso não autorizado");
    });

    // Teste adicional para verificar acesso com token válido
    test("Acesso com token válido deve retornar sucesso", async () => {
      // Mock da resposta do controller
      jest.spyOn(CollectionModel, "findAll").mockResolvedValueOnce([]);

      const response = await request(app)
        .get("/collections")
        .set("Authorization", "Bearer valid-token");

      expect(response.status).not.toBe(401);
    });
  });
});
