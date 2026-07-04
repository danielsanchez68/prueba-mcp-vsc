// Vista para la aplicación Todo
// Mantener las responsabilidades de render y binding de eventos

export default class TodoView {
  constructor(rootElement) {
    this.root = rootElement;
    this.form = this.root.querySelector('#new-todo-form');
    this.input = this.root.querySelector('#new-todo-input');
    this.list = this.root.querySelector('#todo-list');
  }

  /** Renderiza la lista de tareas (simple y determinista) */
  render(todos) {
    this.list.innerHTML = '';
    todos.forEach((t) => {
      const li = document.createElement('li');
      li.dataset.id = t.id;
      li.className = t.done ? 'done' : '';
      li.innerHTML = `
        <label>
          <input type="checkbox" ${t.done ? 'checked' : ''} />
          <span class="text">${this._escape(t.text)}</span>
        </label>
        <button class="remove">Eliminar</button>
      `;
      this.list.appendChild(li);
    });
  }

  /** Evita inyección simple */
  _escape(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /**
   * Asocia el evento de envío del formulario.
   * @param {Function} handler Función que recibe el valor ingresado y recortado.
   * @returns {void}
   */
  bindAdd(handler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = this.input.value.trim();
      if (!value) return;
      handler(value);
      this.input.value = '';
    });
  }

  /**
   * Asocia los eventos de cambio y de eliminación en la lista de tareas.
   * @param {Function} handler Función que recibe el id de la tarea y opcionalmente un objeto de acción.
   * @returns {void}
   */
  bindToggle(handler) {
    this.list.addEventListener('change', (e) => {
      const li = e.target.closest('li');
      if (!li) return;
      const id = Number(li.dataset.id);
      handler(id);
    });

    this.list.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        const li = e.target.closest('li');
        const id = Number(li.dataset.id);
        handler(id, { remove: true });
      }
    });
  }
}
