// controller responsible for creation of projects
// and also deletion via event delegation
// not sure wether to use event delegation for selection as well or add that to view itself
import { Project } from "../models/project";
import { eventManager } from "../utils/eventManager";
import { ProjectView } from "../views/projectView";

class ProjectController {
    constructor(element, title) {
        this.container = document.querySelector(element);
        this.projects = [];
        this.title = title;
        this.counter = 0;
        this.projectList = document.createElement('div');
        this.selectedProject = '';
        eventManager.on('projectUpdated', this.updateProject.bind(this));
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
        const newProject = new Project('Untilted', 'proj-' + this.counter);
        this.counter++;
        this.projects.push(newProject);
        const newView =  new ProjectView(newProject);
        this.projectList.appendChild(newView.element);
    }

    

    selectProject(event) {
        const isProject = event.target.getAttribute('class').includes('project') && event.target.nodeName === 'DIV';
        if (isProject) {
            // also emit projectSelected event
            this.deselect();
            event.target.classList.add('selected');
            const id = event.target.getAttribute('data-id');
            this.selectedProject = this.getSelectedProject(id);
            eventManager.emit('selectProject', this.selectedProject);
        }
        
    }

    deselect() {
        const projects = Array.from(this.projectList.children);
        projects.forEach((p) => {
            p.classList.remove('selected')
        })
    }

    getSelectedProject(id) {
        return this.projects.filter((p) => {return p.id === id;})[0]   
    }

    updateProject(project) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id === project.id) {
                this.projects[i] = project;
            }
        }
        eventManager.emit('selectProject', this.selectedProject);
    }
}


export { ProjectController };