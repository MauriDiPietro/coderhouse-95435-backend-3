import express from "express";
import cluster from "cluster";
import { cpus } from "os";
import { calculo } from "./calculo.js";

const numCPUS = cpus().length;

if (cluster.isPrimary) {
  console.log(numCPUS);
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();

  let visitas = 0;

  app.get("/", (req, res) => {
    visitas++;
    res.send(`Cantidad de visitas: ${visitas}, pid: ${process.pid}`);
  });

  app.get("/calculo", (req, res) => {
    const resultado = calculo();
    res.send(`Resultado del cálculo: ${resultado}, pid: ${process.pid}`);
  });

  app.get("/dead", (req, res) => {
    res.json({ message: "se frenó un proceso hijo", pid: process.pid });
    process.exit(0);
  });

  app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080", process.pid);
  });
}
