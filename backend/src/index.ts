import express from "express";
import userRoutes from './routes/userRoutes';
import genreRoutes from './routes/genreRoutes';
import comicBookRoutes from './routes/comicBookRoutes';
import collectionRoutes from './routes/collectionRoutes';
import authorRoutes from './routes/authorRoutes';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Initial route");
});

// Configuração para ler JSON no corpo da requisição
app.use(express.json());

// Importando e usando as rotas
app.use('/api', userRoutes);
app.use('/api', genreRoutes);
app.use('/api', comicBookRoutes);
app.use('/api', collectionRoutes);
app.use('/api', authorRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
