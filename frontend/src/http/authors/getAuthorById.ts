import { Author } from "@/pages/auth/Authors/types";
import api from "@/services/api";

export async function getAuthorById(id: number): Promise<Author> {
  const response = await api.get(`/authors/${id}`);
  return response.data;
}
