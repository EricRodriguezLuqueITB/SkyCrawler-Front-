const cerebro = new DataManager();
const conexionBase = 'http://rolu.sytes.net:7053/';
let UI;

var nombre_Jugador = localStorage.getItem("nombre_Jugador");
localStorage.removeItem("nombre_Jugador");
if (nombre_Jugador == null) window.location.replace("index.html");

document.body.addEventListener("load", CargarDatos());

let usuario;
let niveles;
let recursos;
let jugador_Data;

async function CargarDatos() 
{
    jugador_Data = await cerebro.getInfo("jugador", nombre_Jugador);
    niveles = await cerebro.getInfo("nivel", "");
    recursos = await cerebro.getInfo("elemento", "");

    usuario = new Jugador(jugador_Data.nombre_jugador, jugador_Data.nivel_actual, jugador_Data.ciudad);
    UI = new UIManager(niveles.length);
    UI.printarMenu();

}

async function cargarRanking() {
    let rankingData = await cerebro.getInfo("ranking", "")
    UI.printarRanking();
}

function printarNivel() {
    UI.printarNivel();
}

function printarMenu() {
    UI.printarMenu();
}

function printarNivel(event) {
    UI.printarNivel(niveles, event);
}

function printarNiveles() {
    UI.printarNiveles(usuario);
}

