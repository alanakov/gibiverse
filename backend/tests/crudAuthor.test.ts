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

import request from "supertest";
import app from "../src/app";
import AuthorModel from "../src/models/AuthorModel";

const mockAuthors = [
  { id: 1, name: "Autor 1" },
  { id: 2, name: "Autor 2" },
];

beforeEach(() => {
  jest.clearAllMocks();
  AuthorModel.findAll = jest.fn();
  AuthorModel.findByPk = jest.fn();
  AuthorModel.create = jest.fn();
  AuthorModel.update = jest.fn();
  AuthorModel.destroy = jest.fn();
});

jest.mock("../src/utils/paginate", () => ({
  paginate: jest.fn(),
}));

describe("Rotas de Autores", () => {
  it("deve listar todos os autores", async () => {
    const { paginate } = require("../src/utils/paginate");
    paginate.mockResolvedValue({ data: mockAuthors });
    const res = await request(app).get("/authors");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockAuthors);
  });

  it("deve criar um novo autor", async () => {
    const novoAutor = { name: "Novo Autor", bio: "Bio do autor", coverUrl: "url.jpg" };
    jest.spyOn(AuthorModel, "create").mockResolvedValue({ id: 3, ...novoAutor });
    const res = await request(app).post("/authors").send(novoAutor);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(novoAutor);
  });

  it("deve atualizar um autor existente", async () => {
    const mockAuthor = { save: jest.fn(), name: "Autor 1", bio: "Bio", coverUrl: "url.jpg" };
    jest.spyOn(AuthorModel, "findByPk").mockResolvedValue(mockAuthor);
    const res = await request(app).put("/authors/1").send({ name: "Atualizado" });
    expect(res.status).toBe(200);
  });

  it("deve deletar um autor", async () => {
    const mockAuthor = { destroy: jest.fn() };
    jest.spyOn(AuthorModel, "findByPk").mockResolvedValue(mockAuthor);
    jest.spyOn(mockAuthor, "destroy").mockResolvedValue();
    const res = await request(app).delete("/authors/1");
    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao tentar deletar autor inexistente", async () => {
    jest.spyOn(AuthorModel, "findByPk").mockResolvedValue(null);
    const res = await request(app).delete("/authors/999");
    expect(res.status).toBe(404);
  });
});
