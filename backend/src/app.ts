import express from "express";
import cors from "cors";
import userRouter from "./routes/UserRoutes";
import genreRouter from "./routes/GenreRoutes";
import comicBookRouter from "./routes/ComicBookRoutes";
import collectionRouter from "./routes/CollectionRoutes";
import authorRouter from "./routes/AuthorRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(genreRouter);
app.use(comicBookRouter);
app.use(collectionRouter);
app.use(authorRouter);

export default app; 