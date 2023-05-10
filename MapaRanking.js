let dataWat;
CargarDatos();

async function CargarProvincias() {

    let cerebro = new DataManager();
    let datos = await cerebro.getLocalizaciones();
    return datos;
}
async function CargarDatos() 
{
    let provincias = await CargarProvincias();

    const urlActual = new URL(window.location.href);
    const datosCodificados = urlActual.searchParams.get("ranking_data");
    dataWat = JSON.parse(datosCodificados);

    var map = L.map('map').setView([40.463667, -3.74922], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);  

    
    for (let i = 0; i < dataWat.length; i++) {
        for (let z= 0; z < provincias.length; z++) {
            if(dataWat[i].ciudad == provincias[z].ciudad){
                var circle = L.circle([ provincias[z].latitud, provincias[z].longitud ], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 10000
                    }).addTo(map);  

                //Hacer Icono personalizado
                // var greenIcon = L.icon({
                //     iconUrl: 'http://rolu.sytes.net:5567/SKYCRAWLER/MC/MCF.png',
                
                    
                    //     iconSize:     [38,55], // size of the icon       
                    //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                   
                    // });
                    // L.marker([provincias[z].latitud, provincias[z].longitud ], {icon: greenIcon}).addTo(map);
            }
        }
    }


    
}
