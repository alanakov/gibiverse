import api from "@/services/api";

export async function deleteGenre(id: number) {
  const response = await api.delete(`/genres/${id}`);
  return response.data;
}
