import { Tareas } from "./utils/tareas.js";

const tareas = new Tareas();

tareas.add('Salir a caminar');
tareas.add('Salir a correr');

tareas.complete('Salir a caminar');

tareas.saveToFile();

console.log(tareas.list());