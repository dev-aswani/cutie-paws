// This is the file that provides the functionality on the signup.html page, allowing the user to login
// to the website and also validating user input.
document.getElementById("signup-email").addEventListener("blur", validateEmail);
document.getElementById("signup-password").addEventListener("blur", validatePassword);
document.getElementById("signup-confirm-password").addEventListener("blur", validateConfirmPassword);

function triggerValidation() {
    validateEmail();
    validatePassword();
    validateConfirmPassword();
}

function displayValidationMsg(elementId, message) {
    const validationMsgElement = document.getElementById(elementId);
    validationMsgElement.innerText = message;
    validationMsgElement.style.display = message ? "block" : "none";
}


function validateEmail() {
    const email = document.getElementById("signup-email").value.trim();
    const emailValidationMsg = document.getElementById("email-validation-msg");
    const signupEmail = document.getElementById("signup-email");
    
    if (email === "") {
        displayValidationMsg("email-validation-msg", "Please enter an email address");
        signupEmail.style.marginBottom = '0px';
        emailValidationMsg.style.marginBottom = "27px";
        emailValidationMsg.style.marginTop = "2px";

    } else if (!/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(email)) {
        displayValidationMsg("email-validation-msg", "Please enter a valid email address");
        signupEmail.style.marginBottom = '0px';
        emailValidationMsg.style.marginBottom = "27px";
        emailValidationMsg.style.marginTop = "2px";
    } else {
        displayValidationMsg("email-validation-msg", "");
        signupEmail.style.marginBottom = '40px';
    }
}

function validatePassword() {
    const password = document.getElementById("signup-password").value.trim();
    const passwordValidationMsg = document.getElementById("password-validation-msg");
    const signupPassword = document.getElementById("signup-password");
    if (password === "") {
        displayValidationMsg("password-validation-msg", "Please enter a password");
        signupPassword.style.marginBottom = '0px';
        passwordValidationMsg.style.marginBottom = "27px";
        passwordValidationMsg.style.marginTop = "2px";


    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
        displayValidationMsg("password-validation-msg", "Password must contain at least 8 characters, including uppercase, lowercase, numeric, and special characters");
        signupPassword.style.marginBottom = '0px';
        passwordValidationMsg.style.marginBottom = "10px";
        passwordValidationMsg.style.marginTop = "2px";
        passwordValidationMsg.style.width = "250px";

    } else {
        displayValidationMsg("password-validation-msg", "");
        signupPassword.style.marginBottom = '40px';

    }
}

function validateConfirmPassword() {
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPasswordValidationMsg = document.getElementById("confirm-password-validation-msg");
    const signupConfirmPassword = document.getElementById("signup-confirm-password");
    if (confirmPassword === "") {
        displayValidationMsg("confirm-password-validation-msg", "Please enter the password again");
        signupConfirmPassword.style.marginBottom = '0px';
        confirmPasswordValidationMsg.style.marginBottom = "27px";
        confirmPasswordValidationMsg.style.marginTop = "2px";
    } else if (confirmPassword !== password) {
        displayValidationMsg("confirm-password-validation-msg", "Passwords do not match");
        signupConfirmPassword.style.marginBottom = '0px';
        confirmPasswordValidationMsg.style.marginBottom = "27px";
        confirmPasswordValidationMsg.style.marginTop = "2px";
    } else {
        displayValidationMsg("confirm-password-validation-msg", "");
        signupConfirmPassword.style.marginBottom = '40px';
    }
}

async function signup(event)  {
    event.preventDefault();
    const emailValidationMsg = document.getElementById("email-validation-msg");
    const signupEmail = document.getElementById("signup-email");
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
    const email = document.getElementById("signup-email").value.trim();

    triggerValidation();
    if (email === "" || !/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(email)) {
        return;
    }

    if (password === "" || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
        return;
    }

    if (confirmPassword !== password) {
        return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    try{

        const result = await createAccount({email, hashed_password: hashedPassword});
        if(result.confirmation === "fail"){
            let error = result.error;
            if(error.includes("Duplicate entry")){
                displayValidationMsg("email-validation-msg", "An account with this email already exists");
                signupEmail.style.marginBottom = '0px';
                emailValidationMsg.style.marginBottom = "27px";
                emailValidationMsg.style.marginTop = "2px";
                return;
            }
        } 
        window.location.href = '../html/afterSignup.html';
    }catch(error){
        window.location.href="../html/error.html"

    }
}

document.getElementById("signup-page-signup-button").addEventListener("click", signup);