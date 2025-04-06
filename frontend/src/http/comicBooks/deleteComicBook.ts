export async function deleteComicBook(id: number) {
  const res = await fetch(`http://localhost:3000/comicbooks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar gibi");
  }
}
