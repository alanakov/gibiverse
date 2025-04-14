import express from "express";
import cors from "cors";
import userRouter from "./routes/UserRoutes";
import genreRouter from "./routes/GenreRoutes";
import comicBookRouter from "./routes/ComicBookRoutes";
import collectionRouter from "./routes/CollectionRoutes";
import authorRouter from "./routes/AuthorRoutes";
import sequelize from "./config/database";

const app = express();
const port = 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.get("/", (req, res) => {
  res.send("Initial route");
});

app.use(express.json());

app.use(cors());
app.use(userRouter);
app.use(genreRouter);
app.use(comicBookRouter);
app.use(collectionRouter);
app.use(authorRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
