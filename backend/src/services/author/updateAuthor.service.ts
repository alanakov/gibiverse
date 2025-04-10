import AuthorModel from "../../models/AuthorModel";

interface UpdateAuthorParams {
  id: string;
  name?: string;
  bio?: string;
  coverUrl?: string;
}

export const updateAuthorService = async ({
  id,
  name,
  bio,
  coverUrl,
}: UpdateAuthorParams) => {
  const author = await AuthorModel.findByPk(id);
  if (!author) return null;

  author.name = name || author.name;
  author.bio = bio || author.bio;
  author.coverUrl = coverUrl || author.coverUrl;

  await author.save();
  return author;
};
