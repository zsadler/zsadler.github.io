(function (window) {
    var searchForm = document.querySelector('#search'),
        inputMarkedEmpty = false,
        selectMarkedInvalid = false,
        formMarkedInvalid = false;

    // just gonna make sure search form exists on the page (mainly if this ever gets included in a global js file)
    if(searchForm !== null) {

        searchForm.addEventListener('submit', function(e) {
            // the DOM is set so lets set all the elements so we don't need to keep looking them up
            var formEl = e.target,
                inputEl = formEl.querySelector('[name="search"]'),
                inputErrorEL = formEl.querySelector('.error-msg.input-error'),
                selectEl = formEl.querySelector('select'),
                selectErrorEl = formEl.querySelector('.error-msg.select-error'),
                inputValue = inputEl.value,
                selectValue = selectEl.value,
                selectValid = selectValue !== "" ? {valid: true} : {valid: false, msg: "Select a valid category. "},
                inputIsNotEmpty = validator.isEmpty(inputValue) === false ? {valid: true} : validator.isEmpty(inputValue),
                isValidLength = validator.isOfLength(inputValue, 2) !== true ? validator.isOfLength(inputValue, 2) : {valid: true};

            if(!inputIsNotEmpty.valid) {
                inputValid = inputIsNotEmpty;
            } 

            if(inputIsNotEmpty.valid && !isValidLength.valid) {
                inputValid = isValidLength;
            }

            if(inputIsNotEmpty.valid && isValidLength.valid) {
                inputValid = {valid: true};
            }

            if(!inputValid.valid || !selectValid.valid || !isValidLength.valid) {
                //form is not valid. stop form from submitting
                e.preventDefault();

                if(!formMarkedInvalid) {
                    formEl.classList += " not-valid";
                    formMarkedInvalid = true;
                }
            }

            if(inputMarkedEmpty && !isValidLength.valid) {
                inputErrorEL.innerHTML = "Search " + inputValid.msg;
            }

            if(!inputMarkedEmpty && !inputValid.valid) {
                if(inputEl.classList.contains("valid")) {
                    inputEl.classList.remove("valid");
                }
                inputErrorEL.innerHTML += inputValid.msg;
                inputEl.classList += "not-valid";
                inputMarkedEmpty = true;
            }
            if(inputValid.valid) {
                if(inputEl.classList.contains("not-valid")) {
                    inputEl.classList.remove("not-valid");
                    inputErrorEL.innerHTML = "";
                }
                if(!inputEl.classList.contains("valid")) {
                    inputEl.classList += "valid";
                    inputMarkedEmpty = false;
                }
            }

            if(!selectMarkedInvalid && !selectValid.valid) {
                if(selectEl.classList.contains("valid")) {
                    selectEl.classList.remove("valid");
                }
                selectErrorEl.innerHTML += selectValid.msg;
                selectEl.classList += "not-valid";
                selectMarkedInvalid = true;
            }
            if(selectValid.valid) {
                if(selectEl.classList.contains("not-valid")) {
                    selectEl.classList.remove("not-valid");
                    selectErrorEl.innerHTML = "";
                }
                if(!selectEl.classList.contains("valid")) {
                    selectEl.classList += "valid";
                    selectMarkedInvalid = false;
                }
            }

            if(inputValid.valid && selectValid.valid) {
                if(formEl.classList.contains("not-valid")) {
                    formEl.classList.remove("not-valid");
                }
                formEl.classList += " valid";
                markedInvalid = false;
            }
        });
    }
    
})(window);