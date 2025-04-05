import api from "@/services/api";
import { ComicBook } from "@/types/comicBook";

export async function getComicBookById(id: number): Promise<ComicBook> {
  const response = await api.get(`/comic-books/${id}`);
  return response.data;
}
