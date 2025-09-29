import fs from "fs";
import { Tareas } from "../utils/tareas.js";
import { assert, expect } from "chai";

describe("Tests unitarios de tareas", () => {

  before(()=>{
    console.log("\n******************Antes de todos los tests");
  })

  after(()=>{
    console.log("Después de todos los tests");
  })

  it("Debería crear el contenedor de tareas vacío", () => {
    // Preparación
    const tareas = new Tareas();

    // Ejecución
    const listado = tareas.list();

    // Aserciones - Afirmaciones
    // expect(listado).to.be.an("array");
    // expect(listado).to.have.lengthOf(0);

    assert.isArray(listado);
    assert.lengthOf(listado, 0);
  });

  it("Debería crear una tarea", () => {
    const tareas = new Tareas();

    const todo = tareas.add("Salir a caminar");

    expect(todo).to.have.property("title", "Salir a caminar");
    assert.strictEqual(todo.complete, false);
    assert.equal(tareas.list().length, 1);
    assert.deepStrictEqual(tareas.list(), [
      { title: "Salir a caminar", complete: false },
    ]);

    tareas.add("Salir a correr");
    assert.equal(tareas.list().length, 2);
  });

  it("Debería marcar una tarea como completada", () => {
    const tareas = new Tareas();

    tareas.add("Salir a caminar");
    tareas.add("Salir a correr");

    tareas.complete("Salir a caminar");

    assert.equal(tareas.list().length, 2);

    assert.deepStrictEqual(tareas.list(), [
      { title: "Salir a caminar", complete: true },
      { title: "Salir a correr", complete: false },
    ]);
  });

  it("Debería dar un error cuando la tarea a completar no existe", () => {
    const tareas = new Tareas();

    tareas.add("Salir a caminar");

    const errorEsperado = "No existe la tarea";

    const funcionQueFalla = () => tareas.complete("Tarea que no existe");

    assert.throws(funcionQueFalla, Error, errorEsperado);
    // expect(funcionQueFalla).to.throw(errorEsperado);
  });

  it("Deberia dar un error cuando no hay tareas y se quiere completar una", () => {
    const tareas = new Tareas();

    const errorEsperado = "No existen tareas";

    const funcionQueFalla = () => tareas.complete("Tarea que no existe");
    assert.throws(funcionQueFalla, Error, errorEsperado);
  });

  it("Debería guardar las tareas en un archivo", () => {
    const tareas = new Tareas();

    tareas.add("Salir a caminar");
    tareas.add("Salir a correr");

    tareas.saveToFile();

    assert.isTrue(fs.existsSync("tareas.json"));
    const contenido = fs.readFileSync("tareas.json", "utf-8");
    const tareasEnArchivo = JSON.parse(contenido);
    assert.deepStrictEqual(tareasEnArchivo, tareas.list());
  })
});
