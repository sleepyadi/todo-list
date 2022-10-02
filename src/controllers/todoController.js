import { Todo } from "../models/todo";
import { eventManager } from "../utils/eventManager";
import { Modal } from "../utils/modal";
import { TodoView } from "../views/todoView";
import add from "date-fns/add";

class TodoController {
    constructor(element, title) {
        this.container = document.querySelector(element);
        this.todos = [];
        this.title = title || "None";
        // this.counter = this.todos.length;
        this.selectedProject = '';
        this.todoList = document.createElement('div');
        this.todoList.classList.add('todo-list');
        eventManager.on('selectProject', this.render.bind(this));
        eventManager.on('editTodo', this.updateTodo.bind(this));
    }

    init() {
        const titleElement = document.createElement('h2');
        titleElement.classList.add('controller-title');
        titleElement.textContent = this.title;

        const todoInputDiv = document.createElement('div');
        todoInputDiv.classList.add('todo-input-container');

        this.todoTitleInput = document.createElement('input');
        this.todoTitleInput.placeholder = 'Enter Todo Title';
        this.todoTitleInput.classList.add('todo-title-input');
        todoInputDiv.appendChild(this.todoTitleInput);

        this.todoDescInput = document.createElement('input');
        this.todoDescInput.placeholder = 'Enter Todo Details';
        this.todoDescInput.classList.add('todo-desc-input');
        todoInputDiv.appendChild(this.todoDescInput)

        this.todoDueInput = document.createElement('input');
        this.todoDueInput.type = 'date';
        this.todoDueInput.valueAsDate = add(new Date(), { days: 3});
        this.todoDueInput.classList.add('todo-dueDate-input')
        todoInputDiv.appendChild(this.todoDueInput);

        this.todoPriorityInput = document.createElement('input');
        this.todoPriorityInput.type = 'number';
        this.todoPriorityInput.classList.add('todo-priority-input');
        this.todoPriorityInput.min = '1';
        this.todoPriorityInput.max = '3';
        this.todoPriorityInput.value = '1';
        todoInputDiv.appendChild(this.todoPriorityInput);

        const addTodoBtn = document.createElement('button');
        addTodoBtn.setAttribute('class', 'btn add-todo-btn');
        addTodoBtn.textContent = ' + ';
        
        //event Listeners
        addTodoBtn.addEventListener('click', this.addTodo.bind(this));
        this.todoList.addEventListener('click', this.handleTodoClick.bind(this));
        todoInputDiv.appendChild(addTodoBtn);

        this.projectTitle = document.createElement('h2');
        this.projectTitle.classList.add('selected-project-title');
        this.projectTitle.textContent = "Project Name";

        this.container.appendChild(titleElement);
        this.container.appendChild(todoInputDiv);
        this.container.appendChild(this.projectTitle);
        this.container.appendChild(this.todoList);
        this.renderTodoList();
    }

    addTodo() {
        // could use same idea as proj added with modal and event emit probs
        if (this.selectedProject) {
            const todoTitle = this.todoTitleInput.value || 'Untitled';
            const todoDesc =  this.todoDescInput.value || 'Untitled';
            const todoDue = this.todoDueInput.value || '2023-03-01';
            const todoPriority = this.todoPriorityInput.value || 2;

            const newTodo = new Todo(todoTitle, todoDesc, todoDue, todoPriority, false , 'todo-' + Date.now());
            // this.counter = this.todos.length + 1;
            this.todos.push(newTodo);

            const newView = new TodoView(newTodo);
            this.todoList.appendChild(newView.element);
            this.updateProject();
        } else {
            // display no project selected message
            const modal = new Modal('message', '.msg-modal');
            modal.openModal('Select a Project before adding tasks.')
        }
    }

    renderTodoList() {
        // if todo not empty -> sort and render
        if (this.selectedProject) {
            this.projectTitle.textContent = this.selectedProject.name;
        } else {
            this.projectTitle.textContent = 'No Project Selected';
        }


        this.todoList.innerHTML = '';
        if (this.todos.length >= 1) {
            for (let todo of this.todos) {
                const newView = new TodoView(todo);
                this.todoList.appendChild(newView.element);
            }
        } 
    }

    render(project) {
        console.log('received in todo',project);
        console.log('hi this is from selectProject event in todocontroller')
        // this overwrites the main object, probs should send a copy
        if (project) {
            this.selectedProject = project;
            this.todos = [...this.selectedProject.todoList];
        } else {
            this.selectedProject = '';
            this.todos = [];
        }
        // on render assign project and todos
        // render existing proj and title
        this.renderTodoList();
    }

    updateTodo(obj) {
        // on todoEdit updates the todo
        for (let todo of this.todos) {
            if (todo.id === obj.id) {
                for (let val in obj) {
                    if (val in todo) {
                        todo[val] = obj[val];
                    }
                }
                break;
            }
        }

        // update project and emit projectUpdate event
        this.updateProject();
        this.renderTodoList();

    }

    updateProject() {
        this.selectedProject.todoList = [...this.todos];
        eventManager.emit('projectUpdated', this.selectedProject);
    }

    deleteTodo(element) {
        // get id -> delete view ->
        const id = element.parentNode.getAttribute('data-id');
        if (element.parentNode.hasAttribute('class', 'todo')) {
            element.parentNode.remove();
        }
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos.splice(i, 1);
                break;
            }
        }
        this.selectedProject.deleteTodo(id);
        this.updateProject();
        this.renderTodoList();
        
    }

    updateCheck(element) {
        // could add a class to parent node for styling
        const id = element.parentNode.getAttribute('data-id');

        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos[i].completed = element.checked;
                break;
            }
        }
        this.updateProject();
        this.renderTodoList();
    }

    handleTodoClick(event) {
        const isDeleteBtn = event.target.getAttribute('class').includes('todo__delete');
        const isCheckBox = event.target.getAttribute('class').includes('todo__check');

        if (isDeleteBtn) {
            this.deleteTodo(event.target);
        } else if (isCheckBox) {
            this.updateCheck(event.target);
        }
    }
}

export { TodoController }

//TODO
// styling for buttons
// maybe add label/tags for todo input
// filter options e_e
// responsiveness (somewhat done)
// style modals
// could use textarea for description
// either fix priority value or change it to a drop down