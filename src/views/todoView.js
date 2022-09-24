// desc = button with modal for the entire text (i) type of button
// dueDate = need to use a lib to convert time into dueDate - now
// priority = 1-5 maybe ? or 1-3 used for sorting maybe
// completed is just a tick input
// probably could use event delegation for edit and delete on controller 
// instead of view
// could just use a on page input for task and project
// modal for edit button emits todoEdit

import { Modal } from "../utils/modal";

class TodoView {
    constructor({title, desc, dueDate, priority, completed = false, id}) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.id = id;
        this.todo = document.createElement('div');
        this.todo.classList.add('todo');
        this.todo.setAttribute('data-id', this.id);
    }

    get element() {
        // adds listeners and sub elements
        const todoCheck = document.createElement('input');
        todoCheck.type = 'checkbox';
        todoCheck.name = 'completed';
        todoCheck.checked = this.completed;
        todoCheck.classList.add('todo__check');


        const title = document.createElement('p');
        title.textContent = this.title;
        title.name = 'title';
        title.classList.add('todo__title');

        const detailsBtn = document.createElement('button');
        detailsBtn.setAttribute('class', 'btn todo__details')
        detailsBtn.textContent = 'details';
        detailsBtn.name = 'desc';
        detailsBtn.addEventListener('click', this.handleDetails.bind(this));

        const dueDate = document.createElement('p');
        dueDate.textContent = 'some days left';
        dueDate.classList.add('todo__due');

        const editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'btn todo__edit')
        editBtn.textContent = 'edit';
        editBtn.addEventListener('click', this.handleEdit.bind(this));

        const deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', 'btn todo__delete');
        deleteBtn.textContent = 'delete';

        const elements = [todoCheck, title, detailsBtn, dueDate, editBtn, deleteBtn];

        elements.forEach((element) => {
            this.todo.appendChild(element);
        })
        
        return this.todo;
    }

    handleDetails() {
        const modal = new Modal('message', '.msg-modal');
        modal.openModal(this.desc);
    }

    handleEdit() {
        // opens modal for form edit with values and emits editTodo on submit
        const modal = new Modal('form', '#edit-todo-modal');
        // fix this
        // on edit btn -> open todo form with values
        modal.setupForm('editTodo')
        modal.fillForm(this);
        modal.openModal();

    }

    handleDelete() {
        // handled via event delegation probably
    }
}


export { TodoView }