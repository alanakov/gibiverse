export interface ComicBook {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  collectionId?: number;
  genreId: number;
  authorId: number;
}
