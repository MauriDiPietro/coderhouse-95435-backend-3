// mocha + chai(assert)

import { expect } from "chai";
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
    expect(response).to.be.an("array");
    expect(response.length).to.be.equal(0);
    expect(response).to.have.lengthOf(0);
  });

  it("Deberia agregar un producto", async () => {
    const newProd = {
      name: "Producto de prueba",
      description: "Descripcion del producto de prueba",
      price: 200,
      stock: 50,
    };

    const response = await productDaoMongo.create(newProd);
    expect(response).to.be.an("object");
    expect(response).to.have.property("_id");
    expect(response).to.have.property("name").to.be.equal("Producto de prueba");
    expect(response)
      .to.have.property("description")
      .to.be.equal("Descripcion del producto de prueba");
    expect(response).to.have.property("price").to.be.equal(200);
    expect(response).to.have.property("stock").to.be.equal(50);

    const prods = await productDaoMongo.getAll();
    expect(prods).to.have.lengthOf(1);
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
    expect(response).to.be.an("object");
    expect(response).to.have.property("_id");
    expect(response._id.toString()).to.be.equal(prodId.toString());
    expect(response)
      .to.have.property("name")
      .to.be.equal("Producto de prueba 2");
    expect(response)
      .to.have.property("description")
      .to.be.equal("Descripcion del producto de prueba 2");
    expect(response).to.have.property("price").to.be.equal(200);
    expect(response).to.have.property("stock").to.be.equal(50);
  });
});
