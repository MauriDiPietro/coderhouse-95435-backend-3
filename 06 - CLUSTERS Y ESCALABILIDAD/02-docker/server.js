import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Server Express run" });
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

//docker run -p 5000:8080 -v ${PWD}:/app express-app
//docker run -p <puertoFisico>:<puertoDocker> -v ${PWD}:/<carpetaDocker> <nombreDeLaImagen>