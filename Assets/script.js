function resetQuiz(){
document.getElementById("high-score-list").style.display = "none";
    clearInterval(timerInterval);
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById("score-value").innerHTML = score;
startQuiz();
}

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

const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", startQuiz) 
    console.log("init!");
    

function startQuiz(){
    console.log("Quiz initialized!");
    startBtn.style.display = "none";
    loadQuestion();
    startTimer();
}

function loadQuestion(){
    questionEl = document.getElementById("question");
    optionsEl = document.getElementById("options");

    questionEl.textContent = questions[currentQuestion].question;
    console.log(questionEl.textContent);

    optionsEl.innerHTML = "";
    for(let i = 0; i < questions[currentQuestion].options.length; i++){
        const options = questions[currentQuestion].options[i];
        const optionButton = document.createElement("button");
        optionButton.textContent = options;
        optionButton.onclick = function(){
            checkAnswer(i);
        }
        optionsEl.appendChild(optionButton);
    }
}

function checkAnswer(i){
    if(i === questions[currentQuestion].correct){
        score++;
        document.getElementById("score-value").innerHTML = score;
        console.log("correct!");
    } else {
        console.log("wrong answer");
        timeLeft = Math.max(0, timeLeft - 5);
    }

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    } else{
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if(timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

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
    const existingScores = JSON.parse(localStorage.getItem("highScores")) || [];
    existingScores.push(userScore);
        console.log(userScore);
    localStorage.setItem("highScores", JSON.stringify(existingScores));
        console.log(existingScores);
    displayScores();
    });
   
}

    // need to add code to capture initials and write initials + score to local memory 
    //add view high scores link
    //add go back button & clear scores buttons



//div element form in html that's hidden
//get score unhides the div and accepts user input
//
function displayScores(){
document.getElementById("high-score-initials").style.display = "none";
// console.log("DISPLAYSCORES");
const score1 = document.getElementById("score-1");
const score2 = document.getElementById("score-2");
const score3 = document.getElementById("score-3");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
highScores.sort((a, b) => b.score - a.score);
const topThreeScores = highScores.slice(0,3);

for (let i=0; i < topThreeScores.length; i++){
const listItem = document.getElementById(`score-${i + 1}`);
console.log(listItem);
listItem.textContent = `${i+1}: ${topThreeScores[i].initials} - ${topThreeScores[i].score}`;
}
console.log(topThreeScores);
document.getElementById("high-score-list").style.display = "block";

playAgain();

}

function playAgain(){
const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", function(event){
    event.preventDefault();
    // resetQuiz();
   location.reload(); 
});
}