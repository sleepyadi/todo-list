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
        this.counter = this.projects.length;
        this.projectList = document.createElement('div');
        this.projectList.classList.add('project-list');
        this.selectedProject = '';
        eventManager.on('projectUpdated', this.updateProject.bind(this));
        eventManager.on('editProject', this.updateProjectInfo.bind(this));
    }

    init() {
        const titleElement = document.createElement('h2');
        titleElement.textContent = this.title;

        const projectInputDiv = document.createElement('div');
        projectInputDiv.classList.add('project-input-container')

        this.projectInput = document.createElement('input');
        this.projectInput.classList.add('project-input')
        this.projectInput.placeholder = 'Enter Project Name';
        projectInputDiv.appendChild(this.projectInput);

        const addBtn = document.createElement('button');
        addBtn.setAttribute('class', 'btn add-project-btn');
        addBtn.textContent = 'Add Project';
        projectInputDiv.appendChild(addBtn);

        // listeners
        addBtn.addEventListener('click', this.addProject.bind(this));
        this.projectList.addEventListener('click', this.selectProject.bind(this));

        this.container.appendChild(titleElement);
        this.container.appendChild(projectInputDiv);
        this.container.appendChild(this.projectList);
    }

    addProject() {
        // maybe on add button open modal and on modal submit emit event to add the view and project
        const projectName = this.projectInput.value || 'Untitled';
        const newProject = new Project(projectName, 'proj-' + this.counter);
        this.counter = this.projects.length + 1;
        this.projects.push(newProject);

        this.renderProjects();
        
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
        console.log(event.target);
        const isProject = event.target.getAttribute('class').includes('project');
        const hasProjId = event.target.hasAttribute('data-id');
        const isEditBtn = event.target.getAttribute('class').includes('project__edit');
        const isTitle =  event.target.getAttribute('class').includes('project__title'); 
       
        if (isProject && hasProjId) {
            console.log('project click')
            this.selectElement(event.target);
        } else if (isEditBtn || isTitle) {
            console.log('child click');
            this.selectElement(event.target.parentElement);
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
        console.log(this.projects);
        this.renderProjects();
        eventManager.emit('selectProject', this.selectedProject);
    }
}


export { ProjectController };