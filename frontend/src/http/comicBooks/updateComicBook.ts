import api from "@/services/api";

export async function updateComicBook(
  id: number,
  data: {
    title: string;
    description: string;
    authorId: number;
    genreId: number;
    coverUrl: string;
  },
) {
  const response = await api.put(`/comicbooks/${id}`, data);
  return response.data;
}
