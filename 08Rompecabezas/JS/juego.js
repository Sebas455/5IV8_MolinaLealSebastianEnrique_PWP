var instrucciones = [
    "Utiliza las flechas denavegación para mover las piezas, ",
    "Para ordenar las piezas guiate de la imagen objetivo",
]

//vamos a guardar dentro de una variabl los movimientos del rompecabezas
var movimientos = [];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

//vamos a crear una matriz en la que tengamos las posiciones correctas
var rompecorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

//necesito saber las coordenadas de la pieza vacia, la que se va a mover
var filaVacia = 2;
var columnaVacia= 2;

//necesitamos una funcion que se encargue de mostrar instrucciones

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

//esta funcion se encarga de crera el componente li y agregar la lista de dichas funciones

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//vamos a crear una funcion para saber que gano
function ChecarSiGano(){
    for(var i = 0; i < rompe.length; i++){
        for(var j = 0; j < rompe[i].length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompecorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//mostrar en html si se gamo
function mostrarCartelGanador(){
    if(ChecarSiGano()){
        alert("Ganaste")
    }
    return false;
}

/*

necesitamos una funcion que se encrague de poder intercambiar las posiciones de la pieza vacia vs cualquiera, para esto tenemos que hacer el uso de :
arreglo[][] = posicion[][]
//intercambiar
posicion[]][] = arreglo[][]
*/

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];

    //intercambiar
    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//necesitamos tambien limitar las posiciones del rompecabezas
function posicionValida(fila, columna){
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//debemos crear una funcion que se encargue del movimeinto detectanto el evento de las flechas de navegacion
//debemos crear yn matriz de identificacion del movimiento
//arriba es 38, abajo es 40, izquierda es 37 y derecha 39

var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
}; //Es formajo JSON

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    //si se mueve
    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    } else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }  

    //solo mando a llamar a que la posicion ea valida
    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        //tengo que hacer una funcion que se encargue de intercambiar las posiciones
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        //tengo que guardar el ultimo movimiento 
        agregarUltimoMovimiento(direccion);
    }
    
}

function agregarUltimoMovimiento(direccion){
    movimientos.push(direccion);
    actualizarUltimoMovimiento(direccion);
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    //intercambio ya debe de ser por partre de los frames y el html
    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    //para el html
    intercambiarPosicionesDOM('pieza'+pieza1, 'pieza'+pieza2);
    
}

function intercambiarPosicionesDOM(idPieza1, idPieza2){
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);


    //vamos a clonarlas
    var padre1 = pieza1.parentNode;
    var padre2 = pieza2.parentNode;

    //lo clono
    var clonElemento1 = pieza1.cloneNode(true);
    var clonElemento2 = pieza2.cloneNode(true);

    //Reemplazar a los padres por sus clones
    padre1.replaceChild(clonElemento1, pieza2);
    padre2.replaceChild(clonElemento2, pieza1);
}

//debo de actualizar los movimeintos en el DOM
function actualizarUltimoMovimiento(direccion){
    var ultimoMovimiento = document.getElementById("flecha");
    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
    }
}

//poder mezclar todas las piezas
function mezclarPiezas(veces){
    if(veces <= 0){
        alert("Asi no se puede");
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function(){
        mezclarPiezas(veces - 1);
    }, 100);
}

//necesitamos saber que teclas se estan oprimiendo
function capturarTeclas(){
    document.body.onkeydown = (function(evento){
        if(evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.DERECHA || evento.which === codigosDireccion.IZQUIERDA){
            moverEnDireccion(evento.which);
            //saber si gane
            var gano = ChecarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                }
                ,500);
            }
            evento.preventDefault();
        }
    });
}



function iniciar(){
    //mezclar las piezas 
    mezclarPiezas(30);
    capturarTeclas();
    //capturar el ultimo movimiento
}

iniciar();

//mandamos traer a la funcion
mostrarInstrucciones(instrucciones);


//cambiar imagen de fondo
var imagenesSets = [
    {
        piezas: ["10.jpg", "20.jpg", "30.jpg", "40.jpg", "50.jpg", "60.jpg", "70.jpg", "80.jpg"],
        final: "final.png"
    },
    {
        piezas: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
        final: "pikachufinal.jpg"
    }
];
var indiceImagenActual = 0;

function cambiarImagenes() {
    indiceImagenActual = (indiceImagenActual + 1) % imagenesSets.length;
    var nuevoSet = imagenesSets[indiceImagenActual];

    for (var i = 1; i <= 8; i++) {
        var pieza = document.querySelector("#pieza" + i + " img");
        if (pieza) {
            pieza.src = "./recursosrompecabezas/images/" + nuevoSet.piezas[i - 1];
        }
    }

    var objetivo = document.querySelector("#objetivo img");
    if (objetivo) {
        objetivo.src = "./recursosrompecabezas/images/" + nuevoSet.final;
    }

    console.log("Set cambiado a:", nuevoSet.final);
}
