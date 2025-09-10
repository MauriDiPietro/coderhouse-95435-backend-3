// winget install k6 --source winget
// npm i k6 -D

import http from "k6/http";
import { check, sleep } from "k6";

export const config = {
  vus: 20,
  duration: '20s'
}

export default function () {

const res = http.get('http://localhost:8080/products')


check(res, {
  'status is 200': (r) => r.status === 200,
  'time < 200ms': (r) => r.timings.duration < 200
})

sleep(1)

}