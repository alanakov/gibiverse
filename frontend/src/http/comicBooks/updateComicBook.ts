import api from "@/services/api";

export async function updateComicBook(
  id: number,
  data: { title: string; description: string; authorId: number },
) {
  const response = await api.put(`/comic-books/${id}`, data);
  return response.data;
}
