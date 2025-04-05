import api from "@/services/api";
import { Author } from "@/types/author";

export async function getAuthorById(id: number): Promise<Author> {
  const response = await api.get(`/authors/${id}`);
  return response.data;
}
