// Selecting all queries elements
const startButton = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = info-box.querySelector(".buttons .quit");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const choices = document.querySelector(".choices");
const timeText = document.querySelector(".timer .time-text");
const timeCount = document.querySelector(".timer .timer-sec");

const continueBtn = info-box.querySelector(".buttons .restart");

// if startQuiz button clicked
startBtn.onclick = ()=>{
  infoBox.classList.add("activeInfo"); //show info box
}

// Attach event listener to start button to call startGame function on click
//startButton.addEventListener("click", startGame);
startButton.onclick = ()=>{
  infoBox.classList.remove("activeInfo"); // Hide info box
  quizBox.classList.add("activeInfo"); //Show quiz box
  displayQuestion(0); // Call displayQuestion function
  startTimer(30); // Call startTimer fucntion
  questionCounter(1); // Passing 1 parameter to questionCounter
}

var questionCount = 0;
var timeValue = 30;
var qNum = 1;
var userScore = 0;

const restartQuiz = result-box.querySelector(".button .restart");
const quitQuiz = result-box.querySelector(".button .quit");

// When restartQuiz button clicked
restartQuiz.onclick = ()=>{
  quizBox.classList.add("activeQuiz"); // Show quiz box
  resultBox.classList.remove("activeResult"); // Hide result box
  questionCount = 0;
  timeValue = 30;
  qNum = 1;
  userScore = 0;
  displayQuestion(questionCount); // Call displayQuestion function
  questionCounter(qNum); // Passing question number value to questionCounter
  startTimer(timeValue); // Call startTimer function
  timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
  next-exitBtn.classList.remove("show"); // Hide the "Next" button
}

// If quitQuiz button clicked
quitQuiz.onclick = ()=> {
  window.location.reload(); // Reload the current window
}

const nextBtn = document.querySelector("footer .next-btn");
const bottomQueCounter = document.querySelector("footer .total-que");

// When Next button clicked
nextBtn.onclick = ()=> {
  // If question count is less than total question length
  if(questionCount < questions.length -1){
    questionCount++; // Increment the questionCount value
    qNum++; // Increment the question number value
    displayQuestion(questionCount); 
    questionCounter(qNum);
    startTimer(timeValue);timeText.textContent = "Time Left";
    next-exitBtn.classList.remove("show");
    showResult(); // Call showResult function
  }
}

// Getting questions and choices for array
function displayQuestion(i) {
  const questionText = document.querySelector(".question-text")
  // Creaing a new span and div tags for questions and choices and passing the value using array index
  var questionTag = "<span>" + questionsArr[i].qNum + questionsArr[i].question + "</span>";
  var choicesTag = 
  "<div class="option"><span>" + questions[i].choices[0] + "</span></div>" +
  "<div class="option"><span>" + questions[i].choices[1] + "</span></div>" +
  "<div class="option"><span>" + questions[i].choices[2] + "</span></div>" +
  "<div class="option"><span>" + questions[i].choices[3] + "</span></div>" ;
  questionText.innerHTML = questionTag; // Adding new span tag inside question tag
  choices.innerHTML = choicesTag; // Adding new div tag inside choice tag

  const option = choices.querySelectorAll(".choices");
  // Set onclick attribute to all available choices
  for (i = 0; i < choices.length; i++){
    choices[i].setAttribute("onclick", "choicesSelected(this)");
  }
}

// Create function when user clicked/chosen choices
function choicesSelected(answer){
  var userAnswer = answer.textContent; // User selected answer
  var correctAnswer = questions[questionCount].answer; // Getting correct answer from array
  const allChoices = choices.children.length; // Getting all choices values

  if(userAnswer == correctAnswer){
    // If user chosen correct answer +20 points
    userScore += 20; // Adding score values 
    answer.classList.add("correct"); // Adding green color to correct option using.classList.add 
    console.log("Correct Answer");
    console.log("Your correct answer = " + userScore);
  } else {
    answer.classList.add("incorrect"); // Adding red color to correct option using.classList.add 
    console.log("Wrong Answer");
    // If there is an option which is matched to an array answer
    for (i = 0; i < allChoices; i++){
      if(choices.children[i].textContent == correctAnswer){ 
        choices.children[i].setAttribute("class", "choice correct"); // Adding green color to macthed option
        console.log("Auto selected correct answer.");
      }
    }
  }
  // Once user select their choice then disabled all choices
  for (i = 0; i < allChoices; i++){
    choices.children[i].classList.add("disabled"); 
  }
  nextBtn.classList.add("show"); // Show the "Next" button when user selected any choices
}

function startTimer(time){
  counter = setInterval(timer, 3000);
  function timer(){
    // Change hte value of timeCount with time value
    timeCount.textContent = time; 
    time--; // Decrement the time value
    // If timer is les than 9
    if(time < 9){
    var addZero = timeCount.textContent;
    timeCount.textContent = "0" + addZero; // Add 0 infront time value
    }
    // If timer is les than 0
    if(time < 0){
      clearInterval(counter); // Clear counter
      timeText.textContent = "Time Out"; // Change time text to time out
      const allChoices = choices.children.length; // Getting all choices
      var correctAnswer = questions[qNum].answer; // Getting correct answer from array
      for (i = 0; i < allChoices; i++){
        // If there is an option matched an array answer
        if(choices.children[i].textContent == correctAnswer){
          choices.children[i].setAttribute("class", "choice correct"); // Adding green color to matched option
          console.log("Time Out: Auto selected correct answer.");
        }
      }
      // Once user select their choice then disabled all choices
      for (i = 0; i < allChoices; i++){
        choices.children[i].classList.add("disabled");
      }
      nextBtn.classList.add("show"); // Show the "Next" button when user selected any choices
    }
  }
}

function questionCounter(i){
  // Create a new span tag and passing the question number and total question
  var totalQueCount = "<span><p>" + i + "</p> of <p>" + questions.length + "</p> Questions</span>";
  bottomQueCounter.innerHTML = totalQueCount; // Adding new span tag inside bottomQueCounter
}
