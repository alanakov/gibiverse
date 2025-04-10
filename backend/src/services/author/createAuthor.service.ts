import AuthorModel from "../../models/AuthorModel";

interface AuthorInput {
  name: string;
  bio: string;
  coverUrl: string;
}

export const createAuthorService = async ({
  name,
  bio,
  coverUrl,
}: AuthorInput) => {
  if (!name || !bio || !coverUrl) {
    throw new Error("MISSING_FIELDS");
  }

  const author = await AuthorModel.create({ name, bio, coverUrl });
  return author;
};
