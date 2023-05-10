
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
        imgLogout.setAttribute("src", "http://rolu.sytes.net:5567/SKYCRAWLER/elementos/cruz.png");
        imgLogout.setAttribute("alt", "Logout");
        imgLogout.style.background = "transparent";
        buttonLogout.appendChild(imgLogout);
        buttonLogout.addEventListener("click", function () 
        {
            localStorage.removeItem("nombre_Jugador");
            window.location.replace('index.html');
        })

        let bienvenida = document.createElement("h1");
        bienvenida.id = "bienvenida";
        bienvenida.textContent = localStorage.getItem("nombre_Jugador");
        console.log(localStorage.getItem("nombre_Jugador"));

        divBarraControl.appendChild(buttonLogout);
        divBarraControl.appendChild(bienvenida);

        // Condicional creacion flecha
        if (main.className != "mainMenu") {
            let buttonBack = document.createElement("button");
            let imgBack = document.createElement("img");
            imgBack.setAttribute("src", "http://rolu.sytes.net:5567/SKYCRAWLER/elementos/volver.png");
            imgBack.setAttribute("alt", "Logout");
            buttonBack.appendChild(imgBack);
            
            if(main.className == "mainNivel") {
                buttonBack.addEventListener("click", printarMenu)
                let contador = document.createElement("p");
                contador.className = "contador";
                contador.textContent = "00:00";
                divBarraControl.appendChild(contador);
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

        let logo = document.getElementById("logo");
        logo.style.display = "flex";
        // logo.setAttribute = ("onclick", "window.location.href = 'http://rolu.sytes.net:5567/SKYCRAWLER/juego/aboutus.html");
        // logo.href = "http://rolu.sytes.net:5567/SKYCRAWLER/juego/aboutus.html";
        logo.addEventListener("click", () => { window.location.href = "http://rolu.sytes.net:5567/SKYCRAWLER/juego/aboutus.html" }); 

        document.body.style.backgroundImage = "url('http://rolu.sytes.net:5567/SKYCRAWLER/elementos/fondotitulo.png')";

        let main = document.getElementsByTagName("main")[0];
        main.innerHTML = "";
        main.className = "mainMenu";
        this.printarBarraControl();
        let section = document.createElement("section");
        section.className = "sectionMenu";

        let titulo = document.createElement("img");
        titulo.src = "http://rolu.sytes.net:5567/SKYCRAWLER/TituloJuego.png";
        section.appendChild(titulo);

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

        document.getElementById("logo").style.display = "block"; 

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

        for (let i = 0; i < this.NumNiveles -1; i++) {
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
                buttonImg.addEventListener("click", printarNivel);
                buttonImg.textContent = (i + 1);
            }
            divNiveles.appendChild(buttonImg);
        }

        section.appendChild(divNiveles);
        main.appendChild(section);

        // Genera los botones de cada nivel para le menú,
        // los niveles por encima del nivelCompletado estarán bloqueados.
    }

    printarNivel(niveles, event, personaje) {

        document.getElementById("logo").style.display = "none"; 

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

        this.printarMapa(niveles[event.srcElement.textContent], event.srcElement.textContent, personaje);
        
    }

    printarMapa(stringNivel, NumNivel, personaje) {
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

        section.appendChild(tablaNivel);
        setTimeout(() => {
            personaje.nivelActual = NumNivel;
            personaje.crearPersonaje();
            personaje.colocarInicial(nivel);

            this.moverPersonaje(personaje, nivel, true);

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
        let permitirMovimiento = true;
        
        document.addEventListener("keyup", e => 
        {
            permitirMovimiento = true;
        });

        document.addEventListener("keypress", e => {
            if(seguir && permitirMovimiento) {
                permitirMovimiento = false;
                let destino;
                let coord = personaje.coord;
                let result;
                switch (e.code) {
                    case ("KeyS"):
                    // case ("ArrowDown"):
                        result = nivel.comprobarColision(coord[0] + 1, coord[1]);
                        personaje.mover(coord[0] + 1, coord[1], nivel)
                        destino = nivel.Mapa[coord[0] + 1][coord[1]];
                        break;

                    case ("KeyW"):
                    // case ("ArrowUp"):
                        result = nivel.comprobarColision(coord[0] - 1, coord[1]);

                        if (primerMovimiento) {
                            personaje.cronometro(true);
                            nivel.Mapa[nivel.Mapa.length - 1][nivel.Mapa[nivel.Mapa.length - 1].indexOf(19)] = 22;
                            let entrada = document.getElementById(`coord:${nivel.Mapa.length - 1}-${nivel.Mapa[nivel.Mapa.length - 1].indexOf(22)}`);
                            entrada.src = nivel.getSrc(22);
                            entrada.classList.add("Colision");
                            entrada.classList.remove("SinPisar");
                            primerMovimiento = false;
                        }
                        
                        personaje.mover(coord[0] - 1, coord[1], nivel)
                        destino = nivel.Mapa[coord[0] - 1][coord[1]];
                        break;

                    case ("KeyA"):
                    // case ("ArrowLeft"):
                        result = nivel.comprobarColision(coord[0], coord[1] - 1);
                        personaje.mover(coord[0], coord[1] - 1, nivel)
                        destino = nivel.Mapa[coord[0]][coord[1] - 1];
                        break;

                    case ("KeyD"):
                    // case ("ArrowRight"):
                        result = nivel.comprobarColision(coord[0], coord[1] + 1);
                        personaje.mover(coord[0], coord[1] + 1, nivel)
                        destino = nivel.Mapa[coord[0]][coord[1] + 1];
                        break;
                }
                if(destino == 21) {
                    //setTimeout(acabarNivel(personaje), 2000);
                    seguir = false;
                    acabarNivel(personaje, true);
                }
                if(result == -1) {
                    seguir = false;
                    acabarNivel(personaje, false);
                }
            }
        });
    }
    
    printarFinalNivel(bool)
    {
        let divFinal = document.createElement("div");
        divFinal.className = "divFinal";
        let h1 = document.createElement("h1");
        let button1 = document.createElement("button");
        let button2 = document.createElement("button");

        if(bool == true)
        {
            h1.textContent = "VICTORIA";
        }
        else
        {
            h1.textContent = "DERROTA";
        }

        console.log(document.body.clientWidth);

        divFinal.appendChild(h1);
        divFinal.style.position = "absolute";
        divFinal.style.top = 300 + "px" ;
        divFinal.style.left = 550 + "px";
        document.body.appendChild(divFinal);
        
    }
}