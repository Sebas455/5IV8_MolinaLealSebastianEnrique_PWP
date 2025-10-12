function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[A-Z, a-z]/;

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

}

function problema3(){
    //tarea
}