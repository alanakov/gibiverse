import { CreateGenreSchemaType } from "@/schemas/genreSchema";
import api from "@/services/api";

export async function createGenre(data: CreateGenreSchemaType) {
  const response = await api.post("/genres", data);
  return response.data;
}
