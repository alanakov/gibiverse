// @ts-nocheck
jest.mock("sequelize", () => {
  class Sequelize { }
  class Model {
    static init = jest.fn();
    static hasMany = jest.fn();
    static belongsTo = jest.fn();
    static define = jest.fn();
  }
  return {
    Sequelize,
    Op: { or: "or" },
    DataTypes: {
      INTEGER: "INTEGER",
      STRING: "STRING",
      TEXT: "TEXT",
    },
    Model,
  };
});
jest.mock("../src/utils/paginate", () => ({
  paginate: jest.fn(),
}));

import request from "supertest";
import app from "../src/app";
import ComicBookModel from "../src/models/ComicBookModel";

const mockComics = [
  { id: 1, title: "Gibi 1" },
  { id: 2, title: "Gibi 2" },
];

beforeEach(() => {
  jest.clearAllMocks();
  ComicBookModel.findAll = jest.fn();
  ComicBookModel.findByPk = jest.fn();
  ComicBookModel.create = jest.fn();
  ComicBookModel.update = jest.fn();
  ComicBookModel.destroy = jest.fn();
});

describe("Rotas de Gibis", () => {
  it("deve listar todos os gibis", async () => {
    const { paginate } = require("../src/utils/paginate");
    paginate.mockResolvedValue({ data: mockComics });
    const res = await request(app).get("/comicbooks");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockComics);
  });

  it("deve criar um novo gibi", async () => {
    const novoGibi = { title: "Novo Gibi", description: "Desc", genreId: 1, collectionId: 1, authorId: 1, coverUrl: "url.jpg" };
    jest.spyOn(ComicBookModel, "create").mockResolvedValue({ id: 3, ...novoGibi });
    const res = await request(app).post("/comicbooks").send(novoGibi);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(novoGibi);
  });

  it("deve atualizar um gibi existente", async () => {
    const mockComic = { save: jest.fn(), update: jest.fn(), title: "Gibi 1", description: "Desc", genreId: 1, collectionId: 1, authorId: 1, coverUrl: "url.jpg" };
    jest.spyOn(ComicBookModel, "findByPk").mockResolvedValue(mockComic);
    jest.spyOn(mockComic, "update").mockResolvedValue();
    const res = await request(app).put("/comicbooks/1").send({ title: "Atualizado" });
    expect(res.status).toBe(200);
  });

  it("deve deletar um gibi", async () => {
    const mockComic = { destroy: jest.fn() };
    jest.spyOn(ComicBookModel, "findByPk").mockResolvedValue(mockComic);
    jest.spyOn(mockComic, "destroy").mockResolvedValue();
    const res = await request(app).delete("/comicbooks/1");
    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao tentar deletar gibi inexistente", async () => {
    jest.spyOn(ComicBookModel, "findByPk").mockResolvedValue(null);
    const res = await request(app).delete("/comicbooks/999");
    expect(res.status).toBe(404);
  });
});
