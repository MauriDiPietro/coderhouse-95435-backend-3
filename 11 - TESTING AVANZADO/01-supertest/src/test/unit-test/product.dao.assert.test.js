// mocha + assert(node)

import assert from "node:assert";
import mongoose from "mongoose";
import { productDaoMongo } from "../../daos/mongodb/product-dao.js";

describe("Tests unitarios DAO productos", () => {
  before(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/products");
    console.log("✅ Base de datos conectada");
    await mongoose.connection.collections["products"].drop();
    console.log("⏺ Coleccion products eliminada");
  });

  it("Deberia retornar la lista de productos", async () => {
    const response = await productDaoMongo.getAll();
    // console.log(response);
    assert.equal(Array.isArray(response), true);
    assert.equal(response.length, 0);
  });

  it("Deberia agregar un producto", async () => {
    const newProd = {
      name: "Producto de prueba",
      description: "Descripcion del producto de prueba",
      price: 200,
      stock: 50,
    };

    const response = await productDaoMongo.create(newProd);
    assert.ok(response._id);
    assert.equal(response.name, "Producto de prueba");
    assert.equal(response.description, "Descripcion del producto de prueba");
    assert.equal(response.price, 200);
    assert.equal(response.stock, 50);

    const prods = await productDaoMongo.getAll();
    assert.equal(prods.length, 1);
  });

  it("Deberia encontrar un producto por su id", async () => {
    const newProd = {
      name: "Producto de prueba 2",
      description: "Descripcion del producto de prueba 2",
      price: 200,
      stock: 50,
    };

    const prodCreated = await productDaoMongo.create(newProd);
    const prodId = prodCreated._id;
    const response = await productDaoMongo.getById(prodId);
    assert.ok(response._id);
    assert.equal(response._id.toString(), prodId.toString());
    assert.equal(response.name, "Producto de prueba 2");
    assert.equal(response.description, "Descripcion del producto de prueba 2");
    assert.equal(response.price, 200);
    assert.equal(response.stock, 50);
  });
});
