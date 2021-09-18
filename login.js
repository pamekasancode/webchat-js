const formLogin = document.getElementById("form-login")
const usernameInput = document.getElementById("username")

formLogin.addEventListener("submit", Login)

function Login(e) {
    e.preventDefault()
    let username = usernameInput.value.charAt(0).toUpperCase() + usernameInput.value.slice(1);

    if(username.length < 4 || username.length > 12) {
        alert("Username Minimal 4 Karakter dan Maximal 12 Karakter")
        return
    }

    localStorage.setItem("chat-js", username)    
    window.location.replace("index.html");
}
