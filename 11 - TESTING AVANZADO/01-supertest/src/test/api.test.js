// jest + supertest

import app from "../server.js";
import request from "supertest";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";
import { createProductMock } from "../utils/mock.js";

describe("tests api productos", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/products");
    console.log("✅ Base de datos conectada");
    await mongoose.connection.collections["products"].drop();
    console.log("⏺ Coleccion products eliminada");
  });

  test("[POST] /products", async () => {
    const body = createProductMock();
    const response = await request(app).post("/products").send(body);
    // console.log(response.body)
    const id = response.body.data._id;
    const name = response.body.data.name;
    const description = response.body.data.description;
    const price = response.body.data.price;
    const stock = response.body.data.stock;

    expect(response.status).toBe(201);
    expect(id).toBeDefined();
    expect(name).toBe(body.name);
    expect(description).toBe(body.description);
    expect(price).toBe(body.price);
    expect(stock).toBe(body.stock);
  });

  test("[GET] /products", async () => {
    const response = await request(app).get("/products");
    const data = response.body.data;
    expect(response.status).toBe(200);
    expect(data.length).toBe(1);
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(1);
    expect(data[0].name).toBeDefined();
    expect(data[0].description).toBeDefined();
    expect(data[0].price).toBeDefined();
    expect(data[0].stock).toBeDefined();
  });

  test("[GET] /products/:id", async () => {
    const body = createProductMock();
    const response = await request(app).post("/products").send(body);
    const id = response.body.data._id;
    expect(response.status).toBe(201);
    expect(id).toBeDefined();
    const responseGetById = await request(app).get(`/products/${id}`);
    const data = responseGetById.body.data;
    expect(responseGetById.status).toBe(200);
    expect(data._id).toBe(id);
    expect(data.name).toBe(body.name);
    expect(data.description).toBe(body.description);
    expect(data.price).toBe(body.price);
    expect(data.stock).toBe(body.stock);

    const idFaker = faker.database.mongodbObjectId();
    const responseGetByIdFaker = await request(app).get(`/products/${idFaker}`);
    expect(responseGetByIdFaker.status).toBe(404);
    expect(responseGetByIdFaker.body.data).toBeUndefined();
    expect(responseGetByIdFaker.body.message).toBe("Product not found");
    expect(responseGetByIdFaker.body.status).toBe(404);
  });

  test('[PUT] /products/:id', async () => {
    const body = createProductMock();
    const response = await request(app).post("/products").send(body);
    const id = response.body.data._id;
    expect(response.status).toBe(201);
    expect(id).toBeDefined();
    
    const bodyUpdate = createProductMock();
    const responseUpdate = await request(app).put(`/products/${id}`).send(bodyUpdate);
    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body.data._id).toBe(id);
    expect(responseUpdate.body.data.name).toBe(bodyUpdate.name);
    expect(responseUpdate.body.data.description).toBe(bodyUpdate.description);
    expect(responseUpdate.body.data.price).toBe(bodyUpdate.price);
    expect(responseUpdate.body.data.stock).toBe(bodyUpdate.stock);
  })

  test('[DELETE] /products/:id', async () => {
    const body = createProductMock();
    const response = await request(app).post("/products").send(body);
    const id = response.body.data._id;
    expect(response.status).toBe(201);
    expect(id).toBeDefined();
    
    const responseDelete = await request(app).delete(`/products/${id}`);
    expect(responseDelete.status).toBe(200);    
    expect(responseDelete.body.data._id).toBe(id);
  })
});
