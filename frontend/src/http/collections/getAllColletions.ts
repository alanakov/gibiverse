export async function getAllCollections(page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(
      `http://localhost:3000/collections?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch collections");

    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar coleções:", err);
    throw err;
  }
}
