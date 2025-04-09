import api from "@/services/api";

export async function getGenreById(id: number) {
  const response = await api.get(`/genres/${id}`);
  return response.data;
}
