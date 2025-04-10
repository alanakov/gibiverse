import UserModel from "../../models/UserModel";

export const deleteUserByIdService = async (id: string) => {
  const user = await UserModel.findByPk(id);
  if (!user) return false;

  await user.destroy();
  return true;
};
