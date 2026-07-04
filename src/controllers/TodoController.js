import TodoModel from '../models/TodoModel.js';
import TodoView from '../views/TodoView.js';

// Controlador que conecta modelo y vista
export default class TodoController {
  constructor() {
    const app = document.getElementById('app');
    this.model = new TodoModel();
    this.view = new TodoView(app);

    this.view.bindAdd(this.handleAdd.bind(this));
    this.view.bindToggle(this.handleToggleOrRemove.bind(this));

    this._render();
  }

  _render() {
    this.view.render(this.model.getAll());
  }

  // Handler para agregar tarea (sincrónico aquí, puede ser async si fuera necesario)
  /**
   * Maneja la adición de una nueva tarea al modelo y actualiza la vista.
   * @param {string} text El texto de la nueva tarea.
   * @returns {void}
   */
  handleAdd(text) {
    this.model.addTodo(text);
    this._render();
  }

  // Handler combinado para toggle y remove
  handleToggleOrRemove(id, opts = {}) {
    if (opts.remove) {
      this.model.removeTodo(id);
    } else {
      this.model.toggleTodo(id);
    }
    this._render();
  }
}

// Inicialización rápida cuando se importa desde index.html
new TodoController();
