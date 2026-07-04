// Modelo de datos para la aplicación Todo
// Una clase por archivo según las instrucciones del proyecto

/**
 * Representa el modelo de tareas.
 * Guarda una lista simple en memoria (puedes reemplazar por localStorage/Backend).
 */
export default class TodoModel {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  addTodo(text) {
    const todo = { id: this.nextId++, text, done: false };
    this.todos.push(todo);

    // Mensajes por consola para depuración / seguimiento
    console.log('Tarea añadida:', todo);
    console.log(`Total de tareas: ${this.todos.length}`);

    return todo;
  }

  /** Elimina una tarea por id */
  removeTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  /** Alterna el estado `done` de una tarea */
  toggleTodo(id) {
    const t = this.todos.find((x) => x.id === id);
    if (t) t.done = !t.done;
    return t;
  }

  /** Devuelve todas las tareas */
  getAll() {
    return [...this.todos];
  }
}
