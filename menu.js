const cerebro = new DataManager();
const UI = new UIManager(cerebro.getNumLevels());
const conexionBase = 'http://rolu.sytes.net:7053/';

var nombre_Jugador = localStorage.getItem("nombre_Jugador");

// const Jugador_Data = cerebro.getJugadorInfo(nombre_Jugador);

const jugador = new Jugador("admin",1,"Barcelona")

UI.printarMenu();

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
    UI.printarNiveles(jugador);
}
