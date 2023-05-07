
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