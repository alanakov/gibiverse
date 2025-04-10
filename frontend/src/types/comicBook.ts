export interface ComicBook {
  id: number;
  title: string;
  description: string;
  authorId: number;
  genreId: number;
  coverUrl: string;
  collectionId?: number | null;
}
