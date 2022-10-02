import { ProjectController } from "./controllers/projectController";
import { TodoController } from "./controllers/todoController";
import 'normalize.css'
import './styles/main.css';

const projectSidebar = new ProjectController('.project-sidebar', 'PROJECTS');
projectSidebar.init();

const todoContainer = new TodoController('.todo-main', 'TASKS');
todoContainer.init();

//TODO
// maybe add label/tags for todo input
// filter options e_e
// could use textarea for description
// either fix priority value or change it to a drop down