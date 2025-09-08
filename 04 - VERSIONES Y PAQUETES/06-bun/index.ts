import mongoose from "mongoose";
import { ProductModel } from "./models/produc-model";

mongoose
  .connect("mongodb://127.0.0.1:27017/coderhouse")
  .then(() => console.log("conectado a mongo"))
  .catch((err) => console.log(err));

const server = Bun.serve({
    port: 3000,
    fetch: async (req: Request, _server: Bun.Server) => {
        const url = new URL(req.url);

        if (url.pathname === '/products' && req.method === 'GET') {
            const products = await ProductModel.find();
            return new Response(JSON.stringify(products), {
                headers: {
                    'content-type': 'application/json'
                }
            });
        }

        return new Response("Not Found", { status: 404 });
    }
});

console.log(`Listening on http://localhost:${server.port}`)