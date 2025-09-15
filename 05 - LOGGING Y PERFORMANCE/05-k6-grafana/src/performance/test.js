// winget install k6 --source winget
// npm i k6 -D
//https://docs.influxdata.com/influxdb3/core/install/#download-and-install-the-latest-build-artifacts
//influxd
//influx
//CREATE DATABASE k6;
// SHOW DATABASES;
//https://grafana.com/grafana/download?platform=windows
//--> dashboard k6: 2587
//k6 run .\src\performance\test.js --out influxdb=http://localhost:8086/k6

import http from "k6/http";
import { check, sleep } from "k6";

export const config = {
  vus: 20,
  duration: "20s",
};

export default function () {
  const res = http.get("http://localhost:8080/products");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "time < 200ms": (r) => r.timings.duration < 200,
    
  });

  sleep(1);
}
