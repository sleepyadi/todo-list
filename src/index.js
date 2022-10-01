import { ProjectController } from "./controllers/projectController";
import { TodoController } from "./controllers/todoController";
import 'normalize.css'
import './styles/main.css';

const projectSidebar = new ProjectController('.project-sidebar', 'PROJECTS');
projectSidebar.init();

const todoContainer = new TodoController('.todo-main', 'TASKS');
todoContainer.init();