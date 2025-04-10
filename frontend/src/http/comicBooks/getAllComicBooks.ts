import api from "@/services/api";

export async function getAllComicBooks(page: number, limit: number) {
  const { data } = await api.get(`/comicbooks`, {
    params: { page, limit },
  });
  return data;
}
