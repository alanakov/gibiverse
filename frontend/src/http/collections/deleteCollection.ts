import api from "@/services/api";

export async function deleteCollection(id: number) {
  await api.delete(`/collections/${id}`);
}
