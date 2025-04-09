import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import UsuarioModel from "../models/UserModel";

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de e-mail inválido" });
  }

  try {
    const usuario = await UsuarioModel.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaValidada = await usuario.validarSenha(senha);

    if (!senhaValidada) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = generateToken(usuario);

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,
      // usuario: {
      //     id: usuario.id,
      //     nome: usuario.nome,
      //     //                cpfUsuario: usuario.cpfUsuario,
      //     email: usuario.email
      // }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
