const cerebro = new DataManager();
const UI = new UIManager(cerebro.getNumLevels());
const conexionBase = 'http://rolu.sytes.net:7053/';
let ventanaProvincia;
//http://rolu.sytes.net:7053/swagger/index.html
//http://rolu.sytes.net:5567/SKYCRAWLER/

document.getElementById("loginForm").addEventListener("submit",comprobarPeticion);
document.getElementById("checkbox").addEventListener("click",cambiarFuncionalidad)


function cambiarFuncionalidad()
{
  let checkbox = document.getElementById("checkbox");
  let h1 = document.getElementsByTagName("h1")[0];
  let button = document.getElementById("loginButton");

  if(checkbox.checked == true){
    let string = "Registrar";
    h1.innerHTML = "";
    let i = 0;
    
    let intervaloR = setInterval(() => {
      if(i >= string.length - 1) clearInterval(intervaloR)
      h1.innerHTML += string[i];
      i++;
    }, 50);
  }
  else{
    let string = "Iniciar sesión";
    h1.innerHTML = "";
    let i = 0;
    
    let intervaloI = setInterval(() => {
      if(i >= string.length - 1) clearInterval(intervaloI)
      h1.innerHTML += string[i];
      i++;
    }, 50);
  }
}

function comprobarPeticion(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let checkbox = document.getElementById("checkbox");
  
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
            if(checkbox.checked == true)
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
    redirect(username);
}

async function printarPopUp()
{
    ventanaProvincia = window.open("popUp.html","Provincia","width=250,height=250"); 
    let provincias = await cerebro.getLocalizaciones();
    UI.printarSelectProvincia(provincias,ventanaProvincia);
}

function printarMenu()
{
    UI.printarMenu();
}