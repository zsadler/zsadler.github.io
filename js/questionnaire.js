(function (window) {
    var questionnaire = document.querySelector('#questionnaire'),
        radios = document.getElementsByTagName('input'),
        radiosErrorEL = questionnaire.querySelector('.error-msg.radio-error'),
        otherRadioEl = questionnaire.querySelector('[value="Other"]'),
        otherErrorEL = questionnaire.querySelector('.error-msg.other-error'),
        otherInputEl = questionnaire.querySelector('[name="other_beer"]'),
        checked = false,
        radiosMarkedInvalid = false,
        formMarkedInvalid = false,
        otherInputInvalid = false;

    // sign up form
    if(questionnaire !== null) {
        questionnaire.addEventListener('submit', function(e){
            
            // Check if a radio button has been selected
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type == 'radio' && radios[i].checked) {
                    checked = true;
                } 
            }

            if(!checked || (otherRadioEl.checked && validator.isOfLength(otherInputEl.value, 2) !== true)) {
                //form is not valid. stop form from submitting
                e.preventDefault();

                if(!formMarkedInvalid) {
                    questionnaire.classList += " not-valid";
                    formMarkedInvalid = true;
                }
            }

            // Check if a "other" radio button has been selected and if it has
            // make sure "other" input field has been filed in.
            if(otherRadioEl.checked && validator.isOfLength(otherInputEl.value, 2) !== true) {
                if(otherInputEl.classList.contains("valid")) {
                    otherInputEl.classList.remove("valid");
                }
                otherErrorEL.innerHTML = "Please fill in your favorite beer. Must be at least 2 characters long.";
                otherInputEl.classList += "not-valid";
                otherInputInvalid = true;
            }
            if(otherRadioEl.checked && validator.isOfLength(otherInputEl.value, 2) === true) {
                if(otherInputEl.classList.contains("not-valid")) {
                    otherInputEl.classList.remove("not-valid");
                    otherErrorEL.innerHTML = "";
                }
                if(!otherInputEl.classList.contains("valid")) {
                    otherInputEl.classList += " valid";
                    otherInputInvalid = false;
                }
            }

            // Radio Validation
            if(!radiosMarkedInvalid && !checked) {
                if(radiosErrorEL.classList.contains("valid")) {
                    radiosErrorEL.classList.remove("valid");
                }
                radiosErrorEL.innerHTML += "Must select a favorite beer.";
                radiosErrorEL.classList += " not-valid";
                radiosMarkedInvalid = true;
            }
            if(checked) {
                if(radiosErrorEL.classList.contains("not-valid")) {
                    radiosErrorEL.classList.remove("not-valid");
                    radiosErrorEL.innerHTML = "";
                }
                if(!radiosErrorEL.classList.contains("valid")) {
                    radiosErrorEL.classList += " valid";
                    radiosMarkedEmpty = false;
                }
            }
        });
    }

})(window);