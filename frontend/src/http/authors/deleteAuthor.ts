export async function deleteAuthor(id: number) {
  const res = await fetch(`http://localhost:3000/authors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar autor");
  }
}
