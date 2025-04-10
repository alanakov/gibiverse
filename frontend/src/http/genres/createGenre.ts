import api from "@/services/api";
import { CreateGenreSchemaType } from "@/schemas/genreSchema";

export async function createGenre(data: CreateGenreSchemaType) {
  const response = await api.post(`/genres`, data);
  return response.data;
}
