class DataManager {
    conexionBase = 'http://rolu.sytes.net:7053/';
    // No tiene atributo

    getNumLevels() {
        return 4;
    }
    // Métodos
    getRanking() {
        // Recogerá por la Api la tablaNivel de puntuaciones (Ranking)
        // de la base de datos (ElephantSQL) y la devolverá en forma de array de objetos.
    }
    comprobarPeticion(Usuario /* string */, Contraseña /* string */) {
        /*
        Mandará a la Api comprobar si existe el usuario y contraseñas especificado.
        Casos:
            1.- Usuario incorrecto
            2.- Usuario correcto, contraseña incorrecta
            3.- Usuario y contraseña correctos
        */
    }
    async getJugadorInfo(Usuario /* string */) {
        // Pide a la Api la información referente a un usuario con nombreJugador = Usuario
        const response = await fetch(this.conexionBase + 'api/jugador/'+ Usuario);
        const data = await response.json();
        console.log(data);
        return data;
    }
    getJugadorAnimacion() {
        // Pide a la Api el conjunto de sprites referente al Jugador y lo retorna
    }
    getRecursos() {
        // Pide a la Api el conjunto de elementos (recursos) de los niveles y los retorna
    }
    insertPuntuacion(NombreJugador /* string */, Tiempo /* int */, NivelGuardado /* int */, Ciudad /* string */) {
        // Manda a la Api una puntuación para que se inserte en la tablaNivel ranking de la BBDD
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