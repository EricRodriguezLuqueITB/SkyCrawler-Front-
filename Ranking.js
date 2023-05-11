const UI = new UIManager(8);
const cerebro = new DataManager();

let conexionBase = 'http://rolu.sytes.net:7053/';
let data;
let datosJugadoresRanking;
let datosRankingNivel;
var nombre_Jugador = localStorage.getItem("nombre_Jugador");
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
        imgBack.setAttribute("src", "http://rolu.sytes.net:5567/SKYCRAWLER/elementos/volver.png");
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

function printarRanking() 
{

    document.getElementById("logo").style.display = "none";

    document.body.style.backgroundImage = "url('http://rolu.sytes.net:5567/SKYCRAWLER/elementos/fondotitulo.png')";

    let main = document.getElementsByTagName("main")[0];
    main.className = "mainNiveles"
    main.innerHTML = "";
    this.printarBarraControl();

    let rankingH1 = document.createElement("h1");
    rankingH1.id = "tituloRanking";
    rankingH1.textContent = "Ranking";
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

CargarDatosRanking();
async function CargarDatosRanking() 
{
    let cerebro = new DataManager();
    let datos = await cerebro.getInfo("ranking","");
    datosJugadoresRanking = datos;

    datosRankingNivel = datosJugadoresRanking.filter(jugador => jugador.nivel_Guardado == 1).sort((primero, segundo) => {
        if(primero.tiempo > segundo.tiempo) return 1;
        if(primero.tiempo < segundo.tiempo) return -1;
        return 0;
    });
    
    crearSelectorNivel();
    datosJugadorRanking();
}

function crearSelectorNivel() {
    let selector = document.createElement("select");
    selector.addEventListener("change",cambiarRankingNivel);
    // selector.onchange = "cambiarRankingNivel";
    selector.id = "selectorNivel";
    let dive = document.getElementById("divRanking")

    for (let index = 1; index < 9; index++) {
        let optionNivel = document.createElement("option");
        optionNivel.value = index;
        optionNivel.textContent = "Nivel " + index;
        selector.appendChild(optionNivel);
    }

    dive.appendChild(selector)
    
}

function cambiarRankingNivel() {
    document.getElementsByTagName("table")[0].remove();

    let nivel = document.getElementById("selectorNivel").value;
    datosRankingNivel = datosJugadoresRanking.filter(jugador => jugador.nivel_Guardado == nivel).sort((primero, segundo) => {
        if(primero.tiempo > segundo.tiempo) return 1;
        if(primero.tiempo < segundo.tiempo) return -1;
        return 0;
    });
    datosJugadorRanking();
}

function datosJugadorRanking(){

    let tabla = document.createElement("table");

    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let thText = document.createTextNode("Nº");
    th.appendChild(thText);
    tr.appendChild(th);

    th = document.createElement("th");
    thText = document.createTextNode("Nombre");
    th.appendChild(thText);
    tr.appendChild(th);
 
    th = document.createElement("th");
    thText = document.createTextNode("Tiempo");
    th.appendChild(thText);
    tr.appendChild(th);

    th = document.createElement("th");
    thText = document.createTextNode("Ciudad");
    th.appendChild(thText);
    tr.appendChild(th);


    tabla.appendChild(tr)

    tr = document.createElement("tr");
    for (let i = 0; i < datosRankingNivel.length && i < 15; i++) {
        
        let tdText;
        let td;

        tr = document.createElement("tr");

        td = document.createElement("td");
        tdText = document.createTextNode(i + 1);
        td.appendChild(tdText);
        tr.appendChild(td);

        td = document.createElement("td");
        tdText = document.createTextNode(datosRankingNivel[i].nombre_Jugador);
        td.appendChild(tdText);
        tr.appendChild(td);
    
        td = document.createElement("td");
        tdText = document.createTextNode(tiempoString(datosRankingNivel[i].tiempo));
        td.appendChild(tdText);
        tr.appendChild(td);

        td = document.createElement("td");
        td.style.borderRight = "1px black";
        tdText = document.createTextNode(datosRankingNivel[i].ciudad);
        td.appendChild(tdText);
        tr.appendChild(td);

        if(nombre_Jugador == "admin")
        {
            td = document.createElement("td");
            td.style.borderRight = "1px black";
            tdText = document.createTextNode("X");
            td.appendChild(tdText);
            td.addEventListener("click",()=>
            {
                eliminarJugadorRanking(datosRankingNivel[i].nombre_Jugador,datosRankingNivel[i].tiempo,datosRankingNivel[i].nivel_Guardado);
                document.getElementsByTagName("table")[0].remove();
                datosJugadorRanking();

            })
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
    let dive = document.getElementById("divRanking");

    dive.appendChild(tabla);
 
}

async function eliminarJugadorRanking(nombre_Jugador, tiempo, nivel_Guardado)
{
    await fetch(conexionBase + 'api/ranking/' + nombre_Jugador + "," + tiempo + "," + nivel_Guardado,{
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data =>window.location.reload())
      .catch(error => console.error(error))
}

function tiempoString(tiempo) {
     if(tiempo < 60) {
         if(tiempo < 10) return "00:0" + tiempo;
         return "00:" + tiempo;
     }
     if(tiempo % 60 < 10) return Math.round(tiempo / 60) + ":0" + tiempo % 60;
     if(Math.round(tiempo / 60) < 10) return "0" + Math.round(tiempo / 60) + ":" + tiempo % 60;
     return Math.round(tiempo / 60) + ":" + tiempo % 60;
 }
