import { eventManager } from "./eventManager";

class Modal {
    constructor(type, element) {
        this.type = type;
        this._element = document.querySelector(element);
        this.overlay = document.querySelector('#overlay');
        this.overlay.addEventListener('click', this.closeModal.bind(this));
        this.formEvent = '';
    }

    openModal(msg = '') {
        if (this.type === 'message') {
            this._element.innerHTML = msg;
        } 
        this._element.classList.add('active');
        this.overlay.classList.add('active');
    }

    closeModal() {
        this._element.classList.remove('active');
        this.overlay.classList.remove('active');
        if (this.type === 'message') {
            this.innerHTML = '';
        }
    }

    setupForm(eventName) {
        if (this.type === 'form') {
            this.formEvent = eventName;
            this._element.addEventListener('submit', this.handleForm.bind(this), {once: true});            
        }
    }

    handleForm(e) {
        // handles form submit
        e.preventDefault();
        
        const fValues = this.getFormValues();
        const formObject = Object.assign({}, fValues, {id:this.formID});
        console.log(formObject)
        eventManager.emit(this.formEvent, formObject);
        this.closeModal();
        return;
    }

    fillForm(formValues) {
        // expects a 1 to 1 mapping of form and  given values
        if (this.type !== 'form') {
            console.log('not form type');
            return;
        }

        this.formID = formValues.id;

        for (let key in formValues) {
            if (key in this._element.elements) {
                this._element.elements[key].value = formValues[key];
                // console.log(this._element.elements[key].value);

            };
        }
        console.log(formValues);
    }

    emptyForm(form) {
        if (this.type === 'form') {
            form.reset();
        }
    }

    getFormValues() {
        // returns form values as object
        const values = {};
        for (let key in this._element.elements) {
            values[key] = this._element.elements[key].value;
        }
        return values;
    }
}


export { Modal };