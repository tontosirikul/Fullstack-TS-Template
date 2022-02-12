import express, { Request, Response } from "express";
import cors from "cors";
import user_routes from "./handlers/User";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response): void => {
  res.send("Home");
});

user_routes(app);

app.get("*", (_req: Request, res: Response): void => {
  res.send("No route");
});

if (process.env.ENV == "test") {
  app.listen((): void => {
    console.log(`✔ Generatedtest server started`);
  });
} else {
  app.listen(port, (): void => {
    console.log(`✔ dev server started at ${port}`);
  });
}

export default app;
