import fs from "fs";

export class Tareas {
  constructor() {
    this.tareas = [];
  }

  list() {
    return this.tareas;
  }

  add(title) {
    let todo = {
      title,
      complete: false,
    };
    this.tareas.push(todo);
    return todo;
  }

  complete(title) {
    if (!this.tareas.length) throw new Error("No existen tareas");
    let todoFound = false;
    this.tareas.forEach((todo) => {
      if (todo.title === title) {
        todo.complete = true;
        todoFound = true;
        return;
      }
    });

    if (!todoFound) throw new Error("No existe la tarea");
  }

  saveToFile() {
    return fs.writeFileSync("tareas.json", JSON.stringify(this.tareas));
  }
}
