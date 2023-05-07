class Jugador {
    // Atributos
    Nombre;
    NivelMaximo;
    Tiempo;
    #Posicion;
    Ciudad;
    
    // Métodos
    moverJugador(coord /* int[2] */) {
        // Moverá al jugador a las coordenadas especificadas, normalmente comprobadas antes por la función comprobarColision de la clase Nivel
    }
    cronometro() {
        setInterval(() => {
            // Temporizador para el ranking de puntuaciones
        }, interval);
    }

    get Posicion(){
        return this.#Posicion;
    }

    // get Ciudad(){
    //     return this.#Ciudad;
    // }

    // Constructores
    constructor(Nombre, NivelMaximo, Ciudad) {
        this.Nombre = Nombre;
        this.NivelMaximo = NivelMaximo;
        this.Ciudad = Ciudad;
        this.Tiempo = 0;
        
    }
}
class Nivel {
    // Atributos
    #Mapa; /* int[10,20] */
    #RecursosMapa; /* string[] */

    // Métodos
    comprobarColision() {
        // Comprueba unas coordenadas del mapa para decir si el objeto en esa posición 
        // Sa xocado :(
    }
    get Mapa() {
        return this.#Mapa;
    }
    get RecursosMapa() {
        return this.#RecursosMapa;
    }

    // Constructor
    constructor(Mapa, RecursosMapa) {
        this.#Mapa = Mapa;
        this.#RecursosMapa = RecursosMapa;
    }
}

class Personaje {
    // Atributos
    #Sprites; /* string[,] */
    SpriteActual; /* string */

    // Métodos
    animacion(fila) {
        // Cambia el SpriteActual pasando por toda la row seleccionada
        // de una en una generando una animación
    }

    // Constructor
    constructor(Sprites) {
        this.#Sprites = Sprites;
        this.SpriteActual = Sprites[0,0];
    }
}
class Localizaciones {
    // Atributos
    #Ubicacion;
    #Latitud;
    #Longitud;

    // Métodos
    get Ubicacion() {
        return this.#Ubicacion;
    }
    get Latitud() {
        return this.#Ubicacion;
    }
    get Longitud() {
        return this.#Ubicacion;
    }
}