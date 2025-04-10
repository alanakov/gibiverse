import api from "@/services/api";
import { CreateAuthorSchemaType } from "@/schemas/authorSchema";

export async function updateAuthor(id: number, data: CreateAuthorSchemaType) {
  const response = await api.put(`/authors/${id}`, data);
  return response.data;
}
