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
jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));
jest.mock("../src/utils/auth/jwt", () => ({
  generateToken: () => "fake-jwt-token",
}));

import request from "supertest";
import app from "../src/app";
import UserModel from "../src/models/UserModel";
import bcrypt from "bcrypt";

const mockUser = {
  id: 1,
  email: "test@example.com",
  password: "hashedpassword",
  name: "Test User",
};

beforeEach(() => {
  jest.clearAllMocks();
  UserModel.findOne = jest.fn();
});

describe("Autenticação - Login", () => {
  it("deve autenticar com sucesso com credenciais válidas", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValue({ ...mockUser, validarSenha: jest.fn().mockResolvedValue(true) });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const res = await request(app)
      .post("/login")
      .send({ email: mockUser.email, password: "senha" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: mockUser.email } });
  });

  it("deve retornar 401 para senha incorreta", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValue({ ...mockUser, validarSenha: jest.fn().mockResolvedValue(false) });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const res = await request(app)
      .post("/login")
      .send({ email: mockUser.email, password: "errada" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Credenciais inválidas");
  });

  it("deve retornar 404 para usuário inexistente", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValue(null);

    const res = await request(app)
      .post("/login")
      .send({ email: "naoexiste@example.com", password: "senha" });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuário não encontrado");
  });
});
