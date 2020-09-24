const questionArray = [{
    id: 1,
    question: "Which of the following is not a fruit ?",
    options: ['Orange', 'Pawpaw', 'Mango'],
    answer: 'Dog',
  },
  {
    id: 2,
    question: "What is the function of a keyboard",
    options: ['eating', 'clicking', 'writing'],
    answer: 'input',
  },
  {
    id: 3,
    question: "What is the difference between 7 and 1",
    options: [1, 2, 3],
    answer: 6,
  },
  {
    id: 4,
    question: "Is Mathematics a subject ?",
    options: ['No'],
    answer: 'Yes',
  },
  {
    id: 5,
    question: "What is the date for christmas",
    options: ['Dec 10', 'May 5', 'June 2'],
    answer: 'Dec 25',
  },
];

//define an array to store answers
const answerArray = [];

//grab all html elements
const questBar = document.querySelector("#question-bar"); //question area
const btnNext = document.querySelector("#btn-next"); //next button
const btnPrev = document.querySelector("#btn-prev"); //previous button
const btnSubmit = document.querySelector("#btn-submit"); //submit button
const optionBar = document.querySelector("#options-bar"); //options area
const snBar = document.querySelector("#sn"); //options area

//create a starting index for our questions
let questionIndex = 0;
let currentQuestionIndex = 0

//print Question to the screen
printQuestion(questionIndex);

//Event Listerners
//next button
btnNext.addEventListener("click", function (e) {
  e.preventDefault();
  if (questionIndex < questionArray.length - 1) {
    questionIndex++;
  }

  if (currentQuestionIndex != questionIndex) {
    currentQuestionIndex = questionIndex
    snBar.textContent = questionIndex + 1
    printQuestion(questionIndex);
  }

});

//prev button
btnPrev.addEventListener("click", function (e) {
  e.preventDefault();
  if (questionIndex > 0) {
    questionIndex--;
  }

  if (currentQuestionIndex != questionIndex) {
    currentQuestionIndex = questionIndex
    snBar.textContent = questionIndex + 1
    printQuestion(questionIndex);
  }
});

//submit button
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  let confirm = window.confirm("Are you sure you want to submit ?");
  if (confirm) {
    //store the question and answers in the localstorage
    localStorage.setItem("answers", JSON.stringify(answerArray));
    localStorage.setItem("questions", JSON.stringify(questionArray));

    //submit the form
    document.forms[0].submit();
  }
});

//function
function printQuestion(index) {
  let questionObj = {
    ...questionArray[index]
  };

  //check if the object question object is empty
  if (Object.entries(questionObj).length >= 1) {
    //print the first question to the question bar
    questBar.textContent = questionObj.question;

    let options = [...questionObj.options, questionObj.answer];

    //shuffle the options array
    options.sort(function (a, b) {
      return 0.5 - Math.random();
    });

    //empty option bar
    optionBar.innerHTML = "";

    options.forEach(function (option) {
      createOptionBtn(option);
    });
  }
}

function createOptionBtn(value) {
  //create the elements
  let div = document.createElement("div");
  let input = document.createElement("input");

  //adding attributes to the elements
  div.classList.add("form-group");
  div.append(" " + value);
  input.type = "radio";
  input.name = "option";
  input.value = value;

  //add event listeners to the input element
  input.addEventListener("input", function () {
    let question = questionArray[questionIndex];
    let answer = {
      id: question.id,
      option: this.value,
      answer: question.answer,
      correct: this.value == question.answer ? true : false,
    };

    //check if question has been answered
    let prevAnswer = answerArray.filter(function (ans) {
      return ans.id == answer.id;
    });

    if (prevAnswer.length <= 0) {
      answerArray.push(answer);
    } else {
      prevAnswer[0].option = answer.option;
      prevAnswer[0].correct = answer.correct;
    }

    console.log(answerArray, answer);
  });

  //insert input element to the div element
  div.prepend(input);
  optionBar.appendChild(div);
}