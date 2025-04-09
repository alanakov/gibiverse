import api from "@/services/api";

export async function getAllGenres(page: number, limit: number) {
  const { data } = await api.get(`/genres`, {
    params: { page, limit },
  });
  return data;
}
