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
        } else if (this.type === 'form') {
            this.emptyForm(this._element);
        }
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
        //sends todoEdit event
        eventManager.emit(this.formEvent, 'hi');
        this.closeModal();
    }

    fillForm(formValues) {
        // expects a 1 to 1 mapping of form and  given values
        if (this.type !== 'form') {
            console.log('not form type');
            return;
        }
        
        for (let key in formValues) {
            if (key in this._element.elements) {
                this._element.elements[key].value = formValues[key];
                console.log(this._element.elements[key].value);

            };
        }

    }

    emptyForm(form) {
        for (let element of form.elements) {
            element.value = '';
        }
    }
}


export { Modal };