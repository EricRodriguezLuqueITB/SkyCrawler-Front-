const cerebro = new DataManager();
const conexionBase = 'http://rolu.sytes.net:7053/';
let UI;

var nombre_Jugador = localStorage.getItem("nombre_Jugador");
localStorage.removeItem("nombre_Jugador");

if(nombre_Jugador == null) window.location.replace("index.html");

let usuario;
let niveles;
let recursos;
let jugador_Data;

getInfo("jugador",nombre_Jugador).then((contenido) => {
    jugador_Data =  contenido
});

getInfo("elemento","").then((contenido) => {
    recursos =  contenido
});

getInfo("nivel","").then((contenido) => {
    niveles =  contenido
});





setTimeout(() => {
    usuario = new Jugador(jugador_Data.nombre_jugador,jugador_Data.nivel_actual,jugador_Data.ciudad);  
    UI = new UIManager(niveles.length);
    UI.printarMenu();
    console.log(recursos);
    console.log(usuario);
    console.log(niveles);
  }, 800);
  


function getInfo(path /* string */, datos) {
    // Pide a la Api la información referente a un usuario con nombreJugador = Usuario
    return cerebro.getInfo(path,datos);
}

function printarRanking(){
    UI.printarRanking();
}

function printarNivel()
{
    UI.printarNivel();
}

function printarMenu()
{
    UI.printarMenu();
}

function printarNivel()
{
    UI.printarNivel();
}

function printarNiveles()
{
    UI.printarNiveles(usuario);
}

