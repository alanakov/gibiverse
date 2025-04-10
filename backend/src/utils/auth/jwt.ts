import jwt from "jsonwebtoken";

const SECRET_KEY = "sua_chave_secreta";

export const generateToken = (user: { id: number; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "2d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
