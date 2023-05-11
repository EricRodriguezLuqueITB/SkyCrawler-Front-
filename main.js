

const cerebro = new DataManager();
const UI = new UIManager(4);
const conexionBase = 'http://rolu.sytes.net:7053/';
let ventanaProvincia;
//http://rolu.sytes.net:7053/swagger/index.html
//http://rolu.sytes.net:5567/SKYCRAWLER/


document.getElementById("loginForm").addEventListener("submit", comprobarPeticion);
document.getElementById("checkbox").addEventListener("click", cambiarFuncionalidad)
document.getElementById("username").focus();

document.getElementById("logo").addEventListener("click", () => { window.location.href = "http://rolu.sytes.net:5567/SKYCRAWLER/juego/aboutus.html" }); 

function cambiarFuncionalidad() {
  let checkbox = document.getElementById("checkbox");
  let h1 = document.getElementsByTagName("h1")[0];
  let button = document.getElementById("loginButton");

  if (checkbox.checked == true) {
    let string = "Registrar";
    h1.innerHTML = "";
    let i = 0;

    let intervaloR = setInterval(() => {
      if (i >= string.length - 1) clearInterval(intervaloR)
      h1.innerHTML += string[i];
      i++;
    }, 50);
  }
  else {
    let string = "Iniciar sesión";
    h1.innerHTML = "";
    let i = 0;

    let intervaloI = setInterval(() => {
      if (i >= string.length - 1) clearInterval(intervaloI);
      h1.innerHTML += string[i];
      i++;
    }, 50);
  }
}

function comprobarPeticion(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = cifradoXOR(document.getElementById("password").value, "DICE");
  let checkbox = document.getElementById("checkbox");

  // Validar que los campos no estén vacíos
  if (username.trim() === "" || password.trim() === "") {
    alert("Por favor ingrese su nombre de usuario y contraseña.");
    return;
  }

  fetch(conexionBase + 'api/jugador/' + username + ',' + password)
    .then(response => response.json())
    .then(data => {
      if (data == 0) {
        if (checkbox.checked == true) {
          printarPopUp();
          window.close();

        }
        else {
          alert("Usuario no registrado en la base de datos")
        }
      }
      else if (data == 1) {
        alert("Contraseña incorrecta");
      }
      else {
        if (checkbox.checked == true) {
          alert("Usuario ya registrado");
        }
        else 
        {
          document.getElementsByTagName("main")[0].innerHTML = "";
          redirect(username);
        }
      }
    })
    .catch(error => console.error(error));
}


function redirect(nombre) {

  localStorage.setItem("nombre_Jugador", nombre);
  window.open("menu.html")
  window.close();
}



function printarPopUp() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  var datos = { nombre: username, pwd: password };
  window.open("popUp.html?datos=" + encodeURIComponent(JSON.stringify(datos)), "Provincia", "width=250,height=250");
}

function printarMenu() {
  UI.printarMenu();
}

function cifradoXOR(texto, clave) {
  let resultado = '';
  for (let i = 0; i < texto.length; i++) {
    let caracter = texto.charCodeAt(i) ^ clave.charCodeAt(i % clave.length);
    resultado += String.fromCharCode(caracter);
  }
  return resultado;
}