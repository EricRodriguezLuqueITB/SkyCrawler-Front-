const cerebro = new DataManager();
const UI = new UIManager(cerebro.getNumLevels());
let jugador = new Jugador("Carlos",2,"Barcelona");

document.getElementById("loginButton").addEventListener("click",comprobarPeticion)

function comprobarPeticion(event)
{
    document.getElementsByTagName("main")[0].innerHTML = "";
    UI.printarMenu();

    // event.preventDefault();
    // const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    
    // // Validar que los campos no estén vacíos
    // if (username.trim() === "" || password.trim() === "") {
    //   alert("Por favor ingrese su nombre de usuario y contraseña.");
    //   return;
    // }
    // fetch("/login", {
    //     method: "POST",
    //     body: JSON.stringify({ username, password }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.success) {
    //       // redirigir al usuario a la página de inicio
    //       document.getElementsByTagName("main")[0].innerHTML = "";

    //     } else {
    //       alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
    //     }
    //   })
    //   .catch(error => console.error(error));
}

function printarNiveles()
{
    UI.printarNiveles(jugador);
}

function printarMenu()
{
    UI.printarMenu();
}

function printarNivel()
{
    UI.printarNivel();
}

function printarRanking(){
    UI.printarRanking();
}


