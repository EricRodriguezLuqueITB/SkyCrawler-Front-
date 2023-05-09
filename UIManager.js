
class UIManager {
    constructor(numLvl) {
        this.NumNiveles = numLvl;
    }

    // Métodos
    printarBarraControl() {
        let main = document.getElementsByTagName("main")[0];
        let divBarraControl = document.createElement("div");
        divBarraControl.className = "barraControl";

        let buttonLogout = document.createElement("button");
        let imgLogout = document.createElement("img");
        imgLogout.setAttribute("src", "https://img.freepik.com/iconos-gratis/x-simbolo_318-1407.jpg");
        imgLogout.setAttribute("alt", "Logout");
        buttonLogout.appendChild(imgLogout);
        buttonLogout.addEventListener("click", function () {
            window.location.replace('index.html');
        })

        divBarraControl.appendChild(buttonLogout);

        // Condicional creacion flecha
        if (main.className != "mainMenu") {
            let buttonBack = document.createElement("button");
            let imgBack = document.createElement("img");
            imgBack.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/000/365/868/original/left-vector-icon.jpg");
            imgBack.setAttribute("alt", "Logout");
            buttonBack.appendChild(imgBack);
            if(main.className == "MainNivel") {
                buttonBack.addEventListener("click", acabarNivel, jugador, true)
            }
            else {
                buttonBack.addEventListener("click", printarMenu)
            }
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

    printarMenu() {

        document.body.style.backgroundImage = "url('http://rolu.sytes.net:5567/SKYCRAWLER/elementos/fondotitulo.png')";

        let main = document.getElementsByTagName("main")[0];
        main.innerHTML = "";
        main.className = "mainMenu";
        this.printarBarraControl();
        let section = document.createElement("section");
        section.className = "sectionMenu";

        let logo = document.createElement("img");
        logo.src = "http://rolu.sytes.net:5567/SKYCRAWLER/TituloJuego.png";
        section.appendChild(logo);

        let divOptions = document.createElement("div");
        divOptions.className = "divOptions";

        let buttonRanking = document.createElement("p");
        buttonRanking.addEventListener("click", cargarRanking);
        buttonRanking.textContent = "Ranking";
        buttonRanking.className = "botonesMenu";

        let buttonNiveles = document.createElement("p");
        buttonNiveles.addEventListener("click", printarNiveles);
        buttonNiveles.textContent = "Jugar";
        buttonNiveles.className = "botonesMenu";

        divOptions.appendChild(buttonNiveles);
        divOptions.appendChild(buttonRanking);
        section.appendChild(divOptions);
        main.appendChild(section);
    }
    printarNiveles(jugador, niveles) {

        document.body.style.backgroundImage = "url('http://rolu.sytes.net:5567/SKYCRAWLER/elementos/fondotitulo.png')";

        let main = document.getElementsByTagName("main")[0];
        main.className = "mainNiveles"
        main.innerHTML = "";
        this.printarBarraControl();
        let section = document.createElement("section");
        section.className = "sectionNiveles";

        let nivelesH1 = document.createElement("h1");
        nivelesH1.textContent = "Selecciona un nivel";
        section.appendChild(nivelesH1);

        let divNiveles = document.createElement("div");
        divNiveles.className = "divNiveles";

        for (let i = 0; i < this.NumNiveles; i++) {
            let buttonImg = document.createElement("button");
            buttonImg.setAttribute("id", "nivel" + (i + 1));

            if (jugador.NivelMaximo <= i) {
                // let img = document.createElement("img");
                // img.className = "candado";
                // img.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/345/345535.png?w=360")
                // img.setAttribute("alt", "candado");
                // buttonImg.appendChild(img);
                buttonImg.classList.add("bloqueado")
            }
            else {
                buttonImg.addEventListener("click", (event) => 
                {
                    this.printarNivel(niveles, event);

                });
                buttonImg.textContent = (i + 1);
            }
            divNiveles.appendChild(buttonImg);
        }

        section.appendChild(divNiveles);
        main.appendChild(section);

        // Genera los botones de cada nivel para le menú,
        // los niveles por encima del nivelCompletado estarán bloqueados.
    }

    printarNivel(niveles, event) {

        document.body.style.backgroundImage = "url('http://rolu.sytes.net:5567/SKYCRAWLER/elementos/fondojuego.png')";

        let main = document.getElementsByTagName("main")[0];
        main.innerHTML = "";
        main.className = "mainNivel"
        this.printarBarraControl();



        let section = document.createElement("section");
        section.className = "sectionNivel";

        let nivel = document.createElement("h1");
        nivel.textContent = "NIVEL " + event.srcElement.textContent;
        nivel.style.fontSize = "200%";
        section.appendChild(nivel);
        main.appendChild(section);
        this.printarMapa(niveles[event.srcElement.textContent]);
    }

    printarMapa(stringNivel) {
        // Mostrará por pantalla el escenario especificado en el Mapa del
        // nivel pasado por parametro.
        let pruebaNivel = stringNivel.mapa.split("/");

        let nivelMapa = [pruebaNivel.length];

        for (let i = 0; i < pruebaNivel.length; i++) {
            nivelMapa[i] = pruebaNivel[i].split(".");
        }

        for (let i = 0; i < nivelMapa.length; i++) {
            for (let z = 0; z < nivelMapa[i].length; z++) {
                nivelMapa[i][z] = parseInt(nivelMapa[i][z]);
            }
        }

        let nivel = new Nivel(nivelMapa);

        let tablaNivel = document.createElement("table");
        tablaNivel.id = "tablaNivel";

        nivel.Mapa.forEach((row, i) => {
            var tr = document.createElement("tr");
            row.forEach((element, i2) => {
                var img = document.createElement("img");
                img.src = nivel.getSrc(element);
                img.alt = element;
                img.id = `coord:${i}-${i2}`;
                img.classList.add("mapa");

                if (nivel.comprobarTipo(element)) img.classList.add("SinPisar");
                else img.classList.add("Colision");

                tr.appendChild(img);
            });
            tablaNivel.appendChild(tr);
        });

        let section = document.getElementsByClassName("sectionNivel")[0];
        let jugador;

        section.appendChild(tablaNivel);
        setTimeout(() => {
            jugador = this.GenerarJugador(nivel);

            this.moverPersonaje(jugador, nivel, true);

            let intervalo = setInterval(() => {
                let SinPisar = document.getElementsByClassName("SinPisar");
                if (SinPisar.length == 1) { //Dejo la entrada y la salida
                    nivel.Mapa[0][nivel.Mapa[0].indexOf(20)] = 21;
                    let salida = document.getElementById(`coord:0-${nivel.Mapa[0].indexOf(21)}`);
                    salida.src = nivel.getSrc(21);
                    salida.classList.add("SinPisar");
                    salida.classList.remove("Colision");
                    clearInterval(intervalo);
                }
            }, 500);
        }, 500);
    }
    moverPersonaje(personaje, nivel, primerMovimiento) {

        let seguir = true;

        document.addEventListener("keydown", e => {
            if(seguir) {
                let coord = personaje.coord;
                switch (e.code) {
                    case ("KeyS"):
                    case ("ArrowDown"):
                        personaje.mover(coord[0] + 1, coord[1], nivel);
                        break;

                    case ("KeyW"):
                    case ("ArrowUp"):

                        if (primerMovimiento) {
                            nivel.Mapa[nivel.Mapa.length - 1][nivel.Mapa[nivel.Mapa.length - 1].indexOf(19)] = 22;
                            let entrada = document.getElementById(`coord:${nivel.Mapa.length - 1}-${nivel.Mapa[nivel.Mapa.length - 1].indexOf(22)}`);
                            entrada.src = nivel.getSrc(22);
                            entrada.classList.add("Colision");
                            entrada.classList.remove("SinPisar");
                            primerMovimiento = false;
                        }
                        
                        personaje.mover(coord[0] - 1, coord[1], nivel);
                        break;

                    case ("KeyA"):
                    case ("ArrowLeft"):
                        personaje.mover(coord[0], coord[1] - 1, nivel);
                        break;

                    case ("KeyD"):
                    case ("ArrowRight"):
                        personaje.mover(coord[0], coord[1] + 1, nivel);
                        break;
                }
                if(nivel.Mapa[coord[0]][coord[1]] == 21) {
                    coord = [0,0];
                    setTimeout(acabarNivel(jugador, true), 2000);
                    seguir = false;
                }
            }
            this.sleep(50);
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    printarRanking(data/* Nivel */) 
    {
        // console.log(data);
        // let main = document.getElementsByTagName("main")[0];
        // main.className = "mainNiveles"
        // main.innerHTML = "";
        // this.printarBarraControl();

        // let rankingH1 = document.createElement("h1");
        // rankingH1.textContent = "RANKING";
        // main.appendChild(rankingH1);

        // let section = document.createElement("section");
        // section.className = "sectionRanking";

        // let divMapa = document.createElement("div");
        // divMapa.id = "divMapa";
        // section.appendChild(divMapa);

        // let divRanking = document.createElement("div");
        // divRanking.id = "divRanking";
        // section.appendChild(divRanking);
        // main.appendChild(section);
        

        window.open("MapaRanking.html");
    }
    GenerarJugador(nivel /* Nivel */) {
        // Muestra al personaje en la posición especificada del mismo encima
        // del mapa y con el spriteActual especificado.

        let personaje = new Personaje(4);
        personaje.colocarInicial(nivel);
        return personaje;
    }
    cambiarElemento(ObjetoViejo /* int[2] */, ObjetoNuevo /* int */) {
        // Cambia el objeto en las coordenadas de ObjetoViejo por el elemento
        // de de id (ObjetoNuevo).
    }


    printarFinalNivel()
    {
        let section = document.getElementsByTagName("section")[0];
        let divFinal = document.createElement("div");
        divFinal.className = "divFinal";
        
        let h1 = document.createElement("h1");
        h1.textContent = "FIN";



    }

    // printarSelectProvincia(array, ventana) {
    //     let form = ventana.document.getElementById("provinciaForm");
    //     let select = ventana.document.getElementById("opciones");
    //     for (let i = 0; i < array.length; i++) {
    //         let option = document.createElement("option");
    //         option.setAttribute("vaue", array[i].ciudad);
    //         option.textContent = array[i].ciudad;
    //         select.appendChild(option);
    //     }
    //     let button = document.createElement("button");
    //     button.setAttribute("type", "buuton");
    //     button.addEventListener("click", generarNuevoUsuario)
    //     button.textContent = "Enviar";
    //     form.appendChild(button);
    // }
}