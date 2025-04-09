import api from "@/services/api";

export async function getComicBookById(id: number) {
  const response = await api.get(`/comicbooks/${id}`);
  return response.data;
}
