import express, { Request, Response } from "express";
import { initMongoDB } from "./config/db-connection";
import { errorHandler } from "./middlewares/error-handler";
import productRouter from './routes/product-router'

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server ok");
});

initMongoDB()
  .then(() => console.log("conectado a mongodb"))
  .catch((error) => console.log(error));

app.use('/api/products', productRouter);

// app.use((req, res, next)=>errorHandler(req, res, next))

app.listen(8080, () => console.log("Server running on port 8080"));
