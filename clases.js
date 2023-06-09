class Jugador {
    // Atributos
    Nombre;
    NivelMaximo;
    #Posicion;
    Ciudad;
    
    // Métodos
    mover(coord /* int[2] */) {
        // Moverá al jugador a las coordenadas especificadas, normalmente comprobadas antes por la función comprobarColision de la clase Nivel
    }

    get Posicion(){
        return this.#Posicion;
    }

    // Constructores
    constructor(Nombre, NivelMaximo, Ciudad) 
    {
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
        let destino = document.getElementById(`coord:${x}-${y}`);

        if(destino == undefined) return 0; 

        if(destino.classList.contains("Colision")) return 0;
        if(destino.classList.contains("Pisado")) return -1;
        return 1;
    }
    comprobarTipo(id) {
    
        switch(id) {
            case 7:
            case 8:
            case 9:
            case 19:
            case 20:
            case 21:
            case 22:
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
                return false;
        }
    }

    // Constructor
    constructor(Mapa) {
        this.#Mapa = Mapa;

        let pre = "http://rolu.sytes.net:5567/SKYCRAWLER/elementos/ID";
        let suf = ".png";

        this.#RecursosMapa = new Map();

        for (let index = 1; index < 23; index++) {
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
    tiempo = 0;
    nivelActual;
    pararTiempo;

    // Métodos
    
    // Movimiento con animación, depende de la velocidad del objeto y no se puede mover más de un bloque (para moverse más espacio usar "colocar()")
    mover(x, y, nivel) {

        if(this.movimiento) return ;

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

        if(nivel.comprobarColision(x, y) == 1) {

            let destino = document.getElementById(`coord:${x}-${y}`);
            if(x > 0) {
                destino.classList.add("Pisado");
                destino.classList.remove("SinPisar");
            }

            this.coord = [x, y];

            this.movimiento = true;

            this.movimiento = this.animacion(0, direccion, this.img, this.velocidad, this.distancia());
        }
    }

    animacion(total, direccion, img, velocidad, distancia) {
      
        switch(direccion) {
          case "Abajo":
            img.style.top = (parseInt(img.style.top.split("p")[0]) + velocidad) + 'px';
            break;
          case "Arriba":
            img.style.top = (parseInt(img.style.top.split("p")[0]) - velocidad) + 'px';
            break;
          case "Derecha":
            img.style.left = (parseInt(img.style.left.split("p")[0]) + velocidad) + 'px';
            break;
          case "Izquierda":
            img.style.left = (parseInt(img.style.left.split("p")[0]) - velocidad) + 'px';
            break;
        }
      
        if (total >= distancia) {
          return false;
        } else {
          setTimeout(this.animacion.bind(this), 10, total + velocidad, direccion, img, velocidad, distancia);
        }
      }

    cronometro(empieza) 
    {
        if(empieza) {
            this.pararTiempo = false;
            let crono = setInterval(() => {
                if(this.pararTiempo) {
                    clearInterval(crono);
                    return;
                }
                this.tiempo++;
                let contador = document.getElementsByClassName("contador")[0];
                contador.textContent = this.tiempoString(this.tiempo);
            }, 1000);
        } else {
            this.pararTiempo = true;
        }
    }

    tiempoString(tiempo) {
        if(tiempo < 60) {
            if(tiempo < 10) return "00:0" + tiempo;
            return "00:" + tiempo;
        }
        if(tiempo % 60 < 10) return Math.round(tiempo / 60) + ":0" + tiempo % 60;
        if(Math.round(tiempo / 60) < 10) return "0" + Math.round(tiempo / 60) + ":" + tiempo % 60;
        return Math.round(tiempo / 60) + ":" + tiempo % 60;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Coloca sin animación
    colocar(x, y, nivel) {

        let parent = this.img.parentNode;
        let parentCoord = parent.getBoundingClientRect();

        if(nivel.comprobarColision(x, y, nivel)) {

            this.coord = [x, y];
            
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
        let section = document.getElementsByClassName("sectionNivel")[0];

        this.img.style.position = "absolute";
        this.img.style.top = 0 + (section.offsetHeight / 2) - (parent.offsetHeight / 2) + (this.distancia() / 2) + "px";
        this.img.style.left = 0 + (section.offsetWidth / 2) - (parent.offsetWidth / 2) + "px";

        let nivelMapa = nivel.Mapa;

        let x = nivelMapa.length - 1;
        let y = nivelMapa[nivelMapa.length - 1].indexOf(19);

        this.coord = [x, y];
        
        this.img.style.top = `${(this.distancia() * x) + parseInt(this.img.style.top.split("p")[0])}px`;
        this.img.style.left = `${(this.distancia() * y) + parseInt(this.img.style.left.split("p")[0])}px`;
    }
    
    crearPersonaje()
    {
        this.img = document.createElement("img");
        this.img.id = "jugador";
        this.img.src = this.sprites[1];

        document.getElementById("tablaNivel").appendChild(this.img);
    }

    // Constructor
    constructor() {
        this.velocidad = 4;
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