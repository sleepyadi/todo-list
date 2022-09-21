import { ProjectController } from "./controllers/projectController";
import { TodoController } from "./controllers/todoController";


const projectSidebar = new ProjectController('.project-sidebar');
projectSidebar.init();

const todoContainer = new TodoController('.todo-list');
todoContainer.init();