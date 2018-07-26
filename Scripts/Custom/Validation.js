
//==============Global Variable Section==============//
const charMaxLength = 128, numMaxLength = 10;
//==============Global Variable Section==============//


//==============New Utility==============//

function postalCodeValidator() {
    var validatorId = $(this).attr('id');
    var textInput = document.getElementById(validatorId).value;
    if (textInput.length > 6) {
        textInput = textInput.substr(0, 6);
        document.getElementById(validatorId).value = textInput;
        postalFlag = true;
        return false;
    } else if (textInput.length < 4) {
        $("#errorMessage").html("Postal Code should be more than 4 letters.");
        postalFlag = false;
        return false;
    } else if (textInput.length >= 4) {
        $("#errorMessage").html("");
        postalFlag = true;
    }
    postalFlag = true;
}
function validateOnlyAlphabets() {
    var validatorId = $(this).attr('id');
    var textInput = document.getElementById(validatorId).value;
    textInput = textInput.replace(/[^A-Za-z]/g, "");
    if (textInput.length > charMaxLength) {
        textInput = textInput.substr(0, charMaxLength);
    }
    document.getElementById(validatorId).value = textInput;
}
function validateOnlyEmail() {
    var validatorId = $(this).attr('id');
    inputEmail = document.getElementById(validatorId).value;
    var reEmail = /^([\w\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!inputEmail.match(reEmail)) {
        $("#errorMessage").html("Invalid email address.");
        emailFlag = false;
        return false;
    }
    $("#errorMessage").html("");
    emailFlag = true;
    return true;
}

function decimalpointcheck()   // to validate input with only two decimal points
{


    var $this = $(this);
    if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
       ((event.which < 48 || event.which > 57) &&
       (event.which != 0 && event.which != 8))) {
        event.preventDefault();
    }

    var text = $(this).val();
    if ((event.which == 46) && (text.indexOf('.') == -1)) {
        setTimeout(function () {
            if ($this.val().substring($this.val().indexOf('.')).length > 3) {
                $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
            }
        }, 1);
    }

    if ((text.indexOf('.') != -1) &&
        (text.substring(text.indexOf('.')).length > 3) &&
        (event.which != 0 && event.which != 8) &&
        ($(this)[0].selectionStart >= text.length - 3)) {
        event.preventDefault();
    }
}
function decimalValidator() {
    var validatorId = $(this).attr('id');
    var textInput = document.getElementById(validatorId).value;
    textInput = textInput.replace(/[^\d\.]/g, "");
    document.getElementById(validatorId).value = textInput;
}
function validateOnlyNumbers() {
    var validatorId = $(this).attr('id');
    var textInput = document.getElementById(validatorId).value;
    textInput = textInput.replace(/[^0-9]/g, "");
    if (textInput.length > numMaxLength) {
        textInput = textInput.substr(0, numMaxLength);
    }
    document.getElementById(validatorId).value = textInput;
}
function lengthRestrictor() {
 
    var validatorId = $(this).attr('id');
    var lengthValue = (validatorId == 'txtMobile') ? 10 : 32;
    if (validatorId == 'txtMobile') {
        lengthValue = 10;
    } else if (validatorId == 'adminPostalCode') {
        lengthValue = 5;
    } else {
        lengthValue = 32;
    }
    var textInput = document.getElementById(validatorId).value;
    if (textInput.length > lengthValue) {
        textInput = textInput.substr(0, lengthValue);
        document.getElementById(validatorId).value = textInput;
    }
}
function validateOnlyNumbers() {
    var validatorId = $(this).attr('id');
    var textInput = document.getElementById(validatorId).value;
    textInput = textInput.replace(/[^0-9]/g, "");
    if (textInput.length > numMaxLength) {
        textInput = textInput.substr(0, numMaxLength);
    }
    document.getElementById(validatorId).value = textInput;
}
function checkEmail(id) {
    inputEmail = document.getElementById(id).value;
    var reEmail = /^([\w\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!inputEmail.match(reEmail)) {
        return false;
    }
    return true;
}

function dateFormatter(date) {
    var formatedDate =new Date(date);
    var year = formatedDate.getFullYear();
    var month = formatedDate.getMonth() + 1;
    var day = formatedDate.getDate();
    if (day < 9) {
        day = '0' + day;
    }
    if (month < 9) {
        month = '0' + month;
    }
    formatedDate = year + "-" + month + "-" + day;
    return formatedDate;
}
//================================================================//

//=====================Cursor shifter for OTP input=======================//
var inputs = $(".cursorshifter").keyup(function (event) {
    var validatorId = $(this).attr('id');
    var textInput = document.getElementById(validatorId).value;
    textInput = textInput.replace(/[^0-9]/g, "");
    document.getElementById(validatorId).value = textInput;
    if (this.value.length == this.maxLength && validatorId != "opt6") {
        var nextInput = inputs.get(inputs.index(this) + 1);
        if (nextInput) {
            nextInput.focus();
        }
    } else if (validatorId == "opt6" && this.value.length == this.maxLength) {
        $("#btnMobileProceed").focus();
    }
});
//========================================================//
$('#pasw2,#confirmPassSignUp,#passwordSignIn').keypress(function (e) {
    var validatorId = $(this).attr('id');
    if (validatorId == 'pasw2') {
        if (e.which == 13) {//Enter key pressed
            $('#schoolProceedSignUp').click();//Trigger search button click event
        }
    } else if (validatorId == 'confirmPassSignUp') {
        if (e.which == 13) {//Enter key pressed
            $('#proceedSignUp').click();//Trigger search button click event
        }
    } else if (validatorId == 'passwordSignIn') {
        if (e.which == 13) {//Enter key pressed
            $('#loginButton').click();//Trigger search button click event
        }
    }
}); 
function decimalValidator() {
    var validatorId = $(this).attr('id');
    var textInput = document.getElementById(validatorId).value;
    textInput = textInput.replace(/[^\d\.]/g, "");
    document.getElementById(validatorId).value = textInput;
}
function checkPasswordValidation(value) {
    //var validatorId = $(this).attr('id');
    //var value = document.getElementById(validatorId).value;
    //var pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{9})$/;
    if (!value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{9})$/)) {
        return false;
    }
    return true;
}
function CheckPasswordStrength(password) {
    var password_strength = document.getElementById("password_strength");
    //TextBox left blank.
    var flag = false;
    if (password.length == 0) {
        password_strength.innerHTML = "";
        return;
    }
    //Regular Expressions.
    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#-?&]"); //Special Character.
    var passed = 0;
    //Validate for each Regular Expression.
    for (var i = 0; i < regex.length; i++) {
        if (new RegExp(regex[i]).test(password)) {
            //passed++;
            flag = true;
        }
        if (i == regex.length - 1) {
            return flag;
        }
        flag = false;
    }
    //Validate for length of Password.
    if (passed > 2 && password.length > 8) {
        passed++;
    }
    //Display status.
    var color = "";
    var strength = "";
    switch (passed) {
        case 0:
        case 1:
            strength = "Weak";
            color = "red";
            break;
        case 2:
            strength = "Good";
            color = "darkorange";
            break;
        case 3:
        case 4:
            strength = "Strong";
            color = "green";
            break;
        case 5:
            strength = "Very Strong";
            color = "darkgreen";
            break;
    }
    password_strength.innerHTML = strength;
    password_strength.style.color = color;
}