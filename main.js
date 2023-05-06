const cerebro = new DataManager();
const UI = new UIManager(cerebro.getNumLevels());
let jugador;
const conexionBase = 'http://rolu.sytes.net:7053/';
let ventanaProvincia;

document.getElementById("loginForm").addEventListener("submit",comprobarPeticion);

function comprobarPeticion(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Validar que los campos no estén vacíos
    if (username.trim() === "" || password.trim() === "") {
      alert("Por favor ingrese su nombre de usuario y contraseña.");
      return;
    }
  
    fetch(conexionBase + 'api/jugador/' + username +','+password)
      .then(response => response.json())
      .then(data => {
        if(data == 0)
        {
            if(event.submitter.value == "Registrarse")
            {
                printarPopUp();   
            }
            else
            {
                alert("Usuario no registrado en la base de datos")
            } 
        }
        else if(data == 1)
        {
            alert("Contraseña incorrecta");
        }
        else
        {
            document.getElementsByTagName("main")[0].innerHTML = "";
            printarMenu();
        }
      })
      .catch(error => console.error(error));
  }


async function generarNuevoUsuario()
{
    // let provincia = ventanaProvincia.document.getElementById("opciones").value;
    // const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    
    console.log(ventanaProvincia.document.getElementById("opciones").value);
    await fetch(conexionBase + 'api/jugador/'+ document.getElementById("username").value + ','+document.getElementById("password").value + ','+ventanaProvincia.document.getElementById("opciones").value)
    .then(response => console.log(response.json()))
    ventanaProvincia.close();
}

async function printarPopUp()
{
    ventanaProvincia = window.open("popUp.html","Provincia","width=500,height=500"); 
    let provincias = await cerebro.getLocalizaciones();
    UI.printarSelectIdioma(provincias,ventanaProvincia);
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


