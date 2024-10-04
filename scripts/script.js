const userTrue = "admin";
const passTrue = "admin2024";

function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    let resultado = document.getElementById("resultado");
    if (user === userTrue && pass === passTrue) {
        resultado.style.color = "green";
        resultado.innerHTML = "Usuario correcto"
    } else {
        resultado.style.color = "red";
        resultado.innerHTML = "Usuario incorrecto"
        user = document.getElementById("user").value = "";
        pass = document.getElementById("password").value = "";

    }
}