function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[A-Z, ,]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function problema1(){
    //tarea
    var input = document.getElementById("p1-input").value;
    var output = document.getElementById("p1-output");

    //Juntar letras
    var juntar = input.split('');

    //Invertir palabra
    var invertir = juntar.reverse();

    //Juntar la palabra sin espacios
    var separar = invertir.join('');

    output.textContent = ("Tu palabra invertida es ") + separar;


}

function problema2(){
    //jaime
    //primero necesitamos los valores
    var p2_x1 = document.querySelector("#p2_x1").value;
    var p2_x2 = document.querySelector("#p2_x2").value;
    var p2_x3 = document.querySelector("#p2_x3").value;
    var p2_x4 = document.querySelector("#p2_x4").value;
    var p2_x5 = document.querySelector("#p2_x5").value;

    var p2_y1 = document.querySelector("#p2_y1").value;
    var p2_y2 = document.querySelector("#p2_y2").value;
    var p2_y3 = document.querySelector("#p2_y3").value;
    var p2_y4 = document.querySelector("#p2_y4").value;
    var p2_y5 = document.querySelector("#p2_y5").value;

    //Creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    //Creamos el vector resultado
    v1 = v1.sort(function(a, b){return b-a});
    v2 = v2.sort(function(a, b){return b-a});

    v2 = v2.reverse();

    var p2_producto = 0;
    
    for(var i=0; i<v1.length; i ++){

        p2_producto += v1[i] * v2[i];
    }
    document.querySelector("#p2_resultado").textContent = "El producto escalar minimo es: " + p2_producto;

}

function problema3(){
    const input = document.getElementById("p3-input").value;
    const output = document.getElementById("p3-output");

    const palabras = input.split(",");
    let caracteres = 0;
    let palabraMax = "";

    for (let palabra of palabras) {
        // Validar que solo contenga letras A-Z
        if (!/^[A-Z]+$/.test(palabra)) {
            output.textContent = `La palabra "${palabra}" contiene caracteres inválidos. Usa solo letras A-Z en mayúsculas.`;
            return;
        }

        const letrasUnicas = new Set(palabra);
        if (letrasUnicas.size > caracteres) {
            caracteres = letrasUnicas.size;
            palabraMax = palabra;
        }
    }

    output.textContent = `La palabra con más caracteres únicos es "${palabraMax}" con ${caracteres} caracteres únicos.`;
}