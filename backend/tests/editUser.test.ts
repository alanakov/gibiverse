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
  hash: jest.fn(),
}));
jest.mock("cpf-cnpj-validator", () => ({
  cpf: { isValid: () => true },
}));

import { updateUser } from "../src/controllers/user/updateUser.controller";
import UserModel from "../src/models/UserModel";
import bcrypt from "bcrypt";

const mockUser = {
  id: 1,
  name: "Alana",
  email: "alana@example.com",
  password: "hashantigo",
  save: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  UserModel.findByPk = jest.fn();
  UserModel.validarNivelSenha = jest.fn().mockReturnValue({ valida: true, requisitos: {} });
  bcrypt.hash = jest.fn();
});

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Edição de Usuário", () => {
  it("deve atualizar usuário com sucesso", async () => {
    const user = { ...mockUser, save: jest.fn() };
    jest.spyOn(UserModel, "findByPk").mockResolvedValue(user);
    jest.spyOn(bcrypt, "hash").mockResolvedValue("novohash");
    const req = {
      params: { id: "1" },
      user: { id: 1 },
      body: { name: "Alana Atualizada", email: "alana.nova@example.com", password: "NovaSenhaForte123@" },
    };
    const res = makeRes();
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Alana Atualizada", email: "alana.nova@example.com" })
    );
  });

  it("deve retornar 401 se usuário não está autenticado", async () => {
    jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUser);
    const req = { params: { id: "2" }, body: {}, user: undefined };
    const res = makeRes();
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("deve retornar 400 para CPF inválido", async () => {
    jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUser);
    const cpfValidator = require("cpf-cnpj-validator");
    cpfValidator.cpf.isValid = () => false;
    const req = { params: { id: "1" }, user: { id: 1 }, body: { cpf: "123" } };
    const res = makeRes();
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve retornar 400 para senha fraca", async () => {
    jest.spyOn(UserModel, "findByPk").mockResolvedValue(mockUser);
    UserModel.validarNivelSenha = jest.fn().mockReturnValue({ valida: false, requisitos: {} });
    const req = { params: { id: "1" }, user: { id: 1 }, body: { password: "123" } };
    const res = makeRes();
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
