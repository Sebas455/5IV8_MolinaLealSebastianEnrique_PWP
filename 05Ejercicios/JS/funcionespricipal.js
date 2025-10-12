function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

//Ejercicio 1
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
    document.getElementById("sueldo").value = "$ " + total;
    document.getElementById("comision").value = "$ " + porcentaje;
}

//Ejercio 3



function borrar(){
    document.getElementById("base").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";
}