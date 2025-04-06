import api from "@/services/api";

export async function updateCollection(
  id: number,
  data: { name: string; description?: string; authorId?: number },
) {
  const response = await api.put(`/collections/${id}`, data);
  return response.data;
}
