(function (window) {
    var validator = {
        alphanumeric: ["A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z","0","1","2","3","4","5","6","7","8","9"]
    };

    validator.isEmailAddress = function(input) {
        var at = input.indexOf('@'),
            dot = input.indexOf('.');

        try {
            if (!input) throw "Email address is required.";
            if(dot === -1 && at === -1) throw "Must be a valid email address.";
        } catch(err) {
            return { valid: false, msg: err };
        }

        return true;
    };

    validator.isPhoneNumber = function(input) {
        if (!input) throw "Missing Parameter in isPhoneNumber function: 'input'.";
        // not testing for number because we know html form input return strings

        var isValid = false,
            numCount = input.length,
            numArr = [],
            convertStringToIntToString = function(arr) {
                // parseInt will drop any letters/symbols causing number not to validate with appropriate array cell amounts once converted back to a string.
                for(var i=0; i < arr.length; i++) {
                    arr[i] = parseInt(arr[i], 10);
                }
                // convert back to strings in each array and get the length
                return arr.toString().split(",");
            };

        if(input.indexOf("-") !== -1) {
            isValid = numCount === 12;
            numArr = input.split("-");

            if(numArr.length === 3) {
                numArr = convertStringToIntToString(numArr);
                // Check the length of each cell for appropriate lengths
                if(numArr[0].length !== 3 || numArr[1].length !== 3 || numArr[2].length !== 4) {
                    isValid = false;
                } else {
                    return true;
                }
            } else {
                return false;
            }

        } else {

            numArr = input;
            numArr = convertStringToIntToString(numArr);
            isValid = numArr[0].length === 10;

        }
        return isValid;
    };

    validator.withoutSymbols = function(input) {
        if (!input) throw "Missing Parameter in withoutSymbols function: 'input'.";
        var alphaNumericCheck = validator.alphanumeric,
            inputArr = input.split(''),
            stripped = [];

        for(var i=0; i < inputArr.length; i++){
            if(inputArr[i] === ' ') {
                // if the array value is a space just push it
                stripped.push(inputArr[i]);
            } else {
                for (var x=0; x < alphaNumericCheck.length; x++) {
                    if(inputArr[i] === alphaNumericCheck[x]) {
                        stripped.push(inputArr[i]);
                    }

                }
            }
        }

        return stripped.join('');
    };

    validator.isDate = function(input) {
        if (!input) throw "Missing Parameter in isDate function: 'input'.";
        if (isNaN(Date.parse(input))) throw "Invalid date entered in isDate function: 'input'";
        return !isNaN(Date.parse(input));
    };

    validator.isBeforeDate = function(input, reference) {
        if (!input || !reference) throw "Missing Parameter in isBeforeDate function: 'input and/or reference'.";
        if (isNaN(Date.parse(input)) || isNaN(Date.parse(reference))) throw "Invalid date(s) entered in isBeforeDate function: 'input and/or reference'";
        return Date.parse(input) < Date.parse(reference);
    };

    validator.isAfterDate = function(input, reference) {
        if (!input) throw "Missing Parameter in isAfterDate function: 'input and/or reference'.";
        if (!input || !reference) throw "Missing Parameter in isAfterDate function: 'input and/or reference'.";
        if (isNaN(Date.parse(input)) || isNaN(Date.parse(reference))) throw "Invalid date(s) entered in isDate function: 'input and/or reference'";
        return Date.parse(input) > Date.parse(reference);
    };

    validator.isBeforeToday = function(input) {
        var todaysDate = new Date();

        try{
            if (!input) throw "Date is required";
            if (isNaN(Date.parse(input))) throw "Invalid date entered.";
            if( !(Date.parse(input) < todaysDate) ) throw "Date must be before todays date."
        } catch(err) {
            return { valid: false, msg: err };
        }
        return true;
    };

    validator.isAfterToday = function(input) {
        if (!input) throw "Missing Parameter in isAfterToday function: 'input'.";
        if (isNaN(Date.parse(input))) throw "Invalid date(s) entered in isAfterToday function: 'input'";
        var todaysDate = new Date();
        return Date.parse(input) > todaysDate;
    };

    validator.isEmpty = function(input) {
        try {
            if (!input) throw "Input is empty. ";
        } catch (err) {
            return { valid: false, msg: err };
        }
        // passing null triggers my error flag and not false but if the error trap wasn't there this is how I'd account for it.
        if (input === null) {
            return false;
        }

        return input.trim().length === 0;
    };

    validator.contains = function(input, words) {
        if (!input || !words) throw "Missing Parameter(s) in the contains function: 'input and/or words'.";
        var inputStr = input.toLowerCase()
        wordsArr = words.map(word => word.toLowerCase());

        for(var i = 0; i < wordsArr.length; i++) {
            if(inputStr.search(wordsArr[i]) === -1) {
                return false;
            }
        }
        return true;
    };

    validator.lacks = function(input, words) {
        if (!input || !words) throw "Missing Parameter(s) in the lacks function: 'input and/or words'.";
        return this.contains(input, words) !== true;
    };

    validator.isComposedOf = function(input, strings) {
        if (!input || !strings) throw "Missing Parameter(s) in isComposedOf function: 'input and/or string'.";
        var input = input.toLowerCase(),
            strings = strings.toString().toLowerCase();
        var strArr = strings.split(",");
        var composedOf = false;

        for (var i in strArr) {
            console.log(input.indexOf(strArr[i]));
            if (input.indexOf(strArr[i]) > -1) {
                composedOf = true;
            }
        }
        return composedOf;

    };

    validator.isLength = function(input, n) {
        if (!input || !n) throw "Missing Parameter(s) in isLength function: 'input and/or n'.";
        if (typeof n !== "number") throw "Parameter type is not of type number: 'n'.";
        return input.length <= n;
    };

    validator.isOfLength = function(input, n) {
        // don't want this to be a user error. This should be caught by the developer in the console
        if (!n) throw "Missing Parameter passed into isOfLength function: 'n is not defined'.";
        if (typeof n !== "number") throw "Must be a number.";

        // These are user errors
        try {
            if (!(input.length >= n)) throw "must be at least "+n+" characters long."
        } catch (err) {
            return { valid: false, msg: err };
        }
        return true;
    };

    validator.countWords = function(input) {
        if (input === null || input === undefined) throw "Missing Parameter in countWords function: 'input'.";

        var inputArr = [];
        input = input.trim();

        if (input.includes(' ')) {
            return input.split(' ').length;
        } else if (input.includes('-')) {
            inputArr = input.split('-');
            return inputArr.length;
        } else if (input.length > 0) {
            return 1;
        } else {
            return 0;
        }
    };

    validator.lessWordsThan = function(input, n) {
        if (input === null || input === undefined || n === null || n === undefined) throw "Missing Parameter(s) in lessWordsThan function: 'input and/or n'.";
        if(typeof n !== "number") throw "Parameter(s) in lessWordsThan function in not of type number: 'n'.";
        var wordCount = this.countWords(input);
        return wordCount <= n;
    };

    validator.moreWordsThan = function(input, n) {
        if (input === null || input === undefined || n === null || n === undefined ) throw "Missing Parameter(s) in moreWordsThan function: 'input and/or n'.";
        if(typeof n !== "number") throw "Parameter(s) in moreWordsThan function in not of type number: 'n'.";
        var wordCount = this.countWords(input);
        return wordCount >= n;
    };

    validator.isBetween = function(input, floor, ceil) {
        if (input === null || input === undefined || floor === null || floor === undefined || ceil === null || ceil === undefined) throw "Missing Parameter(s) in isBetween function: 'input, floor and/or ceil'.";
        if(typeof floor !== "number" || typeof ceil !== "number") throw "Parameter(s) in isBetween function in not of type number: 'floor or ceil'.";
        var wordCount = this.countWords(input);
        return wordCount >= floor && wordCount <= ceil;
    };

    validator.isAlphanumeric = function(input) {
        if (input === null || input === undefined) throw "Missing Parameter in isAlphanumeric function: 'input'.";
        var inputArr = input.split('');

        // account for empty strings
        if(input.length === 0) return true;

        for(var i=0; i < inputArr.length; i++){
            for (var x=0; x < validator.alphanumeric.length; x++) {

                if(validator.alphanumeric.indexOf(inputArr[i]) === -1) { return false; }
            }
        }
        return true;
    };

    validator.isCreditCard = function(input) {
        if (!input) throw "Missing Parameter in isCreditCard function: 'input'.";
        var inputArr = [];

        if (input.includes('-') || input.includes(' ')) {
            inputArr = input.includes('-') ? input.split('-') : input.split(' ');
            // first check that its alphanumeric and if each array is 4 digits long
            for(var i = 0; i < inputArr.length; i++) {
                if(this.isAlphanumeric(inputArr[i]) === false || inputArr[i].length !== 4) {
                    return false;
                }
            }
        } else {
            // check the input is alphanumeric
            if(this.isAlphanumeric(input) === false || input.length !== 16) {
                return false;
            }
        }

        // if you made it through all the checks you must be valid so...
        return true;
    };

    validator.isHex = function(input) {
        if (!input) throw "Missing Parameter in isHex function: 'input'.";
        var validHexValues = ["A","a","B","b","C","c","D","d","E","e","F","f","0","1","2","3","4","5","6","7","8","9"],
            inputArr = [];

        // Check for # because there no reason to proceed if thats not included
        if (!input.includes('#')) {return false;}

        inputArr = input.replace('#', '').split('');
        for(var i=0; i < inputArr.length; i++){
            for (var x=0; x < validHexValues.length; x++) {

                if((validHexValues.indexOf(inputArr[i]) === -1) || (inputArr.length !== 6 && inputArr.length !== 3)) { return false; }
            }
        }
        return true;
    };

    validator.isRGB = function(input) {
        if (!input) throw "Missing Parameter in isRGB function: 'input'.";
        var value = '';
        // Before we do anything, check to make sure the certain components exist and
        // if they exist in the correct locations otherwise there is no reason to continue so return false
        if(!input.startsWith('rgb(') || !input.endsWith(')')) {
            return false;
        }

        // Get rgb values
        inputArr = input.replace('rgb(','').replace(')','').split(',');

        // check to make sure the array length equal to 3 otherwise it isn't in a valid rgb
        // format so might as well return false
        if(inputArr.length !== 3) {
            return false;
        }

        // finally we check to make sure the values fall between 0 and 255 otherwise return false
        for (var i = 0; i < inputArr.length; i++) {
            value = parseInt(inputArr[i]);
            if (value < 0 || value > 255) {
                return false;
            }
        }

        // if the input has made it through teh gauntlet of checks it must be valid
        return true;
    };

    validator.isHSL = function(input) {
        if (!input) throw "Missing Parameter in isHSL function: 'input'.";
        var hValue, sValue, lValue;
        // Before we do anything, check to make sure the certain components exist and
        // if they exist in the correct locations otherwise there is no reason to continue so return false
        if(!input.startsWith('hsl(') || !input.endsWith(')')) {
            return false;
        }

        // Get rgb values
        inputArr = input.replace('rgb(','').replace(')','').split(',');

        // check to make sure the array length equal to 3 otherwise it isn't in a valid rgb
        // format so might as well return false
        if(inputArr.length !== 3) {
            return false;
        }

        // check to make sure the values fall between 0 and 360 for Hue and 0 and 1 for saturation and lightness otherwise return false
        hValue = parseInt(inputArr[0]);
        if (hValue < 0 || hValue > 360) {
            return false;
        }
        sValue = parseInt(inputArr[1]);
        lValue = parseInt(inputArr[2]);
        if (sValue < 0 || sValue > 1 || lValue < 0 || lValue > 1) {
            return false;
        }

        // if the input has made it through teh gauntlet of checks it must be valid
        return true;
    };

    validator.isColor = function(input) {
        if (!input) throw "Missing Parameter in isColor function: 'input'.";

        if(input.includes('#')) {
            return this.isHex(input);
        } else if(input.includes('rgb(')) {
            return this.isRGB(input);
        } else if(input.includes('hsl(')){
            return this.isHSL(input);
        } else {
            return false;
        }
    };

    validator.isTrimmed = function(input) {
        if (!input) throw "Missing Parameter in isTrimmed function: 'input'.";
        return input.split(' ').filter(n => n).join(' ') === input;
    };

    // export validator to the window object.
    window.validator = validator;
})(window);