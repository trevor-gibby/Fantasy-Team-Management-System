class formService {
    "use strict"
    constructor(viewModel, formId )
    {
        this.viewModel = viewModel;
        this.formId = formId;
        
        this.init();
    }
    
    init() {
        let $form = $(`#${this.formId}`)
        //setup submit callback
        $form.on('submit', this.submit)
        //set up change event for all form inputs
        for (let field of this.viewModel.fields) {
            let $el = $(`#${field.name}`);
            $el.on('change', this.change);
        }
        //add 'novalidate' property to form
        $form.attr('novalidate', 'novalidate');
    }
    
    submit = ev =>{
        //suppress default events
        ev.preventDefault();
        //call validateForm
    }

    change = ev => {
        //get event element
        let el = ev.target
        //call validateField
        let $el = $(el);
        this.validateField($el);
    }
    
    validateForm(){
        console.log('validate form called');
        //iterate viewModel and validate each field based on the rules in the 'validation' section for each field
        for (let field of this.viewModel.fields) {
            let $el = $(`#${field.name}`);
            this.validateField($el);
        }
        let valid = this.formValidated();
        return valid;
    }
    validateField($el) {
        //called by 'change' event
        let view = this.getFieldViewModel($el.attr('id'));
        if (view.validation.required) {
            if (!this.validateRequired($el, view.validation.requiredMessage)) return this.fieldValidated($el);
        }

        if (view.inputType == 'password') {
            this.validatePassword($el, view);
        }

        else if ('regex' in view.validation) {
            this.validateRegex($el, view.validation.regex, view.validation.invalidMessage)
        }
        this.fieldValidated($el);
    }
    validatePassword($field, view)
    {
        //method for validating passwords
        //check required
        if (!this.validateRequired($field, view.validation.requiredMessage)) return false;
        
        // Check for matchEl key in the view validation object
        if ("matchEl" in view.validation) {
            let $matchField = $(`#${view.validation.matchEl}`); // Create jQuery reference to matchEl
            if ($matchField.val() != $field.val()) { // Check if the passwords match
                // If passwords don't match then setValidity with mismatch message for both
                // password fields.
                this.setValidity($field[0], false, view.validation.mismatchMessage); 
                this.setValidity($matchField[0], false, view.validation.mismatchMessage);
                return false;
            }
        }
        // Check password regex using validateRegex method
        return this.validateRegex($field, view.validation.regex, view.validation.invalidMessage);
    }
    
    validateRequired($field, message)
    {
        //function to validate whether a field has contents
        //after it passes or fails, call setValidity
        if ($field.val() == '') return this.setValidity($field[0], false, message);
        return this.setValidity($field[0], true);
    }
    
    validateRegex($field, regex, message)
    {
        //function to test a regex expression for validity for various inputTypes
        //tel, email, password..
        let input = $field.val(); // Get reference to input string
        let view = this.getFieldViewModel($field.attr('id')); // Get viewmodel for the field
        if (!view.validation.required){ // If the validation is not required then an empty string is fine
            if (input == '') return this.setValidity($field[0], true);
        }
        // Otherwise test against regex expression in viewmodel.
        // Call setValidity with result
        if (regex.test(input)) return this.setValidity($field[0], true);
        return this.setValidity($field[0], false, message);
    }
    
    getFieldViewModel(getId) {
        //utility function you could use to get the viewmodel for a specific field
        for (let field of this.viewModel.fields) {
            if (field.name == getId) return field
        }
        return null; // If id isn't found in viewModel
    }
    
    setValidity(el, isValid, message){
        //utility function to set validity on a field using setCustomValidity
        //Sets error message for the input in the 'div' with class 'invalid-feedback'
        if (isValid) {
            el.setCustomValidity('');
            return true;
        }
        el.setCustomValidity(message)
        let $el = $(el);
        $el.siblings('.invalid-feedback').text(message);
        return false;
    }
    fieldValidated(el){
        //set 'was-validated' class on field's parent 'div'
        //this will show errors/validity for only the one field
        let parent = el.parent();
        parent.addClass('was-validated');
    }
    
    formValidated(){
        let ret = true;
        //set 'was-validated' class on the form element
        //this will show errors/validity for all fields
        let $form = $(`#${this.formId}`);
        $form.addClass('was-validated');

        $('.invalid-feedback').each(function( index ) {
            if ($( this ).css('display') != 'none') {
                ret = false;
            }
        });
        return ret;
    }
}