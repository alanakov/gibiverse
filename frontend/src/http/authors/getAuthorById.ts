import api from "@/services/api";

export async function getAuthorById(id: number) {
  const response = await api.get(`/authors/${id}`);
  return response.data;
}
