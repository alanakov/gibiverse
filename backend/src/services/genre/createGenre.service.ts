import GenreModel from "../../models/GenreModel";

interface GenreInput {
  name: string;
}

export const createGenreService = async ({ name }: GenreInput) => {
  if (!name) {
    throw new Error("MISSING_FIELDS");
  }

  const genre = await GenreModel.create({ name });
  return genre;
};
