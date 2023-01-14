// Creating an array and passing the number, questions, options, and answers
var questionsArr = [
  // Question 1
  { qNum: 1,
    question: "Inside which HTML element do we put the JavaScript",
    choices: ["<js>","<scripting>","<javascript>","<script>"],
    answer: "<script>",
  },

  // Question 2
  { qNum: 2,
    question: "How do you create a function in JavaScript?",
    choices: [
      "function myFunction()", 
      "function:myFunction()", 
      "function = myFunction()", 
      "function = myFunction;"
    ],
    answer: "function myFunction()",
  },

  // Question 3
  { qNum: 3,
    question: "How to write an IF statement in JavaScript?",
    choices: [
      "if (i == 5)", 
      "if i = 5", 
      "if i = 5 then", 
      "if i == 5 then"
    ],
    answer: "if (i == 5)",
  },

  // Question 4
  { qNum: 4,
    question: "How does a FOR loop start?",
    choices: [
      "for (i = 0; i <= 5; i++)", 
      "for (i = 1 to 5)", 
      "for (i = 0; i <= 5)", 
      "for (i <= 5; i++)"
    ],
    answer: "for (i = 0; i <= 5; i++)",
  },

  // Question 5
  { qNum: 5,
    question: "How do you round the number 7.25, to the nearest integer?",
    choices: [
      "Math.round(7.25)", 
      "Math.rnd(7.25)", 
      "round(7.25)", 
      "rnd(7.25)"
    ],
    answer: "Math.round(7.25)",
  },
  //and so on questions as much as we want
];

