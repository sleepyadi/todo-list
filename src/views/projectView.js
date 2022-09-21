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
        this._element.textContent = this.name;
        return this._element;
    }

    select() {
        // solved via event delegation on controller
    }
}


export { ProjectView };

