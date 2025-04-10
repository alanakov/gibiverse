import api from "@/services/api";

export async function deleteAuthor(id: number) {
  await api.delete(`/authors/${id}`);
}
