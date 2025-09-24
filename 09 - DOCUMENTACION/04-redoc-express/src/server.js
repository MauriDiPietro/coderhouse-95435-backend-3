// npm i swagger-jsdoc redoc-express

import express from "express";
import redoc from "redoc-express";
import swaggerJSDoc from "swagger-jsdoc";
import productRouter from "./routes/product-router.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { info } from "./docs/info.js";

const app = express();

const specs = swaggerJSDoc(info);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

app.get('/docs-json', (req, res)=>{
    res.json(specs)
})

app.get('/docs', redoc({
    title: 'API Productos',
    specUrl: '/docs-json'
}))

app.use(errorHandler);

app.listen(8080, () => console.log("Server running on port 8080"));
