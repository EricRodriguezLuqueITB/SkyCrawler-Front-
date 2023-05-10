class DataManager {

    constructor(){

    }
    conexionBase = 'http://rolu.sytes.net:7053/';
    // No tiene atributo
    // Métodos


    async getInfo(path, datos /* string */) {
        // Pide a la Api la información referente a un usuario con nombreJugador = Usuario
        const response = await fetch(this.conexionBase + 'api/'+ path + '/' + datos);
        const data = await response.json();
        return data;
    }
    
    async getRecursos() 
    {
        // Pide a la Api el conjunto de elementos (recursos) de los niveles y los retorna
        const response = await fetch(this.conexionBase + 'api/elemento');
        const data = await response.json();
        return data;
    }

    async insertPuntuacion(NombreJugador /* string */, Tiempo /* int */, NivelGuardado /* int */, Ciudad /* string */) 
    {
        // Manda a la Api una puntuación para que se inserte en la tablaNivel ranking de la BBDD
        var datos =
        {
            "nombre_Jugador": NombreJugador,
            "tiempo": Tiempo,
            "nivel_Guardado": NivelGuardado,
            "ciudad": Ciudad
        }
        await fetch(conexionBase + 'api/ranking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
          })
          .then(response => response.json())
          .then(data =>console.log(data))
          .catch(error => console.error(error))
    }

    async updateJugador(NombreJugador, NivelGuardado) 
    {
        // Manda a la Api una puntuación para que se inserte en la tablaNivel ranking de la BBDD
        await fetch(conexionBase + 'api/jugador/' + NombreJugador + "," + NivelGuardado,{
            method: 'PUT',
          })
          .then(response => response.json())
          .then(data =>console.log(data))
          .catch(error => console.error(error))
    }

    async getLocalizaciones() 
    {
        const response = await fetch(this.conexionBase + 'api/localizacion');
        const data = await response.json();
        return data;
    }
}