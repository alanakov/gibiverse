export async function getAllAuthors(page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(
      `http://localhost:3000/authors?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch authors");

    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar autores:", err);
    throw err;
  }
}
