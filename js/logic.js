// Selecting all queries elements
var startButton = document.querySelector("#start");
var infoBox = document.querySelector(".info-box");



var questionNum = 0;
var timerscore = 0;

function displayQuestion() {
  var object = questionsArr[questionNum];
  var {question, choice1, choice2, choice3, choice4} = object
  var choiceArr = [choice1, choice2, choice3, choice4];

  questionTitle.textContent = question;

  for (var i = 0; i < choiceArr.length; i++) {
    var input = choiceText[i];
    var choice = choiceArr[i];
    input.innerHTML = choice;
  }
}

// startGame function is called when the start button is clicked
function startGame() {
  startButton.setAttribute("style", "display: none;")
  
  displayQuestion();

  
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();