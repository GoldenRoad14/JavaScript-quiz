/*const wins = document.querySelector('.wins');
const losses = document.querySelector('.losses');
const startButton = document.querySelector('.start-button');
const question = document.querySelector('.question');
const answers = document.querySelector('.answers');
const timer = document.querySelector(".timer")

// Question list, stored as an array
/*const questionList = [{
    q: "Inside which HTML element do we put the JavaScript?",
    a: "Answers go here" /*[{ text: "<script>", isCorrect: true },
    { text: "<js>", isCorrect: false },
    { text: "<java>", isCorrect: false },
    { text: "<scriptify>", isCorrect: false }
    ]
 
},
{
    q: "JavaScript is the only language read by web browsers?",
    a: [{ text: "True", isCorrect: false, isSelected: false },
    { text: "False", isCorrect: true },
    ]
 
}]
*/

//load question

// let currentQuestion = 0

/*function loadQuestion(){
    question.textContent = questions.[currentQuestion].q;
    ans.innerHTML = "";

    for(let i = 0; i < questions.[currentQuestion].a.length; i++){
        const choicesDiv = document.createElement("div");
        const radioButtons = document.createElement("input");
        const questionText = document.createElement("question-text");

        radioButtons.type = "radio";
        radioButtons.name = "answer";
        radioButtons.value = i;

        const qText = questionText
        
    }

} 

const questionList = [{q: "Why?", a: [{text: "Why not?", isCorrect: false, isSelected: false},{text: "Why Why Why?", isCorrect: true, isSelected: false}]}, 
                    {q: "Where?", a: [{"Anywhere but here.", isCorrect: true,},{"Maybe over there.", isCorrect: false} ]}]
let currentQuestion = 0;

function loadQuestion(){
    
    question.textContent = questionList[currentQuestion].q;
    answers.innerHTML = "";
    
    
    for (let i = 0; i < questionList[currentQuestion].a.length; i++){
        const choicesDiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");

        choice.setAttribute("type" = "radio");
        choice.setAttribute("name" = "answer");
        choice.setAttribute("value" = i);

        choiceLabel.textContent = questionList[currentQuestion].a[i].text;

        choicesDiv.appendChild(choice);
        choicesDiv.appendChild(choiceLabel);
        answers.appendChild(choicesDiv);
    }


   // question.textContent = questionList[0].q;
    console.log(question.textContent);
   // answers.textContent = questionList[0].a;
    console.log(answers.textContent);
}

loadQuestion();
*/

// Questions array
const questions = [
    {
      question: "What color is the sky?",
      options: ["Blue", "Green", "Black", "Yellow"],
      correctIndex: 0
    },
    {
        question: "Of all the things I've lost, what do I miss the most?",
        options: ["My Cat", "My Mind", "The Remote Control"],
        correctIndex: 1
    },
    {   question: "Are you going to the mall today?",
        options: ["Yes", "No", "Rizzuto"],
        correectIndex: 2
    },
    {
        question: "The Houston Texans are a cursed franchise.",
        options: ["True", "False"],
        correctIndex: 0
    },
    {
        question: "10 + 10 = ?",
        options: ["21", "3,000", "99", "20"],
        correctIndex: 3
    },
    {
        question: "Why did the chicken cross the road?",
        options: ["To get some coffee", "To visit your mom", "Frogger, IRL", "Like, chickens aren't real, man."],
        correctIndex: 3
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 30; // Initial timer value
  let timerInterval;
  
  // Function to start the quiz
  function startQuiz() {
    document.getElementById("start-btn").style.display = "none";
    loadQuestion();
    startTimer();
  }
  
  // Function to load a question
  function loadQuestion() {
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
  
    // Display current question
    questionEl.textContent = questions[currentQuestion].question;
  
    // Display options
    optionsEl.innerHTML = "";
    questions[currentQuestion].options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.onclick = () => checkAnswer(index);
      optionsEl.appendChild(optionButton);
    });
  }
  
  // Function to check the selected answer
  function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].correctIndex) {
      // Correct answer
      score++;
    } else {
      // Incorrect answer, subtract 5 seconds
      timeLeft = Math.max(0, timeLeft - 5);
    }
  
    // Move to the next question
    currentQuestion++;
  
    // Check if there are more questions or end the quiz
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
  
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("question").textContent = "Quiz Over!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("score").textContent = "Final Score: " + score;
  }
