/*
JS maneja variables del siguiente modo:
var-> una variable de acceso local y global dependiendo de donde se declare
let -> es una variable protegida, solo se puede hacer uso dentro de la funcion o bloque donde se declara
const -> es una variable que no puede cambiar su valor, es decir, es una constante

var x = "hola";

if(true){
    let x = "habia una vez";
    console.log(x);
}



//Como usamos las funciones
function suma(n1, n2){
    return n1 + n2;
}

console.log(`Esta suma es de: ${suma(5, 3)}`);



//las funciones flecha nos ayudan a poder realizar operaciones de una forma mucho mas sencilla de acuerdo a la sig estructura
// "cadena" -> id, clase, metodo, nombre, atributo

const suma = (n1, n2) => n1 + n2;
console.log(`Esta suma es de: ${suma(5, 3)}`);



const razasDePerros = [
    "Pastor Aleman",
    "Labrador Retriever",
    "Bulldog Frances",
    "Beagle",
    "Chihuahua",
    "Dalmata",
    "Salchicha",
    "Pug"
];
*/

//formas de recorrer e imprimir un arreglo
//for
/*
for(let i = 0; i < razasDePerros.length; i++){
    console.log(razasDePerros[i]);
}

//for of

for(const raza of razasDePerros){
    console.log(raza);
}



//for in
for(const indice in razasDePerros){
    console.log(razasDePerros[indice]);
}



//for each itera sobre los elementos del arreglo y no devuelve nada
//todos los for each son funciones flecha por defecto

razasDePerros.forEach(raza=>console.log(raza));

//la estructura general del forEach es la siguiente
//argumento.forEach((raza, indice, arreglo) => {codigo a ejecutar}) 

razasDePerros.forEach((raza, indice, razasDePerros) => confirm.log(raza));


//function MAP ->iterar sobre los elementos del arreglo, y regresa un arreglo diferente con el cual podemos jugar

const razasDePerrosMayusculas = razasDePerros. map(raza => raza.toUpperCase());
console.log(razasDePerrosMayusculas);

//FIND -> nos permite realizar una busqueda de un elemento dentro del arreglo, si lo encuentra lo retorna sino lanza un "undefined"
if(razasDePerros.find(raza => raza === "Chihuahua")){
    console.log("Si se encontro la raza");
    console.log(razasDePerros);

}else{
    //hay q meterlo
    razasDePerros.push("Chihuahua");
    console.log(razasDePerros);
}


//FINDINDEX -> nos permite realizar una busqueda de un elemento dentro del arreglo, si lo encuentra, regresa el indice del elemento, sino regresa un -1, esta funcion es particularmente util cuando necesitamos modificar o leminiar un arrreglo original, dentro de una copia del mismo

const indiceChihuahua = razasDePerros.findIndex(raza => raza === "Chihuahua");
if (indiceChihuahua > -1){
    //si se encontro y esta dentro del arreglo
    console.log(razasDePerros[indiceChihuahua]);
    //aparte le voy a decir que agrege un texto a este resultado
    razasDePerros[indiceChihuahua] += " (Es una raza de perros chiquita y chillona)";
    console.log(razasDePerros[indiceChihuahua]);
    console.log(razasDePerros);
}
*/


function ejercicio1(formulario){
    var num1 = parseFloat(formulario.num1.value);
    var num2 = parseFloat(formulario.num2.value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor ingresa valores.");
        return;
      }

    if (num1 === num2) {
        resultado = num1 * num2;
    } else if (num1 > num2) {
        resultado = num1 - num2;
    } else {
        resultado = num1 + num2;
    }

    alert("Resultado: " + resultado);

}

function problema2(){
    const n1 = parseFloat(document.getElementById("n1").value);
    const n2 = parseFloat(document.getElementById("n2").value);
    const n3 = parseFloat(document.getElementById("n3").value);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        alert("Por favor ingresa tres números válidos.");
        return;
    }

    if (n1 === n2 || n1 === n3 || n2 === n3) {
        alert("Los números deben ser diferentes.");
        return;
    }

    const mayor = Math.max(n1, n2, n3);

    alert("El número mayor es: " + mayor);
}

function problema3(){
    const horasTrabajadas = parseFloat(document.getElementById("horas").value);
    const pagoporhora = parseFloat(document.getElementById("cantidad").value);

  //Validar que ponga una cantidad de horas trabajadas válida
  if (horasTrabajadas > 60 ) {
    alert("Por favor ingresa una cantidad de horas válidas.");
    return;
  }

  if (isNaN(horasTrabajadas) || isNaN(pagoporhora)) {
    alert("Por favor ingresa algún número.");
    return;
  }


  if (horasTrabajadas <= 40) {
    //No hay horas extra
    pagoTotal = horasTrabajadas * pagoporhora;
  } else {
    const horasExtra = horasTrabajadas - 40;

    if (horasExtra <= 8) {
      //Horas que se pagan al doble
      pagoTotal = (40 * pagoporhora) + (horasExtra * pagoporhora * 2);
    } else {
      //Horas que se pagan al triple
      const horasTriple = horasExtra - 8;
      pagoTotal = (40 * pagoporhora) + (8 * pagoporhora * 2) + (horasTriple * pagoporhora * 3);
    }
  }

  alert("Total a pagar: $" + pagoTotal.toFixed(2));
}

function problema4() {
    const salario = parseFloat(document.getElementById("salario").value);
    const antiguedad = parseFloat(document.getElementById("antiguedad").value);
  
    if (antiguedad > 70) {
      alert("Por favor ingresa una cantidad de años valida.");
      return;
    }

    if (isNaN(salario) || isNaN(antiguedad)) {
        alert("Por favor ingresa algún número.");
        return;
      }
  
    if (antiguedad < 1) {
        porcentaje = 0.05;
      } else if (antiguedad >= 1 && antiguedad < 2) {
        porcentaje = 0.07;
      } else if (antiguedad >= 2 && antiguedad < 5) {
        porcentaje = 0.10;
      } else if (antiguedad >= 5 && antiguedad < 10) {
        porcentaje = 0.15;
      } else {
        porcentaje = 0.20;
      }
  
    // Calcular utilidad anual
    const utilidad = salario * porcentaje * 12;
  
    alert("Tu utilidad anual es: $" + utilidad.toFixed(2));
}
  