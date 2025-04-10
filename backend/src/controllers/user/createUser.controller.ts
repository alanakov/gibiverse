import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = await createUserService(req.body);
    return res.status(201).json(userData);
  } catch (error: any) {
    return handleCreateUserError(res, error);
  }
};

const handleCreateUserError = (res: Response, error: any) => {
  if (error instanceof Error) {
    const statusMap: Record<string, number> = {
      MISSING_FIELDS: 400,
      INVALID_CPF: 400,
      INVALID_EMAIL: 400,
      WEAK_PASSWORD: 400,
      USER_ALREADY_EXISTS: 409,
    };
    const status = statusMap[error.message] || 500;

    const response: Record<string, any> = {
      error: getErrorMessage(error.message),
    };

    if (error.message === "WEAK_PASSWORD" && "details" in error) {
      response.details = error.details;
    }

    return res.status(status).json(response);
  }

  console.error("Erro no registro:", error);
  return res.status(500).json({ error: "Erro interno no servidor" });
};

const getErrorMessage = (code: string): string => {
  const messages: Record<string, string> = {
    MISSING_FIELDS: "Todos os campos são obrigatórios",
    INVALID_CPF: "CPF inválido",
    INVALID_EMAIL: "Email inválido",
    WEAK_PASSWORD: "Senha muito fraca",
    USER_ALREADY_EXISTS: "Email ou CPF já cadastrado",
  };
  return messages[code] || "Erro interno no servidor";
};
