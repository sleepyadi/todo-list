import { eventManager } from "./eventManager";

class Modal {
    constructor(type, element) {
        this.type = type;
        this._element = document.querySelector(element);
        this.formEvent = '';
    }

    openModal(msg = '') {
        if (this.type === 'message') {
            this._element.innerHTML = msg;
        }
        this._element.classList.add('active');
    }

    closeModal() {
        if (this.type === 'message') {
            this.innerHTML = '';
        }
        this._element.classList.remove('active');
    }

    setupForm(eventName) {
        if (this.type === 'form') {
            this.formEvent = eventName;
            this._element.addEventListener('submit', this.handleForm.bind(this));            
        }
    }

    handleForm(e) {
        e.preventDefault();
        // form element logic
        eventManager.emit(this.formEvent, )
    }

    fillForm(form, formValues) {
        // expects a 1 to 1 mapping of form and  given values
        if (this.type !== 'form') {
            console.log('not form type');
            return;
        }
        for (let val in formValues) {
            if (val in form.elements) {
                form.elements[val] = formValues[val];
            }
        }
    }

    emptyForm(form) {
        for (let element of form.elements) {
            if (element.nodeName === 'INPUT') {
                if (element.type === 'checkbox') {
                    element.checked = false;
                } else {
                    element.value = '';
                }
            }
        }
    }
}


export { Modal };