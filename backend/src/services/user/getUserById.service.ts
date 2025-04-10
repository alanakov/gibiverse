import UserModel from "../../models/UserModel";

export const getUserByIdService = async (id: string) => {
  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new Error("NOT_FOUND");
  }

  return user;
};
