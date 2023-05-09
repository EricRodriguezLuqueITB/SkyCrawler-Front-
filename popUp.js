let cerebro = new DataManager();
const conexionBase = 'http://rolu.sytes.net:7053/';
let datos;

// document.addEventListener("load",CargarDatosProvincias);
CargarDatosProvincias();

async function CargarDatosProvincias()
{
    const urlActual = new URL(window.location.href);
    const datosCodificados = urlActual.searchParams.get("datos");
    datos = JSON.parse(decodeURIComponent(datosCodificados));

    let provincias = await cerebro.getLocalizaciones();

    printarSelectProvincia(provincias);

}

function printarSelectProvincia(array) 
{
    let form = document.getElementById("provinciaForm");
    let select = document.getElementById("opciones");
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("vaue", array[i].ciudad);
        option.textContent = array[i].ciudad;
        select.appendChild(option);
    }
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.addEventListener("click", generarNuevoUsuario)
    button.textContent = "Enviar";
    form.appendChild(button);
}

function redirect(nombre) {

    localStorage.setItem("nombre_Jugador",nombre);
    window.open("menu.html")
    window.close();
  }

async function generarNuevoUsuario()
{
    const data = {
        nombre_Jugador: datos.nombre,
        contraseña: cifradoXOR(datos.pwd,"DICE"),
        nivel_Actual: 1,
        ciudad: document.getElementById("opciones").value
      };

      console.log(data);
      
      await fetch(conexionBase + 'api/jugador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data =>redirect(datos.nombre))
      .catch(error => console.error(error))

}

function cifradoXOR(texto, clave) {
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
      let caracter = texto.charCodeAt(i) ^ clave.charCodeAt(i % clave.length);
      resultado += String.fromCharCode(caracter);
    }
    return resultado;
  }
