// This is the file that provides the functionality on the error.html page.
window.onload = redirect;

function redirect() {
    localStorage.setItem("user", JSON.stringify(null));
    localStorage.setItem("services",JSON.stringify(null));
    localStorage.setItem("cart",JSON.stringify(null));
    localStorage.setItem("chosenServices",JSON.stringify(null));
    setTimeout(() => {
        window.location.href = "../html/index.html"
    }, 4000);
}