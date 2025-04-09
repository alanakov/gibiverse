import api from "@/services/api";

export async function deleteComicBook(id: number) {
  await api.delete(`/comicbooks/${id}`);
}
