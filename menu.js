const cerebro = new DataManager();
const conexionBase = 'https://skycrawler.azurewebsites.net/';
let UI;

var nombre_Jugador = localStorage.getItem("nombre_Jugador");
if (nombre_Jugador == null) window.location.replace("index.html");

document.body.addEventListener("load", CargarDatos());

let usuario;
let niveles;
let nivelesCopia; // Para resetear los niveles más tarde (por el cambio de puertas)
let recursos;
let jugador_Data;
let personaje = new Personaje();

async function CargarDatos() 
{
    jugador_Data = await cerebro.getInfo("jugador", nombre_Jugador);
    niveles = await cerebro.getInfo("nivel", "");
    niveles = niveles.sort((primero, segundo) => {
        if(primero.id_Nivel > segundo.id_Nivel) return 1;
        if(primero.id_Nivel < segundo.id_Nivel) return -1;
        return 0;
    })
    console.log(niveles);
    nivelesCopia = niveles;
    recursos = await cerebro.getInfo("elemento", "");

    usuario = new Jugador(jugador_Data.nombre_jugador, jugador_Data.nivel_actual, jugador_Data.ciudad);
    UI = new UIManager(niveles.length);
    UI.printarMenu();
}

function CargarNiveles() 
{
    niveles = nivelesCopia;
}

async function acabarNivel(personaje, victoria) 
{
    personaje.cronometro(false);
    if(victoria)
    {
        if(personaje.nivelActual >= usuario.NivelMaximo)
        {
            console.log(usuario.Nombre);
            console.log(usuario.NivelMaximo);
            usuario.NivelMaximo++;
            await cerebro.updateJugador(usuario.Nombre, usuario.NivelMaximo);
            delete personaje;
        }
        await cerebro.insertPuntuacion(usuario.Nombre, personaje.tiempo, personaje.nivelActual, usuario.Ciudad);
    }
    //UI.printarFinalNivel(victoria);
    console.log("End ------ Victoria: " + victoria);
    // Manda los datos al ranking si victoria = true
    //
    this.CargarNiveles();
    UI.printarFinalNivel(victoria,personaje.nivelActual);

}

async function cargarRanking() {
    let rankingData = await cerebro.getInfo("ranking", "")
    console.log(rankingData);

    window.open("MapaRanking.html");
    //UI.printarRanking(ranking_Data);
}

function printarMenu() 
{
    personaje.cronometro(false);
    personaje.tiempo = 0; 
    UI.printarMenu();
}

function printarNivel(event) {

    UI.printarNivel(niveles, event, personaje);
}

function printarNiveles() {
    UI.printarNiveles(usuario, niveles);
}

