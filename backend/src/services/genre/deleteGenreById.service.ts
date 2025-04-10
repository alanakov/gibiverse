import GenreModel from "../../models/GenreModel";

export const deleteGenreByIdService = async (id: string) => {
  const genre = await GenreModel.findByPk(id);
  if (!genre) return false;

  await genre.destroy();
  return true;
};
