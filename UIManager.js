
class UIManager 
{   
    constructor(numLvl){
        this.NumNiveles = numLvl;
    }

    // Métodos
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
            window.location.replace('index.html');
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
    printarNiveles(jugador) 
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
            buttonImg.setAttribute("id","nivel"+ (i+1));

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
                buttonImg.addEventListener("click", () => {
                    this.printarNivel(i+1);
                    });
                buttonImg.textContent = (i+1);
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
        main.className = "mainNivel"
        this.printarBarraControl();

        let section = document.createElement("section");
        section.className = "sectionNivel";

        let nivel = document.createElement("h1");
        nivel.textContent = "NIVEL " + Nivel;
        nivel.style.fontSize = "200%";
        section.appendChild(nivel);
        main.appendChild(section);
        this.printarMapa(nivel);
    }

    printarMapa(id /* Nivel */) {
        // Mostrará por pantalla el escenario especificado en el Mapa del
        // nivel pasado por parametro.

        let nivelMapa = [[1,2,3,3,20,3,3,4,5],
                    [6,7,8,8,8,8,8,9,10],
                    [6,7,17,8,8,8,17,9,10],
                    [6,7,8,8,8,8,8,9,10],
                    [11,12,13,13,19,13,13,14,15]];
                    
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
    
                if(nivel.comprobarTipo(element)) img.classList.add("SinPisar");
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

            this.moverJugador(jugador, nivel, true);

            let intervalo = setInterval(() => {
                let SinPisar = document.getElementsByClassName("SinPisar");
                if(SinPisar.length == 1) { //Dejo la entrada y la salida
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

    moverJugador(jugador, nivel, primerMovimiento) {

        document.addEventListener("keydown", e => {
            let coord = jugador.coord;
            switch(e.code) {
                case("KeyS"):
                case("ArrowDown"):
                    jugador.mover(coord[0] + 1, coord[1], nivel);
                break;

                case("KeyW"):
                case("ArrowUp"):

                    if(primerMovimiento) {
                        nivel.Mapa[nivel.Mapa.length - 1][nivel.Mapa[nivel.Mapa.length - 1].indexOf(19)] = 22;
                        let entrada = document.getElementById(`coord:${nivel.Mapa.length - 1}-${nivel.Mapa[nivel.Mapa.length - 1].indexOf(22)}`);
                        entrada.src = nivel.getSrc(22);
                        entrada.classList.add("Colision");
                        entrada.classList.remove("SinPisar");
                        primerMovimiento = false;
                    }

                    jugador.mover(coord[0] - 1, coord[1], nivel);
                break;
                
                case("KeyA"):
                case("ArrowLeft"):
                    jugador.mover(coord[0], coord[1] - 1, nivel);
                break;
                
                case("KeyD"):
                case("ArrowRight"):
                    jugador.mover(coord[0], coord[1] + 1, nivel);
                break;
            }
            new Promise(resolve => setTimeout(resolve, 5000));
        });
    }

    printarRanking(/* Nivel */) {

        let main = document.getElementsByTagName("main")[0];
        main.className = "mainNiveles"
        main.innerHTML= "";
        this.printarBarraControl();

        let rankingH1 = document.createElement("h1");
        rankingH1.textContent = "RANKING";
        main.appendChild(rankingH1);

        let section = document.createElement("section");
        section.className = "sectionRanking";
        
        let divMapa = document.createElement("div");
        divMapa.id = "divMapa";
        section.appendChild(divMapa);

        let divRanking = document. createElement("div");
        divRanking.id = "divRanking";
        section.appendChild(divRanking);

        main.appendChild(section);

        
    }
    GenerarJugador(nivel /* Nivel */) {
        // Muestra al jugador en la posición especificada del mismo encima
        // del mapa y con el spriteActual especificado.

        let jugador = new Personaje(4);
        jugador.colocarInicial(nivel);
        return jugador;
    }
    cambiarElemento(ObjetoViejo /* int[2] */, ObjetoNuevo /* int */) {
        // Cambia el objeto en las coordenadas de ObjetoViejo por el elemento
        // de de id (ObjetoNuevo).
    }


    printarSelectProvincia(array,ventana)
    {
        let form = ventana.document.getElementById("provinciaForm");
        let select = ventana.document.getElementById("opciones");
        for(let i=0;i < array.length;i++)
        {
            let option = document.createElement("option");
            option.setAttribute("vaue",array[i].ciudad);
            option.textContent = array[i].ciudad;
            select.appendChild(option);
        }
        let button = document.createElement("button");
        button.setAttribute("type","buuton");
        button.addEventListener("click",generarNuevoUsuario)
        button.textContent = "Enviar";
        form.appendChild(button);
    }
}