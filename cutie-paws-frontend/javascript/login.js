// This is the file that provides the functionality on the login.html page, allowing the user to login to
// the website and also validating user input.
document.getElementById("login-email").addEventListener("blur", validateEmail);
document.getElementById("login-password").addEventListener("blur", validatePassword);

function triggerValidation() {
    validateEmail();
    validatePassword();
}

function displayValidationMsg(elementId, message) {
    const validationMsgElement = document.getElementById(elementId);
    validationMsgElement.innerText = message;
    validationMsgElement.style.display = message ? "block" : "none";
}

function displayValidationMsg(elementId, message) {
    const validationMsgElement = document.getElementById(elementId);
    validationMsgElement.innerText = message;
    validationMsgElement.style.display = message ? "block" : "none";
}


function validateEmail() {
    const email = document.getElementById("login-email").value.trim();
    const emailValidationMsg = document.getElementById("email-validation-msg");
    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");

    if (email === "") {
        displayValidationMsg("email-validation-msg", "Please enter an email address");
        loginEmail.style.marginBottom = '0px';
        emailValidationMsg.style.marginBottom = "27px";
        emailValidationMsg.style.marginTop = "2px";


    } else if (!/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(email)) {
        displayValidationMsg("email-validation-msg", "Please enter a valid email address");
        loginEmail.style.marginBottom = '0px';
        emailValidationMsg.style.marginBottom = "27px";
        emailValidationMsg.style.marginTop = "2px";


    } 
    else {
        displayValidationMsg("email-validation-msg", "");
        loginEmail.style.marginBottom = '40px';

    }
}

function validatePassword() {
    
    const password = document.getElementById("login-password").value.trim();
    const emailValidationMsg = document.getElementById("email-validation-msg");
    const passwordValidationMsg = document.getElementById("password-validation-msg");
    const loginPassword = document.getElementById("login-password");
    if (password === "") {
        displayValidationMsg("password-validation-msg", "Please enter a password");
        loginPassword.style.marginBottom = '0px';
        passwordValidationMsg.style.marginBottom = "27px";
        passwordValidationMsg.style.marginTop = "2px";

    }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
        displayValidationMsg("password-validation-msg", "Password must contain at least 8 characters, including uppercase, lowercase, numeric, and special characters");
        loginPassword.style.marginBottom = '0px';
        passwordValidationMsg.style.marginBottom = "10px";
        passwordValidationMsg.style.marginTop = "2px";
        passwordValidationMsg.style.width = "250px";

    }
    else {
        displayValidationMsg("password-validation-msg", "");
        loginPassword.style.marginBottom = '40px';
    }
}
document.getElementById("login-page-login-button").addEventListener("click", handleLogin)
async function handleLogin (event) {
    event.preventDefault();
    const loginEmail = document.getElementById("login-email");
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();
    let hashedPassword = CryptoJS.SHA256(password).toString();
    const loginPassword = document.getElementById("login-password");
    const emailValidationMsg = document.getElementById("email-validation-msg");
    const passwordValidationMsg = document.getElementById("password-validation-msg");
    triggerValidation();
    if (email === "" || !/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(email)) {
        return;
    }

    if (password === "" || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
        return;
    }

    
    
    try {
        const userExists=await checkIfAccountExists(email)
        console.log(userExists);
        if(userExists.confirmation==="fail"){
            let error=userExists.error;
            console.log(error);
            if(error.includes("doesn't exist")){
                console.log("hi from here")
                displayValidationMsg("email-validation-msg", "An account with this email doesn't exist");
                loginEmail.style.marginBottom = '0px';
                emailValidationMsg.style.marginBottom = "27px";
                emailValidationMsg.style.marginTop = "2px";
                return;

            }
        }
        const authenticateUser = await login({email, hashed_password: hashedPassword});
        if(authenticateUser.confirmation === "fail"){
            let error = authenticateUser.error;
            if(error.includes("invalid")){
                displayValidationMsg("password-validation-msg", "Invalid password");
                loginPassword.style.marginBottom = '0px';
                passwordValidationMsg.style.marginBottom = "27px";
                passwordValidationMsg.style.marginTop = "2px";
                return;
            }
        } 
        localStorage.setItem("user", JSON.stringify(authenticateUser.data)) 
        const services = await getServices();
        if(services.confirmation === "fail"){
            window.location.href="../html/error.html"
        }
        localStorage.setItem("services", JSON.stringify(services.data));
        const cart = await getCart(email);
        if(cart.confirmation === "fail"){
            window.location.href="../html/error.html"
        }
        localStorage.setItem("cart", JSON.stringify(cart.data));
        const chosenServices = await getChosenServices(email);
        if(chosenServices.confirmation === "fail"){
            window.location.href="../html/error.html"
        }
        localStorage.setItem("chosenServices", JSON.stringify(chosenServices.data));
        window.location.href = "../html/allServices.html";
    } catch (error) {
        window.location.href="../html/error.html";
    }
}