import { Modal } from "../utils/modal";

class ProjectView {
    constructor(project) {
        this.project = project;
        this.name = this.project.name;
        this.id = this.project.id;
        this._element = document.createElement('div');
        this._element.classList.add('project');
        this._element.setAttribute('data-id', this.id);
    }

    get element() {
        // adds listeners and returns the element;
        const projectName = document.createElement('h3');
        projectName.classList.add('project__title');
        projectName.textContent = this.name;
        this._element.appendChild(projectName);

        const editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'btn project__edit svg-button');
        editBtn.addEventListener('click', this.handleEdit.bind(this));
        this._element.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'btn project__delete svg-button');
        this._element.appendChild(deleteBtn);

        return this._element;
    }

    handleEdit(e) {
        const modal = new Modal('form', '#edit-project-modal');
        modal.setupForm('editProject');
        modal.fillForm(this);
        modal.openModal();
    }
}


export { ProjectView };

