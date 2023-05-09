conexionBase = 'http://rolu.sytes.net:7053/';

let data;
CargarDatos();



function CargarDatos() 
{
    const urlActual = new URL(window.location.href);
    const datosCodificados = urlActual.searchParams.get("ranking_data");
    data = JSON.parse(datosCodificados);
    console.log(data[0].ciudad);
    var map = L.map('map').setView([40.463667, -3.74922], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);  

        // Utilizar Leaflet para mostrar la ubicación en el mapa
    
    

        // var circle = L.circle([latitud, longitud], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 500
        // }).addTo(map);
}


    // Hacer una segunda llamada a la API para obtener la información de la ubicación
//     fetch(`https://ejemplo.com/api/ciudad/${ciudad}`)
//       .then(response => response.json())
//       .then(ubicacion => {
//         // Obtener los valores de latitud y longitud de la ubicación
//         const latitud = ubicacion.latitud;
//         const longitud = ubicacion.longitud;

//         // Utilizar Leaflet para mostrar la ubicación en el mapa
//         const mapa = L.map('mapa').setView([latitud, longitud], 8);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//           maxZoom: 18
//         }).addTo(mapa);
//         L.marker([latitud, longitud]).addTo(mapa);

//         var circle = L.circle([latitud,longitud], {
//             color: 'red',
//             fillColor: '#f03',
//             fillOpacity: 0.5,
//             radius: 500
//         }).addTo(map);
//       })
//       .catch(error => {
//         console.error('Error al obtener la ubicación:', error);
//       });
//   })
//   .catch(error => {
//     console.error('Error al obtener la información del jugador:', error);
//   });
