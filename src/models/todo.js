class Todo {
    constructor(title, desc, dueDate, priority, completed = false, id) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed
        this.id = id;
    }


}

export { Todo }