// Selecting all queries elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const choices = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const nextBtn = document.querySelector("footer .next_btn");
const bottomQueCounter = document.querySelector("footer .total_que");
const continueBtn = infoBox.querySelector(".buttons .restart");

// If startQuiz button clicked
startBtn.onclick = function(){
  infoBox.classList.add("activeInfo"); // Show info box
}
// If exitQuiz button clicked
exitBtn.onclick = function(){
  infoBox.classList.remove("activeInfo"); //hide info box
}

// If start quiz button clicked
continueBtn.onclick = function(){
  infoBox.classList.remove("activeInfo"); // Hide info box
  quizBox.classList.add("activeQuiz"); // Show quiz box
  displayQuestion(0);
  queCounter(1);
  startTimer(10);
}

var queCount = 0;
var timeValue = 10;
var queNum = 1;
var userScore = 0;
var counter;

const restartQuiz = resultBox.querySelector(".button .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

// When restartQuiz button clicked
restartQuiz.onclick = function(){
  quizBox.classList.add("activeQuiz"); // Show quiz box
  resultBox.classList.remove("activeResult"); // Hide result box
  queCount = 0;
  timeValue = 10;
  queNum = 1;
  userScore = 0;
  displayQuestion(queCount); // Call displayQuestion function
  queCounter(queNum); // Passing question number value to queCounter
  startTimer(timeValue); // Call startTimer function
  clearInterval(counter); // Clear counter
  timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
  nextBtn.classList.remove("show"); // Hide the "Next" button
}

// If quitQuiz button clicked
quitQuiz.onclick = function(){
  window.location.reload(); // Reload the current window
}

// Getting questions and choices for array
function displayQuestion(i){
  const questionText = document.querySelector(".que_text");

  // Creaing a new span and div tags for questions and choices and passing the value using array index
  var queTag = '<span>' + questionsArr[i].queNum + ". " + questionsArr[i].question + '</span>';
  var choicesTag = 
  '<div class="option"><span>' + questionsArr[i].choices[0] + '</span></div>' +
  '<div class="option"><span>' + questionsArr[i].choices[1] + '</span></div>' +
  '<div class="option"><span>' + questionsArr[i].choices[2] + '</span></div>' +
  '<div class="option"><span>' + questionsArr[i].choices[3] + '</span></div>';

  questionText.innerHTML = queTag; // Adding new span tag inside question tag
  choices.innerHTML = choicesTag; // Adding new div tag inside choice tag

  const option = choices.querySelectorAll(".option");
  // Set onclick attribute to all available choices
  for (i = 0; i < option.length; i++){
    option[i].setAttribute("onclick", "choicesSelected(this)");
  }
}

// When "Next" button clicked
nextBtn.onclick = function(){
  // If question count is less than total question length
  if(queCount < questionsArr.length -1){
    queCount++; // Increment the queCount value
    queNum++; // Increment the question number value
    displayQuestion(queCount); 
    queCounter(queNum);
    startTimer(timeValue);
    clearInterval(counter);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
  } else {
    clearInterval(counter); // Clear counter
    showResult(); // Call showResult function
  }
}

// Create function when user clicked/chosen choices
function choicesSelected(answer){
  clearInterval(counter);
  var userAnswer = answer.textContent; // User selected answer
  var correctAnswer = questionsArr[queCount].answer; // Getting correct answer from array
  const allChoices = choices.children.length; // Getting all choices values

  if(userAnswer == correctAnswer){
    // If user chosen correct answer +20 points
    userScore += 1; // Adding score values 
    answer.classList.add("correct"); // Adding green color to correct option using.classList.add 
    answer.insertAdjacentHTML("beforeend", "✔"); // Adding "Correct" to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answer = " + userScore);
  } else {
    answer.classList.add("incorrect"); // Adding red color to correct option using.classList.add 
    answer.insertAdjacentHTML("beforeend", "✖"); // Adding "Incorrect" to incorrect selected option
    console.log("Wrong Answer");
    // If there is an option which is matched to an array answer
    for (i = 0; i < allChoices; i++){
      if(choices.children[i].textContent == correctAnswer){ 
        choices.children[i].setAttribute("class", "option correct"); // Adding green color to macthed option
        choices.children[i].insertAdjacentHTML("beforeend", "✔"); // Adding "Correct" to matched option
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
  const scoreText = resultBox.querySelector(".score_text");

  // If user chosen => 3 correct answers
  if (userScore > 3) {
    // Create a new span tag and passing the user score values and total question numbers
    var scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore + '</p> out of <p>' + questionsArr.length + '</p></span>';
    scoreText.innerHTML = scoreTag; // Adding new span tag inside score-text
  } 
  // If user chosen => 1 correct answer
  else if (userScore > 1){
    var scoreTag = '<span>and nice 😎, You got <p>'+ userScore + '</p> out of <p>' + questionsArr.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  // If user have all incorrect answers
  else {
    var scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore + '</p> out of <p>' + questionsArr.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    // Change the value of timeCount with time value
    timeCount.textContent = time; 
    time--; // Decrement the time value
    // If timer is less than 9
    if(time < 9){
      var addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; // Add 0 infront time value
    }
    // If timer is less than 0
    if(time < 0){
      clearInterval(counter); // Clear counter
      timeText.textContent = "Time Out"; // Change time text to time out
      const allChoices = choices.children.length; // Getting all choices
      var correctAnswer = questionsArr[queCount].answer; // Getting correct answer from array
      for (i = 0; i < allChoices; i++){
        // If there is an option matched an array answer
        if(choices.children[i].textContent == correctAnswer){
          choices.children[i].setAttribute("class", "option correct"); // Adding green color to matched option
          choices.children[i].insertAdjacentHTML("beforeend", "✔");
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

function queCounter(i){
  // Create a new span tag and passing the question number and total question
  var totalQueCount = '<span><p>' + i + '</p> of <p>' + questionsArr.length + '</p> Questions</span>';
  bottomQueCounter.innerHTML = totalQueCount; // Adding new span tag inside bottomQueCounter
}
