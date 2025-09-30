/*
JS es un lenguaje multiparadigma
Acepta la programación funcional, estructurada, POO, Eventos
Dentro de JS no existe el tipado de variables
int, string, float, etc.

Solo existen 3 tipos de variables de acuerdo al estandar ES6
VAR, LET, CONST 
*/

function validar(formulario){
    //Quiero validar que el campo nombre acepte mas de 3 caracteres
    if(formulario.nombre.value.length < 4){
        alert("Porfvor escribe más de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    //validacion para únicamente letras
    var checkStr = formulario.nombre.value;
    alert(checkStr);

    var abcOK = 'qwertyuiopasdfghjklñzxcvbnm'+'QWERTYUIOPASDFGHJKLÑZXCVBNM'

    var allValido = true;

    //tenemos que comparar la cadena de nombre vs el abecedario

    for(var i = 0; i < checkStr.length; i++){
        var caracteres = checkStr.charAt(i);
        for(var j = 0; j < abcOK.length; j++){
            if(caracteres == abcOK.charAt(j)){
                break;
            }
        }
        if(j == abcOK.length){
            allValido = false;
            break;
        }
    }
    if(!allValido){
        alert("Escribe unicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
    }




    //vamos a crear una funcion de una expresion regular para validar el correo electronica 
    //texto.texto@texto.texto

    var b = /^[^@\s]+[^@\.\s] + (\.[^@\. \s]+)+ $/;

    var txt = formulario.correo.value;

    alert("Email " + (b.test(txt)? " ": " no ")+ "valido");

    return b.test;
}


