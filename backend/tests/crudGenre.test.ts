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
import GenreModel from "../src/models/GenreModel";

const mockGenres = [
  { id: 1, name: "Ação" },
  { id: 2, name: "Aventura" },
];

beforeEach(() => {
  jest.clearAllMocks();
  GenreModel.findAll = jest.fn();
  GenreModel.findByPk = jest.fn();
  GenreModel.create = jest.fn();
  GenreModel.update = jest.fn();
  GenreModel.destroy = jest.fn();
});

describe("Rotas de Gêneros", () => {
  it("deve listar todos os gêneros", async () => {
    const { paginate } = require("../src/utils/paginate");
    paginate.mockResolvedValue({ data: mockGenres });
    const res = await request(app).get("/genres");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockGenres);
  });

  it("deve criar um novo gênero", async () => {
    const novoGenero = { name: "Terror" };
    jest.spyOn(GenreModel, "create").mockResolvedValue({ id: 3, ...novoGenero });
    const res = await request(app).post("/genres").send(novoGenero);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(novoGenero);
  });

  it("deve atualizar um gênero existente", async () => {
    const mockGenre = { save: jest.fn(), update: jest.fn(), name: "Ação" };
    jest.spyOn(GenreModel, "findByPk").mockResolvedValue(mockGenre);
    jest.spyOn(mockGenre, "update").mockResolvedValue();
    const res = await request(app).put("/genres/1").send({ name: "Atualizado" });
    expect(res.status).toBe(200);
  });

  it("deve deletar um gênero", async () => {
    const mockGenre = { destroy: jest.fn() };
    jest.spyOn(GenreModel, "findByPk").mockResolvedValue(mockGenre);
    jest.spyOn(mockGenre, "destroy").mockResolvedValue();
    const res = await request(app).delete("/genres/1");
    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao tentar deletar gênero inexistente", async () => {
    jest.spyOn(GenreModel, "findByPk").mockResolvedValue(null);
    const res = await request(app).delete("/genres/999");
    expect(res.status).toBe(404);
  });
});
