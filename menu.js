const cerebro = new DataManager();
const UI = new UIManager(cerebro.getNumLevels());
const conexionBase = 'http://rolu.sytes.net:7053/';

var nombre_Jugador = localStorage.getItem("nombre_Jugador");
localStorage.removeItem("nombre_Jugador");

if(nombre_Jugador == null) window.location.replace("index.html");


let Jugador_Data;
let usuario;

getJugadorInfo();

setTimeout(() => {
    usuario = new Jugador(Jugador_Data.nombre_Jugador,Jugador_Data.nivel_actual,Jugador_Data.ciudad);   
    UI.printarMenu();
  }, 500);


async function getJugadorInfo(/* string */) {
    const datos = await cerebro.getJugadorInfo(nombre_Jugador);
    Jugador_Data =  datos;
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
