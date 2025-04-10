import api from "@/services/api";

export async function deleteGenre(id: number) {
  await api.delete(`/genres/${id}`);
}
