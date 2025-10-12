function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

//funcion para calcular el interes
//Delimitar el número de decimales
function interes(){
    var valor = document.getElementById("cantidadi").value;
    var mes = document.getElementById("mesesi").value;

    
    var parseo2 = parseFloat(mes);
    alert(parseo2);

    if (parseo2 > 18){
        alert("Solo puede ingresar un máximo de 18 meses");
        return false;
    }

    var parseo1 = parseFloat(valor);
    alert(parseo1);
    
    var interes = parseo1*(0.02);//Limite a 2 decimales
    alert(interes);
    var calcmes = interes*parseo2;
    alert(calcmes);
    var total = (calcmes + parseo1).toFixed(2);
    alert(total);
    document.getElementById("saldoi").value = "$ " + total; //Limite a 2 decimales

    

}



function borrar(){
    document.getElementById("saldoi").value = "";
    document.getElementById("cantidadi").value = "";
}



/*
Del ejercicio 1, tenemos que agregar el campo numero de meses y sera una inversion de meximo 18 meses

2 se deben de ingresar 3 ventas, un sueldo base, y despues calcular el monto total, debe aparecer cuanto cobra por comision y la suma

3 se debe ingresar un producto con su precio y aplicarle el 15% y el sistema debe mostrar el producto, el precio, el desceunto y el total a pagar

4 se debe de ingresar calif 1, 2 y 3, se aplica el promedio y su porcentaje, se ingresa trabajo fianl y se aplica un porcentaje, y examen final se aplica el porcentaje y se debe mostrar la calif final

5 se debe de ingresar cantidad de hombre y cantidad de mujeres y mostrar sus porcentajes correspondientes

6 calcular la edad de una persona
*/