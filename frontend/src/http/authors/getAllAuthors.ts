import api from "@/services/api";

export async function getAllAuthors(page: number, limit: number) {
  const { data } = await api.get(`/authors`, {
    params: { page, limit },
  });
  return data;
}
