import express from "express";
import userRouter from "./routes/UserRoutes";
import genreRouter from "./routes/GenreRoutes";
import comicBookRouter from "./routes/ComicBookRoutes";
import collectionRouter from "./routes/CollectionRoutes";
import authorRouter from "./routes/AuthorRoutes";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Initial route");
});

// Configuração para ler JSON no corpo da requisição
app.use(express.json());

// Importando e usando as rotas
app.use(userRouter);
app.use(genreRouter);
app.use(comicBookRouter);
app.use(collectionRouter);
app.use(authorRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
