//selecting all required elements
const startButton = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

//if startQuiz button clicked
startButton.onclick = function(){
  infoBox.classList.add("activeInfo"); //show info box
}

//if exitQuiz button clicked
exitBtn.onclick = function(){
  infoBox.classList.remove("activeInfo"); //hide info box
}

//if continueQuiz button clicked
continueBtn.onclick = function(){
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(10); //calling startTimer function
}

let timeValue =  10;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;

const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

//if restartQuiz button clicked
restartQuiz.onclick = function(){
    quizBox.classList.add("activeQuiz"); //show quiz box
    resultBox.classList.remove("activeResult"); //hide result box
    timeValue = 10; 
    queCount = 0;
    queNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(queCount); //calling showQestions function
    queCounter(queNumb); //passing queNumb value to queCounter
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    nextBtn.classList.remove("show"); //hide the next button
}

//if quitQuiz button clicked
quitQuiz.onclick = function(){
    window.location.reload(); //reload the current window
}

const nextBtn = document.querySelector("footer .next_btn");
const bottomQuesCounter = document.querySelector("footer .total_que");

//if Next Que button clicked
nextBtn.onclick = function(){
    if(queCount < questions.length -1){ //if question count is less than total question length
        queCount++; //increment the queCount value
        queNumb++; //increment the queNumb value
        showQuetions(queCount); //calling showQestions function
        queCounter(queNumb); //passing queNumb value to queCounter
        clearInterval(counter); //clear counter
        startTimer(timeValue); //calling startTimer function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        nextBtn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        showResult(); //calling showResult function
    }
}

//getting questions and options from array
function showQuetions(i){
    const queText = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array i
    let queTag = '<span>'+ questions[i].queNum + ". " + questions[i].question +'</span>';
    let optionTag = 
    '<div class="option"><span>'+ questions[i].options[0] +'</span></div>' +
    '<div class="option"><span>'+ questions[i].options[1] +'</span></div>' +
    '<div class="option"><span>'+ questions[i].options[2] +'</span></div>' +
    '<div class="option"><span>'+ questions[i].options[3] +'</span></div>';
    queText.innerHTML = queTag; //adding new span tag inside queTag
    optionList.innerHTML = optionTag; //adding new div tag inside optionTag
    
    const option = optionList.querySelectorAll(".option");

    //set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//adding sounds
const audioCorrect = document.createElement("audio");
audioCorrect.setAttribute("src", "sfx/correct.wav");

const audioInCorrect = document.createElement("audio");
audioInCorrect.setAttribute("src", "sfx/incorrect.wav");

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[queCount].answer; //getting correct answer from array
    const allOptions = optionList.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", "✔"); //adding tick icon to correct selected option
        audioCorrect.play(); //adding correct sound answer
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", "✖"); //adding cross icon to correct selected option
        audioInCorrect.play(); //adding incorrect sound answer
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                optionList.children[i].insertAdjacentHTML("beforeend", "✔"); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    nextBtn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.add("activeResult"); //show result box
    const scoreText = resultBox.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ //if user scored more than 1
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ //if user scored less than 1
        let scoreTag = '<span>You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Out"; //change the time text to time out
            const allOptions = optionList.children.length; //getting all option items
            let correcAns = questions[queCount].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    optionList.children[i].insertAdjacentHTML("beforeend", "✔"); //adding tick icon to matched option
                    console.log("Time Out: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            nextBtn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function queCounter(i){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ i +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuesCounter.innerHTML = totalQueCounTag;  //adding new span tag inside bottomQuesCounter
}

