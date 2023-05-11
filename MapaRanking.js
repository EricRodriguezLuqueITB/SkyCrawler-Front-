let dataWat;
let provincias;
let selector; 
var map;

CargarDatos();

async function CargarProvincias() {

    let cerebro = new DataManager();
    let datos = await cerebro.getLocalizaciones();
    return datos;
}
async function CargarDatosRanking() 
{
    let cerebro = new DataManager();
    let datos = await cerebro.getInfo("ranking","");
    return datos

}
async function CargarDatos() 
{
    provincias = await CargarProvincias();
    dataWat = await CargarDatosRanking();
    selector = document.getElementById("selectorNivel");
    selector.addEventListener("change",cambiarMapa);

    PrintToMap(dataWat,provincias, selector.value);
}

function PrintToMap(dataWat,provincias, nivel)
{
    map = L.map('map').setView([40.463667, -3.74922], 8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);  

    console.log(dataWat);
    ponerPuntitos(dataWat,provincias,map,nivel);
}

function ponerPuntitos(dataWat,provincias,map,nivel)
{
    for (let i = 0; i < dataWat.length; i++) {
        for (let z= 0; z < provincias.length; z++) {
            if(dataWat[i].ciudad == provincias[z].ciudad && dataWat[i].nivel_Guardado == nivel){
                var circle = L.circle([ provincias[z].latitud, provincias[z].longitud ], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 10000
                    }).addTo(map);  
            }
        }
    }  
}

function cambiarMapa()
{
    if(document.getElementsByTagName("g")[0] != null)
    {
        document.getElementsByTagName("g")[0].innerHTML ="";
        ponerPuntitos(dataWat,provincias,map,selector.value);
    }
}
