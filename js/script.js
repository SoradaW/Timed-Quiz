// Selecting all queries elements
const startButton = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const choices = document.querySelector(".choices");
const timeText = document.querySelector(".timer .time-text");
const timeCount = document.querySelector(".timer .timer-sec");

// If startQuiz button clicked
startButton.onclick = ()=>{
  infoBox.classList.add("activeInfo"); // Show info box
}

// If continus quiz button clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  displayQuestion(0);
  questionCounter(1);
  startTimer(30);
}

var questionCount = 0;
var timeValue = 30;
var qNum = 1;
var userScore = 0;
var counter;

const restartQuiz = resultBox.querySelector(".button .restart");

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
  clearInterval(counter); // Clear counter
  timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
  nextBtn.classList.remove("show"); // Hide the "Next" button
}

const nextBtn = document.querySelector("footer .next-btn");
const bottomQueCounter = document.querySelector("footer .total-que");

// When "Next" button clicked
nextBtn.onclick = ()=> {
  // If question count is less than total question length
  if(questionCount < questionsArr.length -1){
    questionCount++; // Increment the questionCount value
    qNum++; // Increment the question number value
    displayQuestion(questionCount); 
    questionCounter(qNum);
    startTimer(timeValue);
    clearInterval(counter);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
    showResult(); // Call showResult function
  } else {
    clearInterval(counter);
    showResult();
  }
}

// Getting questions and choices for array
function displayQuestion(i) {
  const questionText = document.querySelector(".question-text")
  // Creaing a new span and div tags for questions and choices and passing the value using array index
  var questionTag = "<span>" + questionsArr[i].qNum + ". " + questionsArr[i].question + "</span>";
  var choicesTag = 
  '<div class="option"><span>' + questionsArr[i].choices[0] + '</span></div>' +
  '<div class="option"><span>' + questionsArr[i].choices[1] + '</span></div>' +
  '<div class="option"><span>' + questionsArr[i].choices[2] + '</span></div>' +
  '<div class="option"><span>' + questionsArr[i].choices[3] + '</span></div>' ;

  questionText.innerHTML = questionTag; // Adding new span tag inside question tag
  choices.innerHTML = choicesTag; // Adding new div tag inside choice tag

  const option = choices.querySelectorAll(".option");


  
  // Set onclick attribute to all available choices
  for (i = 0; i < option.length; i++){
    option[i].setAttribute("onclick", "choicesSelected(this)");
  }
}










// Create function when user clicked/chosen choices
function choicesSelected(answer){
  clearInterval(counter);
  var userAnswer = answer.textContent; // User selected answer
  var correctAnswer = questionsArr[questionCount].answer; // Getting correct answer from array
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
        choices.children[i].setAttribute("class", "option correct"); // Adding green color to macthed option
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

function showResult() {
  infoBox.classList.remove("activeInfo"); // Hide info box
  quizBox.classList.remove("activeQuiz"); // Hide quiz box
  resultBox.classList.add("activeResult"); // Show result box
  const scoreText = resultBox.querySelector(".final-score");

  // If user chosen => 3 correct answers
  if (userScore >= 60) {
    // Create a new span tag and passing the user score values and total question numbers
    var scoreTag = "<span>and congrats! 🎉, You got <p>"+ userScore + "</p> out of <p>" + questionsArr.length + "</p></span>";
    scoreText.innerHTML = scoreTag; // Adding new span tag inside score-text
  } 
  // If user chosen => 1 correct answer
  else if (userScore >= 20){
    var scoreTag = "<span>and nice 😎, You got <p>"+ userScore + "</p> out of <p>" + questionsArr.length + "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
  // If user have all incorrect answers
  else {
    var scoreTag = "<span>and sorry 😐, You got only <p>"+ userScore + "</p> out of <p>" + questionsArr.length + "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
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
          choices.children[i].setAttribute("class", "option correct"); // Adding green color to matched option
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