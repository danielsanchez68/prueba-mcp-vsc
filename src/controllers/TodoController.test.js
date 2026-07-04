import TodoController from './TodoController.js';
import TodoModel from '../models/TodoModel.js';
import TodoView from '../views/TodoView.js';

// Mock de las dependencias
jest.mock('../models/TodoModel.js');
jest.mock('../views/TodoView.js');

describe('TodoController - handleAdd', () => {
    let controller;
    let mockModel;
    let mockView;
    let mockApp;

    beforeEach(() => {
        // Crear elemento mock para el DOM
        mockApp = document.createElement('div');
        mockApp.id = 'app';
        document.body.appendChild(mockApp);

        // Limpiar mocks
        jest.clearAllMocks();

        // Configurar mocks con implementaciones básicas
        mockModel = {
            addTodo: jest.fn(),
            getAll: jest.fn(() => []),
            toggleTodo: jest.fn(),
            removeTodo: jest.fn(),
        };

        mockView = {
            render: jest.fn(),
            bindAdd: jest.fn(),
            bindToggle: jest.fn(),
        };

        TodoModel.mockImplementation(() => mockModel);
        TodoView.mockImplementation(() => mockView);

        controller = new TodoController();
    });

    afterEach(() => {
        document.body.removeChild(mockApp);
    });

    /**
     * Verifica que handleAdd agregue una tarea al modelo.
     */
    test('debe llamar a model.addTodo con el texto proporcionado', () => {
        const textoTarea = 'Comprar leche';
        controller.handleAdd(textoTarea);

        expect(mockModel.addTodo).toHaveBeenCalledWith(textoTarea);
        expect(mockModel.addTodo).toHaveBeenCalledTimes(1);
    });

    /**
     * Verifica que handleAdd actualice la vista después de agregar la tarea.
     */
    test('debe renderizar la vista después de agregar la tarea', () => {
        controller.handleAdd('Nueva tarea');

        expect(mockView.render).toHaveBeenCalled();
    });

    /**
     * Verifica que handleAdd realice ambas operaciones en el orden correcto.
     */
    test('debe llamar a addTodo antes de renderizar', () => {
        const llamadas = [];

        mockModel.addTodo.mockImplementation(() => {
            llamadas.push('addTodo');
        });

        mockView.render.mockImplementation(() => {
            llamadas.push('render');
        });

        controller.handleAdd('Tarea');

        expect(llamadas).toEqual(['addTodo', 'render']);
    });

    /**
     * Verifica que handleAdd funcione con diferentes tipos de texto.
     */
    test('debe manejar diferentes textos de tareas', () => {
        const textos = ['Tarea 1', 'Otra tarea', 'Tarea con números 123'];

        textos.forEach((texto) => {
            controller.handleAdd(texto);
        });

        expect(mockModel.addTodo).toHaveBeenCalledTimes(textos.length);
        textos.forEach((texto) => {
            expect(mockModel.addTodo).toHaveBeenCalledWith(texto);
        });
    });
});