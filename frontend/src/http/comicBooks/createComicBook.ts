import api from "@/services/api";
import { CreateComicBookSchemaType } from "@/schemas/comicBookSchema";

export async function createComicBook(data: CreateComicBookSchemaType) {
  const response = await api.post(`/comicbooks`, data);
  return response.data;
}
