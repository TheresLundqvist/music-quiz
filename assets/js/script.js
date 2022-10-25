/* jshint esversion: 11 */
let shuffledQuestions;
let questionIndex = 0;
let rightAnswerSpan = document.getElementById("right-score");
let rightAnswers = 0;
let wrongAnswerSpan = document.getElementById("wrong-score");
let wrongAnswers = 0;
let nextButton = document.getElementById("next");
let resetButton = document.getElementById("restart");
let questionNr = document.getElementById("question-nr");
let optionInputs = document.querySelectorAll("#options input");
let optionLabels = document.querySelectorAll("#options label");
let questionSpan = document.getElementById("question");
let questionCount = document.getElementById("question-count");

function changeQuestions() {
    let questions = document.getElementById("question");

questionCount.innerText = questions.length;

shuffleQuestions();
function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    getNextQuestion();
}

function getNextQuestion() {
    changeQuestions(shuffledQuestions[questionIndex]);
}

function changeQuestions(question) {
    questionNumber();
    questionSpan.innerText = question.question;
    optionLabels.forEach(function(label, labelIndex) {
        question.answers.forEach(function(answer, answerIndex) {
            if (labelIndex == answerIndex) {
                label.innerText = answer.text;
                if (answer.correct) {
                    label.dataset.correct = answer.correct;
                    label.previousElementSibling.dataset.correct = answer.correct;
                }
                label.addEventListener("click", checkAnswer);
                label.previousElementSibling.addEventListener("click", checkAnswer);
            }
        });
    });
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
howToPlayButton.addEventListener("click", showRulesBox); 

/* Function to show how to play box */ 
function showRulesBox() {
    howToPlayBox[0].classList.remove("hidden");
};

 /* Closes how to play box */
 closeHowTo.addEventListener("click", closeRulesBox);

 function closeRulesBox() {
    howToPlayBox[0].classList.add("hidden");
 }
 




function highScores() {

}
