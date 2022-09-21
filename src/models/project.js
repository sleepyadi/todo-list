class Project {
    constructor(name, id) {
        this.name = name;
        this.todoList = [];
        this.id = id;
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }

    deleteTodo(id) {
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].id === id) {
                this.todoList.splice(i, 1);
                return;
            }
        }
    }
}

export { Project };