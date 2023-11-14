// Function to clear values and restart quiz
function resetQuiz(){
document.getElementById("high-score-list").style.display = "none";
    clearInterval(timerInterval);
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById("score-value").innerHTML = score;
startQuiz();
}
// define questions for quiz
const questions = [
    {question: "What is the DOM?", options: ["Double Object Modulus", "Document Object Model", "Delirious Orange Man", "Documents Objectifying Men"], correct:1},
    {question: "Which of these defines a variable?", options:["veryable","var","var, matey","variable"], correct:1},
    {question: "In a galaxy far far away, what function would Disney use to print output to the console?", options:["print.any.key","hansolo.log()","console.print()","Doesn't work, their computers are Frozen. 🥶😂"], correct: 1},
    {question: "What keyword is used to break out of a loop?", options: ["break", "OMG! Stop.it.now!", "end.script","terminate"], correct:0},
    {question: "What is the purpose of the Array.isArray() method in JavaScript?", options:["To check if the variable is a ray","To see if the function is named Array","To see if the variable is an Array","To see if the array was at 31 flavors with Ferris last night."], correct: 2},
    {question: "Which event is triggered when a user clicks on an HTML element in JavaScript?", options: ["The snowflake", "onhover","dblclick","onclick"], correct: 3}
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
// get start button from HTML and begin quiz
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startQuiz) 

function startQuiz(){
    console.log("Quiz initialized!");
    startBtn.style.display = "none";
    loadQuestion();
    startTimer();
}

// this function loads the questions from the questions array
function loadQuestion(){
    questionEl = document.getElementById("question");
    optionsEl = document.getElementById("options");

    questionEl.textContent = questions[currentQuestion].question;

    optionsEl.innerHTML = ""; //clears the options for the next question
    for(let i = 0; i < questions[currentQuestion].options.length; i++){
        const options = questions[currentQuestion].options[i];
        const optionButton = document.createElement("button");
        optionButton.classList.add("quiz-option");
        optionButton.textContent = options;
        optionButton.onclick = function(){
            checkAnswer(i); //calls checkAnswer function
        }
        optionsEl.appendChild(optionButton); //adds option buttons to HTML for each question
    }
}
// function that checks the answer
function checkAnswer(i){
    if(i === questions[currentQuestion].correct){
        score++;
        document.getElementById("score-value").innerHTML = score;
    } else {
        timeLeft = Math.max(0, timeLeft - 5);
    }

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    } else{
        endQuiz();
    }
}
// timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if(timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

//end quiz function - get initials and save high score to local memory
function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("question").textContent = "Quiz Over!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("score").textContent = "Final Score: " + score;
    document.getElementById("high-scores").style.display = "block";
    document.getElementById("high-score-initials").addEventListener("submit", function(event){
        event.preventDefault();
    
    const initials = document.getElementById("initials").value;
    const userScore = {initials: initials, score: score};
    const existingScores = JSON.parse(localStorage.getItem("highScores")) || []; //adds current score to the stored highScores
    existingScores.push(userScore);
        console.log(userScore);
    localStorage.setItem("highScores", JSON.stringify(existingScores));
        console.log(existingScores);
    displayScores(); //calls displayScores function to show top scores
    });
   
}

function displayScores(){
document.getElementById("high-score-initials").style.display = "none";
const score1 = document.getElementById("score-1");
const score2 = document.getElementById("score-2");
const score3 = document.getElementById("score-3");
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //gets high scores from local storage
highScores.sort((a, b) => b.score - a.score); //sorts stored high scores
const topThreeScores = highScores.slice(0,3); //puts highest 3 scores in a variable
//for loop that returns the top 3 scores and assigns them to the li elements in the HTML
for (let i=0; i < topThreeScores.length; i++){
const listItem = document.getElementById(`score-${i + 1}`);
listItem.textContent = `${i+1}: ${topThreeScores[i].initials} - ${topThreeScores[i].score}`;
}
document.getElementById("high-score-list").style.display = "block";

playAgain(); //loads playAgain function

}

function playAgain(){
const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", function(event){
    event.preventDefault();
   location.reload(); //reload page to start the quiz again.
});
}