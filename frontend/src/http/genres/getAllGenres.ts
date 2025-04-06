import api from "@/services/api";

export async function getAllGenres(page: number, limit: number) {
  const response = await api.get(`/genres?page=${page}&limit=${limit}`);
  return response.data;
}
