const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "What does Au stand for in the periodic table?",
    answers: [
      { text: "Gold", correct: true },
      { text: "Oxygen", correct: false },
      { text: "Carbon", correct: false },
      { text: "Water", correct: false },
    ],
  },
  {
    question: "Who is the CEO of Twitter?",
    answers: [
      { text: "Zukerberg", correct: false },
      { text: "Jack Dorsey", correct: true },
      { text: "Obama", correct: false },
      { text: "Nawaz Shareef", correct: false },
    ],
  },
  {
    question: "What is the capital city of Iceland?",
    answers: [
      { text: "Islamabad", correct: false },
      { text: "Rekyavik", correct: true },
      { text: "Novida", correct: false },
      { text: "Ontario", correct: false },
    ],
  },

  {
    question: "What is seven cubed?",
    answers: [
      { text: "747", correct: false },
      { text: "343", correct: true },
      { text: "444", correct: false },
      { text: "232", correct: false },
    ],
  },

  {
    question: "Where did the most recent Winter Olympics take place?",
    answers: [
      { text: "London , UK", correct: false },
      { text: "Pyeongchang, South Korea", correct: true },
      { text: "Rio , Brazil", correct: false },
      { text: "Ontario , Canada", correct: false },
    ],
  },

  {
    question: "What is the largest big cat in the world?",
    answers: [
      { text: "Dog", correct: false },
      { text: "Tiger", correct: true },
      { text: "Lion", correct: false },
      { text: "Cheetah", correct: false },
    ],
  },
];
