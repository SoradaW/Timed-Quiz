var startBtn = document.querySelector(".start");
var questionsBox = document.querySelector(".questionsDiv");
var quizContainer = document.getElementById("quiz-container");
var questionTitle = document.querySelector("#question");
var choiceText = document.querySelectorAll(".answer");
var wrongAnswer = document.querySelector(".wrong");
var scoreBoard = document.querySelector("#scoreBoard");
var submitBtn = document.querySelector("#submitBtn");
var enterName = document.querySelector("#enter-name");
var highscore = document.getElementById("hsBanner");
var board = document.getElementById("scoresContainer");
const body = document.getElementById("body");


//! Questions array

var score = 0;
var timer = 20;


var questionNumber = 0;
var timerScore = 0;

function displayQuestion() {
  var OBJECT = questionsArray[questionNumber];
  var { question, choice1, choice2, choice3, choice4 } = OBJECT;
  var choiceArray = [choice1, choice2, choice3, choice4];

  questionTitle.textContent = question;

  for (var i = 0; i < choiceArray.length; i++) {
    var input = choiceText[i];
    var choice = choiceArray[i];
    input.innerHTML = choice;
  }
}

function clearQuestion() {
  questionsBox.setAttribute("style", "width: 250px; height: 150px");
  quizContainer.setAttribute("style", "width: 25%");
  questionsBox.style.display = "none";
  scoreBoard.style.display = "none";
  enterName.setAttribute("style", "visibility: visible");
  submitBtn.style.visibility = "visible";
}

startBtn.addEventListener("click", function () {
//   startBtn.style.display = "none";
startBtn.setAttribute("style", "display: none;")

  displayQuestion();

  for (var i = 0; i < 4; i++) {
    var input = choiceText[i];
    input.addEventListener("click", function (e) {

      const myPick = e.currentTarget.textContent
      const answer = questionsArray[questionNumber].answer
      console.log(myPick, answer)
      
      if (myPick === answer ) {
        score += 1;
      } else {
          
          timer -= 5
      }

      questionNumber++;
      console.log(questionNumber);
      if (questionNumber >= questionsArray.length ) {  
        clearQuestion();
        clearInterval(interval);
        countdown.innerHTML = "End";
        timerScore = timer;
        return;     
      } 

      displayQuestion();
    });
  }
  
  let interval = setInterval(function () {
    timer--;
    countdown = document.getElementById("countdown");
    if(!countdown) return // what does return do
    if (timer >0) {
      
      countdown.innerHTML = timer;
    }else if (timer === 0) {
      countdown.innerHTML = "End";
      clearInterval(interval);
      clearQuestion();
    } else {
        return // what does return do
    }
  }, 1000);
});



var highscoresArr = [];
var localStorageContent = localStorage.getItem('High Scores')
localStorageContent = JSON.parse(localStorageContent);

if(localStorageContent !== null) {
    highscoresArr = localStorageContent
}

console.log(localStorageContent);

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

  console.log(body);
  console.log(event);

  let isNumber = typeof Number(enterName.value) === 'number'


  if(enterName.value === ''  ) {
      alert("You need to enter a name!") 
      return
  } 

  enterName.value = enterName.value; ///
  
  var scoreText = `Score: ${score} You finished the quiz in ${timerScore} seconds`;
  var currentScore = {'name': enterName.value, 'scoreTimer': scoreText};

  highscoresArr.push(currentScore);
  localStorage.setItem('High Scores', JSON.stringify(highscoresArr));
  var userDisplayName = ""; ///

  for(var i = 0; i < highscoresArr.length; i++){
    highscoresArr[i]
    console.log(highscoresArr[i]);
    userDisplayName += `
    <div id="name-container">
  ${'Player Name: ' +  highscoresArr[i].name} 
  </div>
  <div>
    ${highscoresArr[i].scoreTimer}
  </div>`;
  }

  body.innerHTML = `         
  <div  id="hsBanner">
    <h1>HIGH SCORES!</h1>
  </div>
  <div id="scoresContainer">
    ${userDisplayName}
  </div>`;
  

  localStorage.setItem('Player Score/Time', scoreText)

  console.log("Player Name: " + enterName.value + scoreText); 

  var savedName = localStorage.getItem('Player Name');
  var savedScore = localStorage.getItem('Player Score/Time');


  
if (savedName) {
	enterName.textContent = savedName;
} else if (savedScore) {
    scoreText.textContent = savedScore
}

});