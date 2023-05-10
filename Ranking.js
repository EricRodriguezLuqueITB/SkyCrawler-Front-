const UI = new UIManager(8);

printarBarraControl();
printarRanking();

function printarBarraControl(){
    let main = document.getElementsByTagName("main")[0];
    let divBarraControl = document.createElement("div");
    divBarraControl.className = "barraControl";

    let buttonLogout = document.createElement("button");
    let imgLogout = document.createElement("img");
    imgLogout.setAttribute("src", "http://rolu.sytes.net:5567/SKYCRAWLER/elementos/cruz.png");
    imgLogout.setAttribute("alt", "Logout");
    imgLogout.style.background = "transparent";
    buttonLogout.appendChild(imgLogout);
    buttonLogout.addEventListener("click", function () {
        localStorage.removeItem("nombre_Jugador");
        window.location.replace('index.html');
    })

    divBarraControl.appendChild(buttonLogout);

    // Condicional creacion flecha
    if (main.className != "mainMenu") {
        let buttonBack = document.createElement("button");
        let imgBack = document.createElement("img");
        imgBack.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/000/365/868/original/left-vector-icon.jpg");
        imgBack.setAttribute("alt", "Logout");
        buttonBack.appendChild(imgBack);
        buttonBack.addEventListener("click", irMenu)
        divBarraControl.appendChild(buttonBack);
    }
    main.appendChild(divBarraControl);
}


function irMenu(){
    window.location.replace("menu.html");
}

function printarRanking(data/* Nivel */) 
{

    document.getElementById("logo").style.display = "none";
    console.log(data);
    let main = document.getElementsByTagName("main")[0];
    main.className = "mainNiveles"
    main.innerHTML = "";
    this.printarBarraControl();

    let rankingH1 = document.createElement("h1");
    rankingH1.textContent = "RANKING";
    main.appendChild(rankingH1);

    let section = document.createElement("section");
    section.className = "sectionRanking";

    let divMapa = document.createElement("div");
    divMapa.id = "map";
    section.appendChild(divMapa);

    let divRanking = document.createElement("div");
    divRanking.id = "divRanking";
    section.appendChild(divRanking);
    main.appendChild(section);
}

conexionBase = 'http://rolu.sytes.net:7053/';

let data;
CargarDatos();

async function CargarProvincias() {
87
    let cerebro = new DataManager();
    let datos = await cerebro.getLocalizaciones();
    return datos;
}

async function CargarDatos() 
{
    let provincias = await CargarProvincias();

    const urlActual = new URL(window.location.href);
    const datosCodificados = urlActual.searchParams.get("ranking_data");
    data = JSON.parse(datosCodificados);   

//     <table id="mi-tabla">
//       <thead>
//         <tr>
//           <th>NombreJugador</th>
//           <th>Nivel</th>
//           <th>Tiempo</th>
//         </tr>
//       </thead>
//       <tbody>
//       </tbody>
//     </table>

// <script>
// // Obtener la referencia a la tabla
// const tabla = document.querySelector('#mi-tabla tbody');

// // Función para agregar una nueva fila a la tabla con los valores pasados como argumentos
// function agregarFila(nombreJugador, nivel, tiempo) {
//   // Crear una nueva fila con los valores pasados
//   const fila = document.createElement('tr');
//   for (let i = 0; i< data.length; i++) {
//   fila.innerHTML = `
//     <td>${data[i].nombre_Jugador}</td>
//     <td>${data[i].nivel}</td>
//     <td>${data[i].tiempo}</td>
//   `;
//   }
//   // Agregar la nueva fila a la tabla
//   tabla.appendChild(fila);
// }
// </script>
}
