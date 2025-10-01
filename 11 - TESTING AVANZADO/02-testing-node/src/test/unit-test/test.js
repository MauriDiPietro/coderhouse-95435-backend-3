// node:test node:assert 

import assert from "node:assert";
import test, { before, describe } from "node:test";
import mongoose from "mongoose";
import { productDaoMongo } from "../../daos/mongodb/product-dao.js";
import { createProductMock } from "../../utils/mock.js";

describe("Tests unitarios DAO productos", () => {
  before(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/products");
    console.log("✅ Base de datos conectada");
    await mongoose.connection.collections["products"].drop();
    console.log("⏺ Coleccion products eliminada");
  });

  test("Deberia retornar la lista de productos", async () => {
    const response = await productDaoMongo.getAll();
    // console.log(response);
    assert.equal(Array.isArray(response), true);
    assert.equal(response.length, 0);
  });

  test("Deberia agregar un producto", async () => {
    const newProd = createProductMock();
    const response = await productDaoMongo.create(newProd);
    assert.ok(response._id);
    assert.equal(response.name, newProd.name);
    assert.equal(response.description, newProd.description);
    assert.equal(response.price, newProd.price);
    assert.equal(response.stock, newProd.stock);

    const prods = await productDaoMongo.getAll();
    assert.equal(prods.length, 1);
  });

  test("Deberia encontrar un producto por su id", async () => {
    const newProd = createProductMock();
    const prodCreated = await productDaoMongo.create(newProd);
    const prodId = prodCreated._id;
    const response = await productDaoMongo.getById(prodId);
    assert.ok(response._id);
    assert.equal(response._id.toString(), prodId.toString());
    assert.equal(response.name, newProd.name);
    assert.equal(response.description, newProd.description);
    assert.equal(response.price, newProd.price);
    assert.equal(response.stock, newProd.stock);
  });
});
