import express from "express";
import { initMongoDB } from "./db-connection.js";

const app = express();


app.get("/", (req, res) => {
  res.json({ message: "Server Express run" });
});

initMongoDB().then(()=>console.log("MongoDB connected")).catch(err=>console.log(err))

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

//docker run -p 5000:8080 -v ${PWD}:/app express-app
//docker run -p <puertoFisico>:<puertoDocker> -v ${PWD}:/<carpetaDocker> <nombreDeLaImagen>

//docker run --env-file .env -p 5000:8080 -v ${PWD}:/app server-express