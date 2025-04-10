import GenreModel from "../../models/GenreModel";

export const getGenreByIdService = async (id: string) => {
  const genre = await GenreModel.findByPk(id);

  if (!genre) {
    throw new Error("NOT_FOUND");
  }

  return genre;
};
