import { UpdateGenreSchemaType } from "@/schemas/genreSchema";
import api from "@/services/api";

export async function updateGenre(id: number, data: UpdateGenreSchemaType) {
  const response = await api.put(`/genres/${id}`, data);
  return response.data;
}
