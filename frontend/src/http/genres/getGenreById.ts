import api from "@/services/api";
import { Genre } from "@/types/genre";

export async function getGenreById(id: number): Promise<Genre> {
  const response = await api.get(`/genres/${id}`);
  return response.data;
}
