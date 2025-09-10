//npm i -D autocannon

import autocannon from "autocannon";
import fs from "fs";

const run = autocannon({
  url: "http://localhost:8080/products",
  connections: 50,
  duration: 20,
});

autocannon.track(run);
run.on("done", (result) => {
  fs.writeFileSync("./src/performance/reporte2.json", JSON.stringify(result, null, 2));
  console.log("reporte guardado en reporte2.json");
});
