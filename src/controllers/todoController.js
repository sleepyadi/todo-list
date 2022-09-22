// maintains the list and adds todo (only active when a project is selected)
// listens for projectSelected event and renders the project and todos 
// emits projectUpdate on edit-todo or add-todo
// might not even need id's if i make proper use of "selected" tag
// on project reciever -> populate todos -> sort -> render
import { Todo } from "../models/todo";
import { eventManager } from "../utils/eventManager";
import { TodoView } from "../views/todoView";

class TodoController {
    constructor(element) {
        this.container = document.querySelector(element);
        this.todos = [];
        this.counter = this.todos.length;
        this.selectedProject = '';
        this.todoList = document.createElement('div');
        eventManager.on('selectProject', this.render.bind(this));
    }

    init() {
        const addTodoBtn = document.createElement('button');
        addTodoBtn.textContent = 'Add Todo';
        

        //event Listeners
        addTodoBtn.addEventListener('click', this.addTodo.bind(this));

        this.container.appendChild(addTodoBtn);
        this.container.appendChild(this.todoList);
        this.renderTodoList();
    }

    addTodo() {
        // could use same idea as proj added with modal and event emit probs
        if (this.selectedProject) {
            const newTodo = new Todo('untitled', 'untitled', '22/1/2022', 5, false , 'todo-' + this.counter);
            this.todos.push(newTodo);
            this.counter++;

            const newView = new TodoView(newTodo);
            this.todoList.appendChild(newView.element);
        }
    }

    renderTodoList() {
        // if todo not empty -> sort and render
        if (this.todos.length >= 1) {
            this.todoList.innerHTML = '';
            for (let todo of this.todos) {
                const newView = new TodoView(todo);
                this.todoList.appendChild(newView.element);
            }
        } 
    }

    render(project) {
        console.log(project);
        console.log('hi this is from selectProject event')
        // this overwrites the main object, probs should send a copy
        this.selectedProject = project;
        this.todos = project.todoList;
    }
}

export { TodoController }