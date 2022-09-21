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
        const title = document.createElement('p');
        title.textContent = this.title;
        title.classList.add('todo__title');

        const detailsBtn = document.createElement('button');
        detailsBtn.setAttribute('class', 'btn todo__details')
        
        const editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'btn todo__edit')

        const deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', 'btn todo__delete');


        const elements = [title, detailsBtn, editBtn, deleteBtn];

        elements.forEach((element) => {
            this.todo.appendChild(element);
        })
        
        return this.todo;
    }

    handleDetails() {

    }

    handleEdit() {

    }

    handleDelete() {

    }
}


export { TodoView }