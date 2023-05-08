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
    #Mapa; /* int[,] */
    #RecursosMapa; /* Map */

    // Métodos
    get Mapa() {
        return this.#Mapa;
    }
    getSrc(id) {
        return this.#RecursosMapa.get(id);
    }
    comprobarColision(x, y) {
        let fila = this.#Mapa[x];
        let id = fila[y];
       
        switch(id) {
            case 7:
            case 8:
            case 9:
            case 19:
                return true;
    
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 20:
                return false;
        }
    }
    comprobarTipo(id) {
    
        switch(id) {
            case 7:
            case 8:
            case 9:
                return true;
    
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
                return false;
        }
    }

    // Constructor
    constructor(Mapa) {
        this.#Mapa = Mapa;

        let pre = "http://rolu.sytes.net:5567/SKYCRAWLER/elementos/ID";
        let suf = ".png";

        this.#RecursosMapa = new Map();

        for (let index = 1; index < 21; index++) {
            this.#RecursosMapa.set(index, pre + index + suf);
        }
    }
}

class Personaje {
    // Atributos
    img;
    coord = [0,0];

    sprites = ["http://rolu.sytes.net:5567/SKYCRAWLER/MC/MCF.png",
                "http://rolu.sytes.net:5567/SKYCRAWLER/MC/MCB.png",
                "http://rolu.sytes.net:5567/SKYCRAWLER/MC/MCR.png",
                "http://rolu.sytes.net:5567/SKYCRAWLER/MC/MCL.png"];
    velocidad;
    movimiento = false;

    // Métodos
    animacion(fila) {
        // Cambia el SpriteActual pasando por toda la row seleccionada
        // de una en una generando una animación
    }

    
    // Movimiento con animación, depende de la velocidad del objeto y no se puede mover más de un bloque (para moverse más espacio usar "colocar()")
    mover(UI, x, y, nivel) {

        if(this.movimiento) {console.log("No!");return;}

        let direccion = "";

        if(x > this.coord[0]) {
            this.sprite(0); //Abajo
            direccion = "Abajo";
        }
        if(x < this.coord[0]) {
            this.sprite(1); //Arriba
            direccion = "Arriba";
        }
        if(y > this.coord[1]) {
            this.sprite(2); //Derecha
            direccion = "Derecha";
        }
        if(y < this.coord[1]){
            this.sprite(3); //Izquierda
            direccion = "Izquierda";
        }

        if(nivel.comprobarColision(x, y)) {

            let destino = document.getElementById(`coord:${x}-${y}`);
            destino.classList.add("Pisado");
            destino.classList.remove("SinPisar");

            this.coord = [x, y];

            this.movimiento = true;
            let total = 0;
            let id;

            let coord = this.img.getBoundingClientRect();

            id = setInterval(Animacion, 10, direccion, this.velocidad, this.distancia());

            function Animacion(direccion, velocidad, distancia) {
                let jugador = document.getElementById("jugador");
                if (total >= distancia) {
                    this.movimiento = false;
                    clearInterval(id);
                    console.log("Return!");
                    return true;
                    //UI.moverJugador(this, nivel, false);
                } else {
                    switch(direccion) {
                        case "Abajo":
                            jugador.style.top = (parseInt(jugador.style.top.split("p")[0]) + velocidad) + 'px';
                        break;
        
                        case "Arriba":
                            jugador.style.top = (parseInt(jugador.style.top.split("p")[0]) - velocidad) + 'px';
                        break;
                        
                        case "Derecha":
                            jugador.style.left = (parseInt(jugador.style.left.split("p")[0]) + velocidad) + 'px';
                        break;
                        
                        case "Izquierda":
                            jugador.style.left = (parseInt(jugador.style.left.split("p")[0]) - velocidad) + 'px';
                        break;
                    }
                }
                total += velocidad;
            }
        }
    }

    // Coloca sin animación
    colocar(x, y, nivel) {

        let parent = this.img.parentNode;
        let parentCoord = parent.getBoundingClientRect();

        if(nivel.comprobarColision(x, y, nivel)) {

            this.coord = [x, y];
    
            let destino = document.getElementById(`coord:${x}-${y}`);
            let coord = destino.getBoundingClientRect();
            
            this.img.style.top = `${(this.distancia() * y) + parentCoord.y}px`;
            this.img.style.left = `${(this.distancia() * x) + parentCoord.x}px`;
        }
    }

    distancia() {
        let bloque = document.getElementById("coord:0-0");
        let distancia = bloque.offsetWidth;
        return distancia;
    }

    sprite(id) {
        this.img.src = this.sprites[id];
    }

    colocarInicial(nivel) {

        let parent = this.img.parentNode;
        let parentCoord = parent.getBoundingClientRect();
        let section = document.getElementsByClassName("sectionNivel")[0];

        this.img.style.position = "absolute";
        this.img.style.top = 0 + (section.offsetHeight / 2) - (parent.offsetHeight / 2) + (this.distancia() / 2) - 7 + "px";
        this.img.style.left = 0 + (section.offsetWidth / 2) - (parent.offsetWidth / 2) + "px";

        let nivelMapa = nivel.Mapa;

        let x = nivelMapa.length - 1;
        let y = nivelMapa[nivelMapa.length - 1].indexOf(19);

        this.coord = [x, y];
    
        let destino = document.getElementById(`coord:${x}-${y}`);
        let coord = destino.getBoundingClientRect();
        
        this.img.style.top = `${(this.distancia() * x) + parseInt(this.img.style.top.split("p")[0])}px`;
        this.img.style.left = `${(this.distancia() * y) + parseInt(this.img.style.left.split("p")[0])}px`;
    }

    // Constructor
    constructor(velocidad) {
        this.img = document.createElement("img");
        this.img.id = "jugador";
        this.img.src = this.sprites[1];

        document.getElementById("tablaNivel").appendChild(this.img);

        this.velocidad = velocidad;
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