function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

//Ejercicio 2
function comisiones(){
    var base = document.getElementById("base").value;
    var com1 = document.getElementById("venta1").value;
    var com2 = document.getElementById("venta2").value;
    var com3 = document.getElementById("venta3").value;

    //calcular comision
    var parseo1 = parseFloat(base);
    var parseo2 = parseFloat(com1);
    var parseo3 = parseFloat(com2);
    var parseo4 = parseFloat(com3);

    var ventas = parseo2+parseo3+parseo4;
    var porcentaje = ventas*(.10);
    var total = parseo1+porcentaje;
    document.getElementById("base").value = "$ " + total;
}

function borrar(){
    document.getElementById("base").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";
}