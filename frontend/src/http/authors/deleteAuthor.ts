import api from "@/services/api";

export async function deleteAuthor(id: number) {
  const response = await api.delete(`/authors/${id}`);
  return response.data;
}
