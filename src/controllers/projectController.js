// controller responsible for creation of projects
// and also deletion via event delegation
// not sure wether to use event delegation for selection as well or add that to view itself
import { Project } from "../models/project";
import { ProjectView } from "../views/projectView";

class ProjectController {
    constructor(element, title) {
        this.container = document.querySelector(element);
        this.projects = [];
        this.title = title;
        this.counter = 0;
        this.projectList = document.createElement('div');
    }

    init() {
        const titleElement = document.createElement('h2');
        titleElement.textContent = this.title;
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add Project';
        

        // listeners
        addBtn.addEventListener('click', this.addProject.bind(this));
        this.projectList.addEventListener('click', this.selectProject.bind(this));

        this.container.appendChild(titleElement);
        this.container.appendChild(addBtn);
        this.container.appendChild(this.projectList);
    }

    addProject() {
        // maybe on add button open modal and on modal submit emit event to add the view and project
        const newProject = new Project('Untilted', this.counter);
        this.counter++;
        this.projects.push(newProject);
        const newView =  new ProjectView(newProject);
        this.projectList.appendChild(newView.element);
    }

    selectProject(event) {
        const isProject = event.target.getAttribute('class').includes('project') && event.target.nodeName === 'DIV';
        if (isProject) {
            this.deselect();
            event.target.classList.add('selected');
        }
        
    }

    deselect() {
        const projects = Array.from(this.projectList.children);
        projects.forEach((p) => {
            p.classList.remove('selected')
        })
    }
}


export { ProjectController };