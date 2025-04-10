import api from "@/services/api";
import { UpdateGenreSchemaType } from "@/schemas/genreSchema";

export async function updateGenre(id: number, data: UpdateGenreSchemaType) {
  const response = await api.put(`/genres/${id}`, data);
  return response.data;
}
