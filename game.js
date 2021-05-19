const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
   {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1,
   },
   {
      question:
         "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3,
   },
   {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4,
   },

   {
      question: "Who invented JavaScript?",
      choice1: "Douglas Crockford",
      choice2: "Sheryl Sandberg",
      choice3: "Brendan Eich",
      choice4: "Mark Zugaberg",
      answer: 3,
   },

   {
      question: "Which one of these is a JavaScript package manager?",
      choice1: "Node.js",
      choice2: "TypeScript",
      choice3: "npm",
      choice4: "yarn",
      answer: 3,
   },
   {
      question: "Which tool can you use to ensure code quality?",
      choice1: "Angular",
      choice2: "jQuery",
      choice3: "RequireJS",
      choice4: "ESLint",
      answer: 4,
   },
   {
      question:
         "The numbering system with a radix of 16 is more commonly referred to as?",
      choice1: "Hexidecimal",
      choice2: "Binary",
      choice3: "Duodecimal",
      choice4: "Octal",
      answer: 1,
   },
   {
      question: "In web design, what does CSS stand for?",
      choice1: "Counter Strike Source",
      choice2: "Corrective Style Sheet",
      choice3: "Computer Style Sheet",
      choice4: "Cascading Style Sheet",
      answer: 4,
   },
   {
      question: "What does GHz stand for?",
      choice1: "Gigahotz",
      choice2: "Gigahetz",
      choice3: "Gigahatz",
      choice4: "Gigahertz",
      answer: 4,
   },
   {
      question: "How many kilobytes in one gigabyte (in decimal)?",
      choice1: "1024",
      choice2: "1000",
      choice3: "1000000",
      choice4: "1048576",
      answer: 3,
   },
];

/*to fetch data from json file instead of hard coding the questions.  
Note that fetching local path doesn't work for security reasons, so you need
https URL scheme*/
//
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
   // game.classList.remove("hidden");
   // loader.classList.add("hidden");
};

getNewQuestion = () => {
   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      // go to the end page
      alert(`Congratulations! You finished the quiz`);
      return window.location.assign("/index.html");
   }
   questionCounter++;
   questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
   const questionIndex = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question;
   /* HTML question's innertext is set to currentquestion's question (key name) property */
   choices.forEach((choice) => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
      /* choice's inner text is set to currentquestion's choice# (key name) property */
   });
   availableQuestions.splice(questionIndex, 1);
   acceptingAnswers = true;
};
choices.forEach((choice) => {
   choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
      const classToApply =
         selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      selectedChoice.parentElement.classList.add(classToApply);
      classToApply == "correct" ? incrementScore(CORRECT_BONUS) : null;
      setTimeout(() => {
         selectedChoice.parentElement.classList.remove(classToApply);
         getNewQuestion();
      }, 1000);
   });
});
startGame();

incrementScore = (num) => {
   score += num;
   scoreText.innerText = score;
};
