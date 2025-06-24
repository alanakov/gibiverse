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
import CollectionModel from "../src/models/CollectionModel";

const mockCollections = [
  { id: 1, name: "Coleção 1" },
  { id: 2, name: "Coleção 2" },
];

beforeEach(() => {
  jest.clearAllMocks();
  CollectionModel.findAll = jest.fn();
  CollectionModel.findByPk = jest.fn();
  CollectionModel.create = jest.fn();
  CollectionModel.update = jest.fn();
  CollectionModel.destroy = jest.fn();
});

describe("Rotas de Coleções", () => {
  it("deve listar todas as coleções", async () => {
    const { paginate } = require("../src/utils/paginate");
    paginate.mockResolvedValue({ data: mockCollections });
    const res = await request(app).get("/collections");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockCollections);
  });

  it("deve criar uma nova coleção", async () => {
    const novaColecao = { name: "Nova Coleção", description: "Desc", authorId: 1, coverUrl: "url.jpg" };
    jest.spyOn(CollectionModel, "create").mockResolvedValue({ id: 3, ...novaColecao });
    const res = await request(app).post("/collections").send(novaColecao);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(novaColecao);
  });

  it("deve atualizar uma coleção existente", async () => {
    const mockCollection = { save: jest.fn(), update: jest.fn(), name: "Coleção 1", description: "Desc", authorId: 1, coverUrl: "url.jpg" };
    jest.spyOn(CollectionModel, "findByPk").mockResolvedValue(mockCollection);
    jest.spyOn(mockCollection, "update").mockResolvedValue();
    const res = await request(app).put("/collections/1").send({ name: "Atualizada" });
    expect(res.status).toBe(200);
  });

  it("deve deletar uma coleção", async () => {
    const mockCollection = { destroy: jest.fn() };
    jest.spyOn(CollectionModel, "findByPk").mockResolvedValue(mockCollection);
    jest.spyOn(mockCollection, "destroy").mockResolvedValue();
    const res = await request(app).delete("/collections/1");
    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao tentar deletar coleção inexistente", async () => {
    jest.spyOn(CollectionModel, "findByPk").mockResolvedValue(null);
    const res = await request(app).delete("/collections/999");
    expect(res.status).toBe(404);
  });
});
