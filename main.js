const cerebro = new DataManager();
const UI = new UIManager(cerebro.getNumLevels());
const conexionBase = 'http://rolu.sytes.net:7053/';
let ventanaProvincia;
//http://rolu.sytes.net:7053/swagger/index.html

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
                //redirect 
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
            // printarMenu();
            redirect(username);
        }
      })
      .catch(error => console.error(error));
  }


  function redirect(nombre) {

    localStorage.setItem("nombre_Jugador",nombre);
    window.open("menu.html")
    window.close();
  }

async function generarNuevoUsuario()
{
    const data = {
        nombre_Jugador: document.getElementById("username").value,
        contraseña: document.getElementById("password").value,
        nivel_Actual:1,
        ciudad: ventanaProvincia.document.getElementById("opciones").value
      };
      
      await fetch(conexionBase + 'api/jugador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    ventanaProvincia.close();
}

async function printarPopUp()
{
    ventanaProvincia = window.open("popUp.html","Provincia","width=500,height=500"); 
    let provincias = await cerebro.getLocalizaciones();
    UI.printarSelectProvincia(provincias,ventanaProvincia);
}

function printarMenu()
{
    UI.printarMenu();
}


