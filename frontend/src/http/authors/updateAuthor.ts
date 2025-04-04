import api from "@/services/api";

export async function updateAuthor(
  id: number,
  data: { name: string; bio: string },
) {
  const response = await api.put(`/authors/${id}`, data);
  return response.data;
}
