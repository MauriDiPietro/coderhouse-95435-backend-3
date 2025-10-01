// npm i swagger-jsdoc swagger-ui-express

import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import productRouter from "./routes/product-router.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { info } from "./docs/swagger.js";
import { ConnectMongoDB } from "./config/connections/mongo-db.js";

const app = express();

const specs = swaggerJSDoc(info);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

ConnectMongoDB.getInstance();

app.use(errorHandler);

app.listen(8080, () => console.log("Server running on port 8080"));

export default app;
