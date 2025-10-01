// node

import test, { before, describe } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";
import { createProductMock } from "../utils/mock.js";

const API_URL = "http://localhost:8080/products";

describe("tests api productos", () => {
  /*
  before(async () => {
    await mongoose.connection.dropCollection("products");
    console.log("⏺ Coleccion products eliminada");
  });
   */

  test("[POST] /products", async () => {
    const body = createProductMock();
    const responsePromise = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await responsePromise.json();
    // console.log(response)
    const id = response.data._id;
    assert.ok(response);
    assert.strictEqual(responsePromise.status, 201);
    assert.strictEqual(response.status, 201);
    assert.ok(id);
    assert.strictEqual(response.data.name, body.name);
    assert.strictEqual(response.data.description, body.description);
    assert.strictEqual(response.data.price, body.price);
    assert.strictEqual(response.data.stock, body.stock);
  });

  test("[GET] /products", async () => {
    const responsePromise = await fetch(API_URL);
    const response = await responsePromise.json();
    assert.ok(response);
    assert.strictEqual(responsePromise.status, 200);
    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
    assert.ok(Array.isArray(response.data));
    assert.ok(response.data.length > 1);
  });

  test("[GET] /products/:id", async () => {
    const body = createProductMock();
    const responsePostPromise = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responsePost = await responsePostPromise.json();
    const id = responsePost.data._id;
    const responseGetPromise = await fetch(`${API_URL}/${id}`);
    const responseGet = await responseGetPromise.json();
    assert.ok(responseGet);
    assert.strictEqual(responseGetPromise.status, 200);
    assert.strictEqual(responseGet.status, 200);
    assert.ok(responseGet.data);
    assert.strictEqual(responseGet.data._id, id);
    assert.strictEqual(responseGet.data.name, body.name);
    assert.strictEqual(responseGet.data.description, body.description);
    assert.strictEqual(responseGet.data.price, body.price);
    assert.strictEqual(responseGet.data.stock, body.stock);

    const idFacker = faker.database.mongodbObjectId();
    const responseGetFakerPromise = await fetch(`${API_URL}/${idFacker}`);
    const responseGetFaker = await responseGetFakerPromise.json();
    assert.ok(responseGetFaker);
    assert.strictEqual(responseGetFakerPromise.status, 404);
    assert.strictEqual(responseGetFaker.status, 404);
    assert.strictEqual(responseGetFaker.message, "Product not found");
  });

  test("[PUT] /products/:id", async () => {
    const body = createProductMock();
    const responsePostPromise = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responsePost = await responsePostPromise.json();
    const id = responsePost.data._id;
    assert.ok(responsePost);
    assert.strictEqual(responsePostPromise.status, 201);
    assert.strictEqual(responsePost.status, 201);
    assert.ok(id);

    const bodyUpdate = createProductMock();
    const responseUpdatePromise = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyUpdate),
    });

    const responseUpdate = await responseUpdatePromise.json();
    assert.ok(responseUpdate);
    assert.strictEqual(responseUpdatePromise.status, 200);
    assert.strictEqual(responseUpdate.status, 200);
    assert.ok(responseUpdate.data);
    assert.strictEqual(responseUpdate.data._id, id);
    assert.strictEqual(responseUpdate.data.name, bodyUpdate.name);
    assert.strictEqual(responseUpdate.data.description, bodyUpdate.description);
    assert.strictEqual(responseUpdate.data.price, bodyUpdate.price);
    assert.strictEqual(responseUpdate.data.stock, bodyUpdate.stock);
  });

  test("[DELETE] /products/:id", async () => {
    const body = createProductMock();
    const responsePostPromise = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responsePost = await responsePostPromise.json();
    const id = responsePost.data._id;
    assert.ok(responsePost);
    assert.strictEqual(responsePostPromise.status, 201);
    assert.strictEqual(responsePost.status, 201);
    assert.ok(id);
    const responseDeletePromise = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const responseDelete = await responseDeletePromise.json();
    assert.ok(responseDelete);
    assert.strictEqual(responseDeletePromise.status, 200);
    assert.strictEqual(responseDelete.status, 200);
    assert.ok(responseDelete.data);
    assert.strictEqual(responseDelete.data._id, id);
    assert.strictEqual(responseDelete.data.name, body.name);
    assert.strictEqual(responseDelete.data.description, body.description);
    assert.strictEqual(responseDelete.data.price, body.price);
    assert.strictEqual(responseDelete.data.stock, body.stock);
    assert.strictEqual(responseDelete.data.active, false);
  });
});
