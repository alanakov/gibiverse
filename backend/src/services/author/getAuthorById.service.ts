import AuthorModel from "../../models/AuthorModel";

export const getAuthorByIdService = async (id: string) => {
  const author = await AuthorModel.findByPk(id);

  if (!author) {
    throw new Error("NOT_FOUND");
  }

  return author;
};
