// Creating an array and passing the number, questions, options, and answers
var questionsArr = [
  // Question 1
  { queNum: 1,
    question: 'How do you write "Hello World" in an alert box?',
    choices: [
      'msgBox("Hello World");',
      'alert("Hello World");',
      'msg("Hello World");',
      'alertBox("Hello World");'
    ],
    answer: 'alert("Hello World");',
  },

  // Question 2
  { queNum: 2,
    question: 'What is the correct way to write a JavaScript array?',
    choices: [
      'var colors = (1:"red", 2:"green", 3:"blue")', 
      'var colors = ["red", "green", "blue"]', 
      'var colors = "red", "green", "blue"', 
      'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'
    ],
    answer: 'var colors = ["red", "green", "blue"]',
  },

  // Question 3
  { queNum: 3,
    question: 'How to write an IF statement in JavaScript?',
    choices: [
      'if (i == 5)', 
      'if i = 5', 
      'if i = 5 then', 
      'if i == 5 then'
    ],
    answer: 'if (i == 5)',
  },

  // Question 4
  { queNum: 4,
    question: 'How does a FOR loop start?',
    choices: [
      'for (i = 0; i <= 5; i++)', 
      'for (i = 1 to 5)', 
      'for (i = 0; i <= 5)', 
      'for (i <= 5; i++)'
    ],
    answer: 'for (i = 0; i <= 5; i++)',
  },

  // Question 5
  { queNum: 5,
    question: 'How do you round the number 7.25, to the nearest integer?',
    choices: [
      'Math.round(7.25)', 
      'Math.rnd(7.25)', 
      'round(7.25)', 
      'decimal(7.25)'
    ],
    answer: 'Math.round(7.25)',
  },
  //and so on questions as much as we want
];

