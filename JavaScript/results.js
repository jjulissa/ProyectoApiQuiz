//recuperamos el objeto del LS
let finallyResult = JSON.parse(localStorage.getItem("results"));

//seleccionamos el p ranking
const ranking = document.querySelector(".ranking");
// esta p es la fecha
const date = document.querySelector(".date"); 

ranking.innerText = finallyResult.correctAnswers + " Puntos "; 
// se convierte el time a una fecha y se le pone en fromato string con el formato español
date.innerText = new Date(finallyResult.time).toLocaleString("es-ES"); 