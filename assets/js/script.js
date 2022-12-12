/* jshint esversion: 11 */

// creating variables to manipulate the DOM 
let shuffledQuestions;
let questionIndex = 0;
// correct and incorrect counter
let rightAnswerSpan = document.getElementById("right-score");
let rightAnswers = 0;
let wrongAnswerSpan = document.getElementById("wrong-score");
let wrongAnswers = 0;
// how to play button and box
let howToPlayButton = document.getElementById("how-to");
let howToPlayBox = document.getElementById("how-to-play");
let closeHowTo = document.getElementById("close-how-to");
// game and score area
let hideGameArea = document.getElementsByClassName("game-area");
let hideScoreArea = document.getElementsByClassName("score-area");
// next and reset button
let nextButton = document.getElementById("next");
let resetButton = document.getElementById("restart");
let resetInfo = document.getElementById("restart-info");
// question counter
let questionNr = document.getElementById("question-nr");
let questionCount = document.getElementById("question-count");
// the questions 
let questionSpan = document.getElementById("question");
// target all inputs and labels for the options
let optionInputs = document.querySelectorAll("#options input");
let optionLabels = document.querySelectorAll("#options label");


// counter for the variable questions in quiz.html
questionCount.innerText = questions.length;

// shuffle questions using math random
shuffleQuestions();
function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    getNextQuestion();
}

// enable options and call on changeQuestions function
function getNextQuestion() {
    enableOptions();
    changeQuestions(shuffledQuestions[questionIndex]);
}

// changeQuestions function
function changeQuestions(question) {
    questionNumber();
    questionSpan.innerText = question.question; 
    optionLabels.forEach(function(label, labelIndex) {
        question.answers.forEach(function(answer, answerIndex) {
            if (labelIndex == answerIndex) {
                label.innerText = answer.text; 
                if (answer.correct) {
                    label.dataset.correct = answer.correct; //if answer correct label text turns green
                    label.previousElementSibling.dataset.correct = answer.correct; // if input radio button answer is correct then label text also turns green
                }
                label.addEventListener("click", checkAnswer);
                label.previousElementSibling.addEventListener("click", checkAnswer);
            }
        });
    });
}

// function to check the answer user picked
function checkAnswer(e) {
    disableOptions();
    nextButton.classList.remove("hidden"); // next button showns again when user clicks one option
    let selectedLabel, selectedItem, pointValue;
    selectedItem = e.target;
    if (selectedItem.nodeName == "INPUT") { 
        selectedLabel = selectedItem.nextElementSibling;
        pointValue = 1;
    } else {
        selectedLabel = selectedItem; 
        pointValue = 0;
    }
    let dataValue = selectedLabel.dataset.correct;
    // check to see if the user is incorrect or correct
    if (dataValue) {
        correctAnswer(selectedLabel, pointValue);
    } else {
        wrongAnswer(selectedLabel, pointValue);
    }
    if(shuffledQuestions.length > questionIndex + 1) {
        nextButton.addEventListener("click", nextQuestion);
    } else {
        nextButton.classList.add("hidden"); // when all questions have been shown hide next button and 
        resetButton.classList.remove("hidden"); // replace it with reset button
        resetInfo.classList.remove("hidden"); // reset info.
    }
}

// disable other options when user picked one
function disableOptions() {
    optionLabels.forEach(label => {
        label.classList.add("disabled"); // labels disabled
    });
    optionInputs.forEach(input => {
        input.classList.add("disabled"); //input disabled
    });
}

// enable options again for next question
function enableOptions() {
    optionLabels.forEach(label => {
        label.classList.remove("disabled"); // labels enabled
    });
    optionInputs.forEach(input => {
        input.classList.remove("disabled"); // inputs enabled
    });
}

// reload page when user clicks restart button
resetButton.addEventListener("click", restartGame);
function restartGame() {
    location.reload();
}

// increase answered questions counter by one
function questionNumber() {
    questionNr.innerText = questionIndex + 1;
}

// remove correct and incorrect classes for next question
function nextQuestion() {
    optionInputs.forEach(input => {
        delete input.dataset.correct;
        input.checked = false;
        input.classList.remove("correct", "incorrect"); // remove classes from inputs
    });
    optionLabels.forEach(label => {
        delete label.dataset.correct;
        label.classList.remove("correct", "incorrect"); // remove classes from labels
    });
    questionIndex++;
    getNextQuestion();
}

// Correct answer counter
function correctAnswer(selectedLabel, pointValue) {
    selectedLabel.classList.add("correct");
    rightAnswers += pointValue;
    rightAnswerSpan.innerText = rightAnswers;
}

// Incorrect answer counter
function wrongAnswer(selectedLabel, pointValue) {
    selectedLabel.classList.add("incorrect");
    wrongAnswers += pointValue;
    wrongAnswerSpan.innerText = wrongAnswers;
}

// How to play box

// Event listener for how to play button
howToPlayButton.addEventListener("click", showRulesBox); 

// Function to show how to play box
function showRulesBox() {
    howToPlayBox.classList.remove("hidden");
    // hide everything else in background
    hideGameArea[0].classList.add("hidden");
    hideScoreArea[0].classList.add("hidden");
}

 // Closes how to play box
 closeHowTo.addEventListener("click", closeRulesBox);

 function closeRulesBox() {
    howToPlayBox.classList.add("hidden");
    // show content again when how to closes
    hideGameArea[0].classList.remove("hidden");
    hideScoreArea[0].classList.remove("hidden");
 }
