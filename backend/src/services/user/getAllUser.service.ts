import UserModel from "../../models/UserModel";
import { paginate } from "../../utils/paginate";

interface GetAllUsersParams {
  page: number;
  limit: number;
}

export const getAllUsersService = async ({
  page,
  limit,
}: GetAllUsersParams) => {
  const result = await paginate({
    model: UserModel,
    page,
    limit,
    order: [["name", "ASC"]],
  });

  result.data = result.data.map((user: any) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return result;
};
