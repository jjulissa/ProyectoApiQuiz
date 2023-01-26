const buttonRanking = document.querySelector(".ranking");
// si no existe resultado en el LS desactivamos boton de resultados
if (localStorage.getItem("results") === null) {
    buttonRanking.style="pointer-events: none";
}
const buttonStart= document.querySelector(".start");
const select= document.querySelector("#select-category");

// cada vez que cambie el selector de categoria añadimos el query param para cuando 
// navegue a la pantalla de start, tengamos la categoria 
select.addEventListener("change", (event)=>{
buttonStart.href= "./Page/quiz.html?category="+event.target.value
});
