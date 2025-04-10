import AuthorModel from "../../models/AuthorModel";

export const deleteAuthorByIdService = async (id: string) => {
  const author = await AuthorModel.findByPk(id);
  if (!author) return false;

  await author.destroy();
  return true;
};
