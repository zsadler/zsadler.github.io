(function (window) {
    var signupForm = document.querySelector('#signup'),
        fnameValid = false,
        lnameValid = false,
        bdayValid = false,
        emailValid = false,
        passwordValid = false,
        formMarkedInvalid = false,
        fnameMarkedInvalid = false,
        lnameMarkedInvalid = false,
        bdayMarkedInvalid = false,
        emailMarkedInvalid = false,
        passwordMarkedInvalid = false;

    // sign up form
    if(signupForm !== null) {
        signupForm.addEventListener('submit', function(e){
            // the DOM is set so lets set all the elements so we don't need to keep looking them up
            var formEl = e.target,
                fnameEl = formEl.querySelector('[name="fname"]'),
                fnameErrorEL = formEl.querySelector('.error-msg.fname-error'),
                fnameValue = fnameEl.value,
                fnameValid = validator.isOfLength(fnameValue, 2) !== true ? validator.isOfLength(fnameValue, 2) : {valid: true},
                lnameEl = formEl.querySelector('[name="lname"]'),
                lnameErrorEL = formEl.querySelector('.error-msg.lname-error'),
                lnameValue = lnameEl.value,
                lnameValid = validator.isOfLength(lnameValue, 2) !== true ? validator.isOfLength(lnameValue, 2) : {valid: true},
                bdayEl = formEl.querySelector('[name="bday"]'),
                bdayErrorEL = formEl.querySelector('.error-msg.bday-error'),
                bdayValue = bdayEl.value,
                bdayValid = validator.isBeforeToday(bdayValue) !== true ? validator.isBeforeToday(bdayValue) : {valid: true};
                emailEl = formEl.querySelector('[name="email"]'),
                emailErrorEL = formEl.querySelector('.error-msg.email-error'),
                emailValue = emailEl.value,
                emailValid = validator.isEmailAddress(emailValue) !== true ? validator.isEmailAddress(emailValue) : {valid: true},
                passwordEl = formEl.querySelector('[name="password"]'),
                passwordErrorEL = formEl.querySelector('.error-msg.password-error'),
                passwordValue = passwordEl.value,
                passwordValid = validator.isOfLength(passwordValue, 8) !== true ? validator.isOfLength(passwordValue, 8) : {valid: true};


            if(!fnameValid.valid || !lnameValid.valid || !bdayValid.valid || !emailValid.valid || !passwordValid.valid) {
                //form is not valid. stop form from submitting
                e.preventDefault();

                if(!formMarkedInvalid) {
                    formEl.classList += " not-valid";
                    formMarkedInvalid = true;
                }
            }

            // First Name Field Validation
            if(!fnameMarkedInvalid && !fnameValid.valid) {
                if(fnameEl.classList.contains("valid")) {
                    fnameEl.classList.remove("valid");
                }
                fnameErrorEL.innerHTML += "First name " + fnameValid.msg;
                fnameEl.classList += "not-valid";
                fnameMarkedInvalid = true;
            }
            if(fnameValid.valid) {
                if(fnameEl.classList.contains("not-valid")) {
                    fnameEl.classList.remove("not-valid");
                    fnameErrorEL.innerHTML = "";
                }
                if(!fnameEl.classList.contains("valid")) {
                    fnameEl.classList += "valid";
                    fnameMarkedEmpty = false;
                }
            }

            // Last Name Field Validation
            if(!lnameMarkedInvalid && !lnameValid.valid) {
                if(lnameEl.classList.contains("valid")) {
                    lnameEl.classList.remove("valid");
                }
                lnameErrorEL.innerHTML += "Last name " + lnameValid.msg;
                lnameEl.classList += "not-valid";
                lnameMarkedInvalid = true;
            }
            if(lnameValid.valid) {
                if(lnameEl.classList.contains("not-valid")) {
                    lnameEl.classList.remove("not-valid");
                    lnameErrorEL.innerHTML = "";
                }
                if(!lnameEl.classList.contains("valid")) {
                    lnameEl.classList += "valid";
                    lnameMarkedEmpty = false;
                }
            }

            // Birthday Field Validation
            if(!bdayMarkedInvalid && !bdayValid.valid) {
                if(bdayEl.classList.contains("valid")) {
                    bdayEl.classList.remove("valid");
                }
                bdayErrorEL.innerHTML += bdayValid.msg;
                bdayEl.classList += "not-valid";
                bdayMarkedInvalid = true;
            }
            if(bdayValid.valid) {
                if(bdayEl.classList.contains("not-valid")) {
                    bdayEl.classList.remove("not-valid");
                    bdayErrorEL.innerHTML = "";
                }
                if(!bdayEl.classList.contains("valid")) {
                    bdayEl.classList += "valid";
                    bdayMarkedEmpty = false;
                }
            }

            // Email Field Validation
            if(!emailMarkedInvalid && !emailValid.valid) {
                if(emailEl.classList.contains("valid")) {
                    emailEl.classList.remove("valid");
                }
                emailErrorEL.innerHTML += emailValid.msg;
                emailEl.classList += "not-valid";
                emailMarkedInvalid = true;
            }
            if(emailValid.valid) {
                if(emailEl.classList.contains("not-valid")) {
                    emailEl.classList.remove("not-valid");
                    emailErrorEL.innerHTML = "";
                }
                if(!emailEl.classList.contains("valid")) {
                    emailEl.classList += "valid";
                    emailMarkedEmpty = false;
                }
            }

            // Password Field Validation
            if(!passwordMarkedInvalid && !passwordValid.valid) {
                if(passwordEl.classList.contains("valid")) {
                    passwordEl.classList.remove("valid");
                }
                passwordErrorEL.innerHTML += "Password " + passwordValid.msg;
                passwordEl.classList += "not-valid";
                passwordMarkedInvalid = true;
            }
            if(passwordValid.valid) {
                if(passwordEl.classList.contains("not-valid")) {
                    passwordEl.classList.remove("not-valid");
                    passwordErrorEL.innerHTML = "";
                }
                if(!passwordEl.classList.contains("valid")) {
                    passwordEl.classList += "valid";
                    passwordMarkedEmpty = false;
                }
            }
        });
    }


})(window);