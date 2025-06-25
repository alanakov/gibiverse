// @ts-nocheck
import { createUser } from "../src/controllers/user/createUser.controller";
import UserModel from "../src/models/UserModel";
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));
jest.mock("cpf-cnpj-validator", () => ({
  cpf: { isValid: () => true },
}));
jest.mock("../src/utils/auth/jwt", () => ({
  generateToken: () => "fake-jwt-token",
}));
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

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Cadastro de Usuário", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    UserModel.findOne = jest.fn();
    UserModel.create = jest.fn();
    UserModel.validarNivelSenha = jest.fn().mockReturnValue({ valida: true, requisitos: {} });
  });

  it("deve cadastrar usuário com sucesso", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
    jest.spyOn(UserModel, "create").mockResolvedValue({ id: 1, email: "novo@exemplo.com" });
    const req = {
      body: {
        name: "Novo Usuário",
        email: "novo@exemplo.com",
        password: "SenhaForte123@",
        cpf: "12345678901",
      },
    };
    const res = makeRes();
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ email: "novo@exemplo.com" })
    );
  });

  it("deve retornar 400 se email já cadastrado", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValue({ id: 1, email: "existe@exemplo.com" });
    const req = {
      body: {
        name: "Usuário",
        email: "existe@exemplo.com",
        password: "SenhaForte123@",
        cpf: "12345678901",
      },
    };
    const res = makeRes();
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it("deve retornar 400 para senha fraca", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
    UserModel.validarNivelSenha = jest.fn().mockReturnValue({ valida: false, requisitos: {} });
    const req = {
      body: {
        name: "Usuário",
        email: "novo@exemplo.com",
        password: "123",
        cpf: "12345678901",
      },
    };
    const res = makeRes();
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve retornar 400 para CPF inválido", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
    const cpfValidator = require("cpf-cnpj-validator");
    cpfValidator.cpf.isValid = () => false;
    const req = {
      body: {
        name: "Usuário",
        email: "novo@exemplo.com",
        password: "SenhaForte123@",
        cpf: "123",
      },
    };
    const res = makeRes();
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
