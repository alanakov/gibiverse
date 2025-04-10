import UserModel from "../../models/UserModel";

interface UpdateUserParams {
  id: string;
  name: string;
  email: string;
  cpf?: string;
}

export const updateUserService = async ({
  id,
  name,
  email,
  cpf,
}: UpdateUserParams) => {
  if (!name || !email) {
    throw new Error("MISSING_FIELDS");
  }

  const user = await UserModel.findByPk(id);

  if (!user) {
    throw new Error("NOT_FOUND");
  }

  user.name = name;
  user.email = email;
  if (cpf) user.cpf = cpf;

  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    cpf: user.cpf,
  };
};
