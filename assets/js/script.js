/* jshint esversion: 11 */
let shuffledQuestions;
let questionIndex = 0;
let rightAnswerSpan = document.getElementById("right-score");
let rightAnswers = 0;
let wrongAnswerSpan = document.getElementById("wrong-score");
let wrongAnswers = 0;
let howToPlayButton = document.getElementById("how-to");
let howToPlayBox = document.getElementById("how-to-play");
let closeHowTo = document.getElementById("close-how-to");
let hideGameArea = document.getElementsByClassName("game-area");
let hideScoreArea = document.getElementsByClassName("score-area");
let nextButton = document.getElementById("next");
let resetButton = document.getElementById("restart");
let questionNr = document.getElementById("question-nr");
let optionInputs = document.querySelectorAll("#options input");
let optionLabels = document.querySelectorAll("#options label");
let questionSpan = document.getElementById("question");
let questionCount = document.getElementById("question-count");

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

function checkAnswer(e) {
    nextButton.classList.remove("hidden");
    let selectedLabel;
    let selectedItem = e.target;
    if (selectedItem.nodeName == "INPUT") {
        selectedLabel = selectedItem.nextElementSibling;
    } else {
        selectedLabel = selectedItem;
    }
    let dataValue = selectedLabel.dataset.correct;
    // check to see if the user is incorrect or correct
    if (dataValue) {
        correctAnswer(selectedLabel);
    } else {
        wrongAnswer(selectedLabel);
    }
    if(shuffledQuestions.length > questionIndex + 1) {
        nextButton.addEventListener("click", nextQuestion);
    } else {
        nextButton.classList.add("hidden");
        resetButton.classList.remove("hidden");
    }
}

resetButton.addEventListener("click", restartGame);
function restartGame() {
    location.reload();
}

function questionNumber() {
    questionNr.innerText = questionIndex + 1;
}

function nextQuestion() {
    optionInputs.forEach(input => {
        delete input.dataset.correct;
        input.checked = false;
        input.classList.remove("correct", "incorrect");
    });
    optionLabels.forEach(label => {
        delete label.dataset.correct;
        label.classList.remove("correct", "incorrect");
    });
    questionIndex++;
    getNextQuestion();
}

/* Correct answer counter */ 
function correctAnswer(selectedLabel) {
    selectedLabel.classList.add("correct");
    rightAnswers += 0.5;
    rightAnswerSpan.innerText = rightAnswers;
}

/* Incorrect answer counter */ 
function wrongAnswer(selectedLabel) {
    selectedLabel.classList.add("incorrect");
    wrongAnswers += 0.5;
    wrongAnswerSpan.innerText = wrongAnswers;
}

/* How to play box */

/* Event listener for how to play button */
howToPlayButton.addEventListener("click", showRulesBox); 

/* Function to show how to play box */ 
function showRulesBox() {
    howToPlayBox.classList.remove("hidden");
    /* hide everything else in background */
    hideGameArea[0].classList.add("hidden");
    hideScoreArea[0].classList.add("hidden");
};

 /* Closes how to play box */
 closeHowTo.addEventListener("click", closeRulesBox);

 function closeRulesBox() {
    howToPlayBox.classList.add("hidden");
    /* show content again when how to closes */
    hideGameArea[0].classList.remove("hidden");
    hideScoreArea[0].classList.remove("hidden");
 }
