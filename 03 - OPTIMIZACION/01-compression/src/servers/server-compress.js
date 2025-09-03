import express from "express";
import compression from "express-compression";
import data from "../data.js";

const app = express();

app.use(compression({ 
    brotli: { enabled: true, zlib: {} },
    threshold: 1024, //--> 1KB
    level: 6, //-1 a 9
    filter: (req, res)=> {
        if(req.headers["x-no-compress"]){
            return false
        }
        return compression.filter(req, res)
    }
}));

app.get("/", (req, res) => {
  res.send(data);
});

export default app;
