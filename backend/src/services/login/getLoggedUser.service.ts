import UserModel from "../../models/UserModel";

export const getLoggedUserService = async (userId: string) => {
  const user = await UserModel.findByPk(userId, {
    attributes: ["id", "name", "email", "cpf"],
  });

  if (!user) throw new Error("NOT_FOUND");

  return user;
};
