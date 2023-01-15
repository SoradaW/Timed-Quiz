function showResult() {
  infoBox.classList.remove("activeInfo"); // Hide info box
  quizBox.classList.remove("activeQuiz"); // Hide quiz box
  resultBox.classList.add("activeResult"); // Show result box
  const scoreText = resultBox.querySelector(".final-score");

  // If user chosen => 3 correct answers
  if (userScore => 60) {
    // Create a new span tag and passing the user score values and total question numbers
    var scoreTag = "<span>and congrats! 🎉, You got <p>"+ userScore + "</p> out of <p>" + questionsArr.length + "</p></span>";
    scoreText.innerHTML = scoreTag; // Adding new span tag inside score-text
  } 
  // If user chosen => 1 correct answer
  else if (userScore > 20){
    var scoreTag = "<span>and nice 😎, You got <p>"+ userScore + "</p> out of <p>" + questionsArr.length + "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
  // If user have all incorrect answers
  else {
    var scoreTag = "<span>and sorry 😐, You got only <p>"+ userScore + "</p> out of <p>" + questionsArr.length + "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}