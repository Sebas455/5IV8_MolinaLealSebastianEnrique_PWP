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
    var total = (parseo1+porcentaje).toFixed(2);
    document.getElementById("sueldo").value = "$ " + total;
    document.getElementById("comision").value = "$ " + (porcentaje).toFixed(2);
}

//Ejercio 3
function descuento(){
    var precio = document.getElementById("original").value;

    //Calcular descuento
    var parseo = parseFloat(precio);
    var desc = parseo*(.15);
    var total = (parseo - desc).toFixed(2);
    document.getElementById("total").value = "$ " + total;
    document.getElementById("dis").value = "$ " + (desc).toFixed(2);
}

//Ejercicio 4
function calificacion(){
    var parcial1 = document.getElementById("parcial1").value;
    var parcial2 = document.getElementById("parcial2").value;
    var parcial3 = document.getElementById("parcial3").value;
    var trabajo = document.getElementById("trabfin").value;
    var examen = document.getElementById("examfin").value;

    //Calcular promedio parciales
    var parseo1 = parseFloat(parcial1);
    var parseo2 = parseFloat(parcial2);
    var parseo3 = parseFloat(parcial3);



    var prom = (parseo1+parseo2+parseo3)/3;
    var promediofinal = prom*(0.55);

    //Calcular promedio examen
    var parseo4 = parseFloat(examen);
    var exam = parseo4*(0.3);

    //calcular promedio trabajo
    var parseo5 = parseFloat(trabajo);
    var trabajofinal = parseo5*(0.15);

    //Validar calificaciones
    if(parseo1 > 10 || parseo2 > 10 || parseo3 > 10 || parseo4 > 10 || parseo5 > 10){
        alert("Por favor ingrese califcaciones válidas");
        return false;
    }

    //Calcular calificacion final
    var califfinal = trabajofinal+exam+promediofinal;
    document.getElementById("final").value = (califfinal).toFixed(2);
}

//Ejercicio5
function alumnos(){
    var hombre = document.getElementById("hombres").value;
    var mujer = document.getElementById("mujeres").value;

    //Calcular total de alumnos
    var parseo1 = parseFloat(hombre);
    var parseo2 = parseFloat(mujer);
    var cantidad = parseo1+parseo2;

    //Calcular cantidad de hombres
    var canthom = (parseo1/cantidad)*100;

    //Calcular cantidad mujeres
    var cantmuj = (parseo2/cantidad)*100;

    document.getElementById("totalhombres").value = canthom + "%";
    document.getElementById("totalmujeres").value = cantmuj + "%";
    
}

//Ejercicio 6
function calcuedad(){
    var año = document.getElementById("fecha").value;

    //Calcular edad
    var parseo1 = parseFloat(año);

    if (parseo1 < 1960){
        alert("Por favor ingresa un año válido");
        return false;
    }

    var edad = 2025-parseo1;
    document.getElementById("edadfinal").value = edad + " años";

}

function borrar(){
    document.getElementById("mesesi").value = "";
    document.getElementById("saldoi").value = "";
    document.getElementById("cantidadi").value = "";
    document.getElementById("base").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";
    document.getElementById("sueldo").value = "";
    document.getElementById("comision").value = "";
    document.getElementById("parcial1").value = "";
    document.getElementById("parcial2").value = "";
    document.getElementById("parcial3").value = "";
    document.getElementById("trabfin").value = "";
    document.getElementById("examfin").value = "";
    document.getElementById("final").value = "";
    document.getElementById("original").value = "";
    document.getElementById("dis").value = "";
    document.getElementById("total").value = "";
    document.getElementById("hombres").value = "";
    document.getElementById("mujeres").value = "";
    document.getElementById("totalhombres").value = "";
    document.getElementById("totalmujeres").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("edadfinal").value = "";
}

