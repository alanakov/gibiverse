import api from "@/services/api";
import { ComicBook } from "@/types/comicBook";

export async function getComicBookById(id: number): Promise<ComicBook> {
  const response = await api.get(`/comicbooks/${id}`);
  return response.data;
}
