import { Request, Response } from "express"; //OK
import UserModel from "../src/models/UserModel";
import { loginUser } from "../src/controllers/login/loginUser.controller";
import { generateToken } from "../src/utils/auth/jwt";

jest.mock("../src/models/UserModel");
jest.mock("../src/utils/auth/jwt");

describe("Testes de autenticação do usuário", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Erro 400 porque não encontrou o email ou senha", async () => {
    await loginUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email e senha são obrigatórios",
    });
  });

  test("Erro 400 porque o formato do email é inválido", async () => {
    req.body = { email: "emailinvalido", password: "12345" };
    await loginUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Formato de e-mail inválido",
    });
  });

  test("Erro 404 porque o usuário não foi encontrado", async () => {
    req.body = { email: "alana@gmail.com", password: "12345" };
    (UserModel.findOne as jest.Mock).mockResolvedValue(null); // Simula que o usuário não foi encontrado

    await loginUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado" });
  });

  test("Erro 401 porque a senha é inválida", async () => {
    req.body = { email: "alana@gmail.com", password: "12345" };
    const mockUser = {
      validarSenha: jest.fn().mockResolvedValue(false), // Simula que a senha é inválida
    };

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    await loginUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Credenciais inválidas" });
  });

  test("Login realizado com sucesso", async () => {
    req.body = { email: "vanderleia@gmail.com", password: "12345" };
    const mockUser = {
      id: 1,
      name: "Alana",
      cpf: "12345678901",
      email: "alana@gmail.com",
      validarSenha: jest.fn().mockResolvedValue(true), // Simula que a senha é válida
    };

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue("token123"); // Simula a geração de um token

    await loginUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login realizado com sucesso",
      token: "token123",
      user: {
        id: mockUser.id,
        name: mockUser.name,
        cpf: mockUser.cpf,
        email: mockUser.email,
      },
    });
  });
});
