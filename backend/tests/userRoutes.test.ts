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
import UserModel from "../src/models/UserModel";

const mockUsers = [
  { id: 1, name: "Usuário 1", email: "u1@exemplo.com" },
  { id: 2, name: "Usuário 2", email: "u2@exemplo.com" },
];

beforeEach(() => {
  jest.clearAllMocks();
  UserModel.findAll = jest.fn();
  UserModel.findByPk = jest.fn();
  UserModel.destroy = jest.fn();
});

describe("Rotas de Usuário", () => {
  it("deve listar todos os usuários", async () => {
    const { paginate } = require("../src/utils/paginate");
    paginate.mockResolvedValue({ data: mockUsers });
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockUsers);
  });

  it("deve buscar usuário por id", async () => {
    jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUsers[0]);
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers[0]);
  });

  it("deve retornar 404 ao buscar usuário inexistente", async () => {
    jest.spyOn(UserModel, "findByPk").mockResolvedValue(null);
    const res = await request(app).get("/users/999");
    expect(res.status).toBe(404);
  });

  it("deve deletar usuário", async () => {
    const mockUser = { destroy: jest.fn() };
    jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUser);
    jest.spyOn(mockUser, "destroy").mockResolvedValue();
    const res = await request(app).delete("/users/1");
    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao tentar deletar usuário inexistente", async () => {
    jest.spyOn(UserModel, "destroy").mockResolvedValue(0);
    const res = await request(app).delete("/users/999");
    expect(res.status).toBe(404);
  });
});
