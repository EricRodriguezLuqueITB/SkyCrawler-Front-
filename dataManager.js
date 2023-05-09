class DataManager {

    constructor(){

    }
    conexionBase = 'http://rolu.sytes.net:7053/';
    // No tiene atributo
    // Métodos
    comprobarPeticion(Usuario /* string */, Contraseña /* string */) {
        /*
        Mandará a la Api comprobar si existe el usuario y contraseñas especificado.
        Casos:
            1.- Usuario incorrecto
            2.- Usuario correcto, contraseña incorrecta
            3.- Usuario y contraseña correctos
        */
    }

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
        await fetch(conexionBase + 'api/ranking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data =>console.json())
          .catch(error => console.error(error))
    }
    registrarJugador(NombreJugador /* string */, Contrasenia /* string */) {
        // Manda a la Api un usuario para que lo inserte en la tablaNivel Jugador *La contraseña tiene que encriptarse
    }
    eliminarJugador(NombreJugador /* string */) {
        // Pide a la Api eliminar de la tablaNivel Jugador el usuario con nombre == NombreJugador
    }
    getMapa(Id /* int */) {
        // Pide a la Api el mapa (matriz) de elementos de el Nivel con id == Id
    }
    async getLocalizaciones() 
    {
        const response = await fetch(this.conexionBase + 'api/localizacion');
        const data = await response.json();
        return data;
    }

    getLocalizacionUsuariO(){

    }
}