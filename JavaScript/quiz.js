//Eliminamos del local storage el resultado si previamente teníamos uno
localStorage.removeItem('results');

//seleccionamos elementos del dom
const questionsP = document.querySelector(".questions");
const answerDiv = document.querySelector(".answer");
const allanswerButtons = document.querySelectorAll(".answer button");
const btnNext = document.querySelector(".btnNext");
const btnResults = document.querySelector(".ranking");

//contador de total de preguntas que se han respondido
let totalCounter = 0;
//contador de preguntas correctas
let correctAnswers = 0;
//contador de preguntas incorrectas
let incorrectAnswers = 0;
//variable que va a tener los datos de posibles respuestas obtenido de la api
let responses;
//variable que va a tener el dato de la respuesta correcta que se obtiene de la api
let correctAnswer;

//funcion para llamar a la api y mostrar los botones con las posibles respuestas
function callApiAndDisplayAnswer() {
    //Se oculta el boton de siguiente 
    btnNext.style.display = 'none';
    //extraemos el query param del window location 
    const queryParams = window.location.href.slice(window.location.href.indexOf('?') + 1);
    const category = queryParams.split("=")[1];

    //Se llama a la api con limite de 1 pregunta y categoria 
    fetch("https://the-trivia-api.com/api/questions?limit=1&categories=" + category)
        //Despues de llamar a la api cuando response se convierte a json la respuesta 
        .then(response => response.json())
        //Despues de convertir a json, se recorre ese json con la variable data
        .then(data => data.forEach((element, i) => {
            //Se pone la pregunta en el p
            questionsP.innerText = element.question;
            //ponemos la respuesta correcta en la variable global
            correctAnswer = element.correctAnswer;
            //se ponen todas las respuestas en la variable global
            responses = [element.correctAnswer, ...element.incorrectAnswers]
            //Pones el array en un orden aleatorio
            const randomizedArray = responses.sort((a, b) => 0.5 - Math.random());
            //Con ese orden aleatorio ponemos en todos los botones los textos y 
            //borramos las clases que anteriormente se marcaron como correctas e incorrectas
            //estas clases pueden no existir porque no todas se marcan, pero no pasa nada porque 
            //el remove si no lo encuentra no hace nada
            randomizedArray.forEach((e, i) => {
                allanswerButtons[i].innerText = e;
                allanswerButtons[i].classList.remove("correctAnswer");
                allanswerButtons[i].classList.remove("incorrectAnswer");
            });
            //Habilita los botones de las respuestas
            allanswerButtons[0].disabled = false;
            allanswerButtons[1].disabled = false;
            allanswerButtons[2].disabled = false;
            allanswerButtons[3].disabled = false;
        }))
        //Capturamos el error en caso que falle la api
        .catch(error => console.log(error));
}

//Funcion que se llama desde el html por cada uno de los botones, 
//el item representa el orden de los botones en el html
function clickButton(item) {
    //Deshabilitamos todos los botones, para que no se pueda responder varias veces
    allanswerButtons[0].disabled = true;
    allanswerButtons[1].disabled = true;
    allanswerButtons[2].disabled = true;
    allanswerButtons[3].disabled = true;
    //obtenemos el valor que ha clicado el usuario
    const userRespone = allanswerButtons[item].innerText;
    if (correctAnswer === userRespone) {
        //Si es correcta la respuesta añadimos a la variable global +1
        correctAnswers++;
        //ponemos el boton que hemos clicado a verde poniendole una clase
        allanswerButtons[item].classList.add("correctAnswer");
    } else {
        //Si es incorrecta la respuesta sumamos +1 a la variable global de respuestas incorrectas
        incorrectAnswers++
        //Marcamos el boton en rojo con la clase incorrecta
        allanswerButtons[item].classList.add("incorrectAnswer");
        //Buscamos todos los botones en el div(children) y obtenemos la correcta para marcarla en verde con una clase
        for (const item of answerDiv.children) {
            if (item.innerText === correctAnswer) {
                item.classList.add("correctAnswer");
            }
        }
    }

    //Si el contador total es menor que 10, llevamos menos de 10 preguntas,
    //pintamos (desocultamos) el boton de siguiente, para que el usuario pueda clicarlo y que se vuelvan a cargar nuevas preguntas 
    if (totalCounter < 10) {
        btnNext.style.display = 'block';
    }

    //Si es 10, es decir ya hemos contestado 10
    //Desocultamos el botón de ir al ranking
    if (totalCounter == 10) {
        btnResults.style.display = 'block';
        localStorage.setItem("results", JSON.stringify({
            correctAnswers: correctAnswers,
            incorrectAnswers: incorrectAnswers,
            time: new Date()
        }))
    }

    //Contamos 1+ a la variable global del contador total para saber el numero total de respuestas que llevamos
    totalCounter++;
}

//Añadimos que cuando se pinche en siguiente vuelva a cargar desde la api las preguntas
// y cargue los valores nuevos en los botones
btnNext.addEventListener('click', (event) => {
    callApiAndDisplayAnswer();
});

//Llamamos a la api y pintar la primera vez que se carga la pagina
callApiAndDisplayAnswer(); 





