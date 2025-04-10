import GenreModel from "../../models/GenreModel";

interface UpdateGenreParams {
  id: string;
  name?: string;
}

export const updateGenreService = async ({ id, name }: UpdateGenreParams) => {
  const genre = await GenreModel.findByPk(id);
  if (!genre) return null;

  genre.name = name || genre.name;
  await genre.save();

  return genre;
};
