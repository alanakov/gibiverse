import api from "@/services/api";
import { CreateAuthorSchemaType } from "@/schemas/authorSchema";

export async function createAuthor(data: CreateAuthorSchemaType) {
  const response = await api.post(`/authors`, data);
  return response.data;
}
