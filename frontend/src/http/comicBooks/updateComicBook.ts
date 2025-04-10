import api from "@/services/api";
import { UpdateComicBookSchemaType } from "@/schemas/comicBookSchema";

export async function updateComicBook(
  id: number,
  data: UpdateComicBookSchemaType,
) {
  const response = await api.put(`/comicbooks/${id}`, data);
  return response.data;
}
