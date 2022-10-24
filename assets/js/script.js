/* jshint esversion: 11 */

function changeQuestions() {
    let questions = document.getElementById("question");

}

function questionNumber() {

}

function changeOptions() {

}

function nextQuestion() {

}

function correctAnswer() {

}

function wrongAnswer() {

}

/* How to play box */ 
const howToPlayButton = document.getElementById("how-to");
const howToPlayBox = document.getElementsByClassName("how-to-play");
const closeHowTo = document.getElementById("close-how-to");

/* Event listener for how to play button */
howToPlayButton.addEventListener("click", e => {
    howToPlayBox.classList.remove("hidden");
});

 /* Closes how to play box */
 closeHowTo.addEventListener("click", e => {
    howToPlayBox.classList.add("hidden");
});

function highScores() {

}
