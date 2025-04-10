import api from "@/services/api";

export async function getAllCollections(page: number, limit: number) {
  const { data } = await api.get(`/collections`, {
    params: { page, limit },
  });
  return data;
}
