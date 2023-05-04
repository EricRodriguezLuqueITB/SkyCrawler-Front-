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

class UIManager 
{   
    constructor(numLvl){
        this.NumNiveles = numLvl;
    }

    printarBarraControl()
    {
        let main = document.getElementsByTagName("main")[0];
        let divBarraControl = document.createElement("div");
        divBarraControl.className = "barraControl";

        let buttonLogout =document.createElement("button");
        let imgLogout = document.createElement("img");
        imgLogout.setAttribute("src","https://img.freepik.com/iconos-gratis/x-simbolo_318-1407.jpg");
        imgLogout.setAttribute("alt","Logout");
        buttonLogout.appendChild(imgLogout);
        buttonLogout.addEventListener("click",function()
        {
            window.close();
        })

        divBarraControl.appendChild(buttonLogout);
        
        // Condicional creacion flecha
        if(main.className != "mainMenu") {
            let buttonBack =document.createElement("button");
            let imgBack = document.createElement("img");
            imgBack.setAttribute("src","https://static.vecteezy.com/system/resources/previews/000/365/868/original/left-vector-icon.jpg");
            imgBack.setAttribute("alt","Logout");
            buttonBack.appendChild(imgBack);
            buttonBack.addEventListener("click",printarMenu)
            // {
            //     // switch(document.getElementsByTagName("Main")[0].className)
            //     // {
            //     //     case "mainRanking":
            //     //         this.printarMenu();
            //     //         break;
            //     //     case "mainNiveles":
            //     //         this.printarMenu();
            //     //         break;
            //     // }
            // })

            divBarraControl.appendChild(buttonBack); 
        }

        main.appendChild(divBarraControl);
    }

    printarMenu()
    {
        let main = document.getElementsByTagName("main")[0];
        main.innerHTML = "";
        main.className = "mainMenu";
        this.printarBarraControl();
        let section = document.createElement("section");
        section.className = "sectionMenu";

        let menuH1 = document.createElement("h1");
        menuH1.textContent = "MENU";
        section.appendChild(menuH1);

        let divOptions = document.createElement("div");
        divOptions.className = "divOptions";

        let buttonRanking = document.createElement("button");
        buttonRanking.addEventListener("click",printarRanking);
        buttonRanking.textContent = "Ranking";
        buttonRanking.className = "botonesMenu";

        let buttonNiveles = document.createElement("button");
        buttonNiveles.addEventListener("click",printarNiveles);
        buttonNiveles.textContent = "Niveles";
        buttonNiveles.className = "botonesMenu";

        divOptions.appendChild(buttonNiveles);
        divOptions.appendChild(buttonRanking);
        section.appendChild(divOptions);
        main.appendChild(section);
    }
    // Métodos
    printarNiveles() 
    {
        let main = document.getElementsByTagName("main")[0];
        main.className = "mainNiveles"
        main.innerHTML= "";
        this.printarBarraControl();
        let section = document.createElement("section");
        section.className = "sectionMenu";

        let nivelesH1 = document.createElement("h1");
        nivelesH1.textContent = "NIVELES";
        section.appendChild(nivelesH1);

        let divNiveles = document.createElement("div");
        divNiveles.className = "divNiveles";

        for(let i=0; i < this.NumNiveles;i++)
        {
            let buttonImg = document.createElement("button");
            buttonImg.setAttribute("id","nivel"+ i);
            buttonImg.addEventListener("click", printarNivel);

            if(jugador.NivelMaximo <= i)
            {
                let img = document.createElement("img");
                img.className = "candado";
                img.setAttribute("src","https://cdn-icons-png.flaticon.com/512/345/345535.png?w=360")
                img.setAttribute("alt","candado");
                buttonImg.appendChild(img);
            }
            else
            {
                buttonImg.textContent = i;
            }
            divNiveles.appendChild(buttonImg);
        }

        section.appendChild(divNiveles);
        main.appendChild(section);

        // Genera los botones de cada nivel para le menú,
        // los niveles por encima del nivelCompletado estarán bloqueados.
    }

    printarNivel(Nivel)
    {
        let main = document.getElementsByTagName("main")[0];
        main.innerHTML= "";
        console.log(main);
        main.className = "mainNivel"
        this.printarBarraControl();

        let section = document.createElement("section");
        section.className = "sectionMenu";

        let nivel = document.createElement("h1");
        nivel.textContent = "NIVEL" + Nivel;
        section.appendChild(nivel);
        main.appendChild(section);
    }

    printarMapa(Nivel /* Nivel */) {
        // Mostrará por pantalla el escenario especificado en el Mapa del
        // nivel pasado por parametro.
        let main = document.getElementsByTagName("main")[0];

        let tablaNivel = document.createElement("table");
        tablaNivel.id = "tablaNivel";
        
        Nivel.forEach(row => {
            var tr = document.createElement("tr");
            row.forEach(element => {
                var img = document.createElement("img");
                img.src = `src/${element}.png`;
                img.alt = element;
                tr.appendChild(img);
            });
            tablaNivel.appendChild(tr);
        });
        main.appendChild(tablaNivel);
    }
    printarRanking(Nivel /* Nivel */) {

        console.log("ranking");
        // Muestra por pantalla el ranking filtrado por nivel seleccionado.
    }
    GenerarJugador(Jugador /* Jugador */) {
        // Muestra al jugador en la posición especificada del mismo encima
        // del mapa y con el spriteActual especificado.
        let personaje = new Personaje(DataManager.getJugadorAnimacion());
    }
    cambiarElemento(ObjetoViejo /* int[2] */, ObjetoNuevo /* int */) {
        // Cambia el objeto en las coordenadas de ObjetoViejo por el elemento
        // de de id (ObjetoNuevo).
    }
    borrarElemento(cosa){
        cosa.innerHTML = "";
    }
}

class DataManager {
    // No tiene atributos

    getNumLevels() {
        return 4;
    }
    // Métodos
    static getRanking() {
        // Recogerá por la Api la tablaNivel de puntuaciones (Ranking)
        // de la base de datos (ElephantSQL) y la devolverá en forma de array de objetos.
    }
    static comprobarPeticion(Usuario /* string */, Contraseña /* string */) {
        /*
        Mandará a la Api comprobar si existe el usuario y contraseñas especificado.
        Casos:
            1.- Usuario incorrecto
            2.- Usuario correcto, contraseña incorrecta
            3.- Usuario y contraseña correctos
        */
    }
    static getJugadorInfo(Usuario /* string */) {
        // Pide a la Api la información referente a un usuario con nombreJugador = Usuario
    }
    static getJugadorAnimacion() {
        // Pide a la Api el conjunto de sprites referente al Jugador y lo retorna
    }
    static getRecursos() {
        // Pide a la Api el conjunto de elementos (recursos) de los niveles y los retorna
    }
    static insertPuntuacion(NombreJugador /* string */, Tiempo /* int */, NivelGuardado /* int */, Ciudad /* string */) {
        // Manda a la Api una puntuación para que se inserte en la tablaNivel ranking de la BBDD
    }
    static registrarJugador(NombreJugador /* string */, Contrasenia /* string */) {
        // Manda a la Api un usuario para que lo inserte en la tablaNivel Jugador *La contraseña tiene que encriptarse
    }
    static eliminarJugador(NombreJugador /* string */) {
        // Pide a la Api eliminar de la tablaNivel Jugador el usuario con nombre == NombreJugador
    }
    static getMapa(Id /* int */) {
        // Pide a la Api el mapa (matriz) de elementos de el Nivel con id == Id
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