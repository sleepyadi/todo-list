import { add } from "date-fns";
import { Project } from "../models/project";
import { eventManager } from "../utils/eventManager";
import { ProjectView } from "../views/projectView";

class ProjectController {
    constructor(element, title) {
        this.container = document.querySelector(element);
        this.projects = this.loadFromLocal() || [];
        this.title = title;
        // this.counter = this.projects.length;
        this.projectList = document.createElement('div');
        this.projectList.classList.add('project-list');
        this.selectedProject = '';
        eventManager.on('projectUpdated', this.updateProject.bind(this));
        eventManager.on('editProject', this.updateProjectInfo.bind(this));
    }

    init() {
        const titleElement = document.createElement('h2');
        titleElement.classList.add('controller-title');
        titleElement.textContent = this.title;

        const projectInputDiv = document.createElement('form');
        projectInputDiv.setAttribute('id', 'project-input-container')

        this.projectInput = document.createElement('input');
        this.projectInput.setAttribute('id', 'project-input');
        this.projectInput.required = true;
        this.projectInput.placeholder = 'Enter Project Name';
        projectInputDiv.appendChild(this.projectInput);

        const addBtn = document.createElement('button');
        addBtn.setAttribute('class', 'btn add-project-btn');
        addBtn.type = 'submit';
        addBtn.textContent = ' + ';
        projectInputDiv.appendChild(addBtn);

        // listeners
        projectInputDiv.addEventListener('submit', this.addProject.bind(this));
        this.projectList.addEventListener('click', this.selectProject.bind(this));

        this.container.appendChild(titleElement);
        this.container.appendChild(projectInputDiv);
        this.container.appendChild(this.projectList);

        //render projects at start
        this.renderProjects();
    }

    addProject(e) {
        // maybe on add button open modal and on modal submit emit event to add the view and project
        e.preventDefault();
        const projectName = this.projectInput.value || 'Untitled';
        const newProject = new Project(projectName, 'proj-' + Date.now());
        this.projects.push(newProject);
        this.renderProjects();
        this.updateLocal();
    }

    renderProjects() {
        // this is resetting the selected class 
        this.projectList.innerHTML = '';
        for (let project of this.projects) {
            const newView =  new ProjectView(project);
            this.projectList.appendChild(newView.element);
        }
        

        for (let pElement of Array.from(this.projectList.children)) {
            if (pElement.getAttribute('data-id') === this.selectedProject.id) {
                pElement.classList.add('selected');
            }            
        }

    }
    
    

    selectProject(event) {
        // this is event bubbling from edit btn
        const isProject = event.target.getAttribute('class').includes('project');
        const hasProjId = event.target.hasAttribute('data-id');
        const isEditBtn = event.target.getAttribute('class').includes('project__edit');
        const isTitle =  event.target.getAttribute('class').includes('project__title'); 
        const isDeleteBtn = event.target.getAttribute('class').includes('project__delete');

        if (isProject && hasProjId) {
            this.selectElement(event.target);
        } else if (isEditBtn || isTitle) {
            this.selectElement(event.target.parentElement);
        } else if (isDeleteBtn) {
            this.deleteProject(event.target.parentElement);
        }
        
    }

    selectElement(element) {
        this.deselect();
        element.classList.add('selected');
        const id = element.getAttribute('data-id');
        this.selectedProject = this.getSelectedProject(id);
        eventManager.emit('selectProject', this.selectedProject);
        this.renderProjects();
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
        this.updateLocal();
    }

    updateProjectInfo(obj) {
        // on project title edit trigger this func
        for (let project of this.projects) {
            if (project.id === obj.id) {
                for (let val in obj) {
                    if (val in project) {
                        project[val] = obj[val];
                    }
                }
                break; // this was breaking the loop ;-;
            }   
        }
        this.renderProjects();
        eventManager.emit('selectProject', this.selectedProject);
        this.updateLocal();
    }

    deleteProject(element) {
        const id = element.getAttribute('data-id');
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id === id) {
                this.projects.splice(i, 1);
                break;
            }
        }
        element.remove();
        if (element.getAttribute('class').includes('selected')) {
            this.selectedProject = '';
            eventManager.emit('selectProject', this.selectedProject);
        }
        this.updateLocal();
    }

    loadFromLocal() {
        if (window.localStorage.getItem('projects')) {
            return JSON.parse(window.localStorage.getItem('projects'));
        } else {
            return false;
        }
    }

    updateLocal() {
        window.localStorage.setItem('projects', JSON.stringify(this.projects));
    }
}


export { ProjectController };