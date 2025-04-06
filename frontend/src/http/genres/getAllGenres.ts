export async function getAllGenres(page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(
      `http://localhost:3000/genres?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch genres");

    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar gêneros:", err);
    throw err;
  }
}
