const questionNumber = document.querySelector(".questions-number");
const questionText = document.querySelector(".questions-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizzBox = document.querySelector(".quizz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestions(){
   const totalQuestion = quizz.length;
   for(let i=0;i<totalQuestion;i++){
       availableQuestions.push(quizz[i]);
   }

}

function getNewQuestion(){
     questionNumber.innerHTML = "Question "+(questionCounter + 1) + " à "+quizz.length;

     const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
     currentQuestion = questionIndex;
     questionText.innerHTML = currentQuestion.q;
     
     const index1 = availableQuestions.indexOf(questionIndex);
     availableQuestions.splice(index1,1);

     const optionLen = currentQuestion.options.length;


     for(let i=0;i<optionLen;i++){
         availableOptions.push(i);
     }
     optionContainer.innerHTML = '';
     
     let animationDelay = 0.15;

     for (let i = 0; i<optionLen; i++) {
         const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
         const index2 = availableOptions.indexOf(optionIndex);
         availableOptions.splice(index2,1);
         
         const option = document.createElement("div");
         option.innerHTML = currentQuestion.options[optionIndex];
         option.id = optionIndex;

         option.style.animationDelay = animationDelay + 's';
         animationDelay += 0.15;
         option.className = "option";
         optionContainer.appendChild(option);
         option.setAttribute("onclick","getResult(this)");
         
     }
     
     questionCounter++;

}

function getResult(element){

const id = parseInt(element.id);

if(id === currentQuestion.answer){
   element.classList.add("correct");
   updateAnswerIndicator("correct");
   correctAnswers++;
}else{
    element.classList.add("wrong");
    updateAnswerIndicator("wrong");

    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen ; i++){
        if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
            optionContainer.children[i].classList.add("correct");
        }
    }
}
attempt++;
unclickableOption();
}


function unclickableOption(){
    const optionLen = optionContainer.children.length;

    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quizz.length;
    
    for(let i=0; i<totalQuestion ;i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}
function updateAnswerIndicator(markType){
   answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quizz.length){
          quizzOver();
    }else{
        getNewQuestion();
    }
}
function quizzOver(){
    quizzBox.classList.add("hide");

    resultBox.classList.remove("hide");
    quizzResult();
}

function quizzResult(){
    resultBox.querySelector(".total-question").innerHTML = quizz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;

    const percentage = (correctAnswers/quizz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / "+quizz.length;

}
function resetQuizz(){
   questionCounter = 0;
   correctAnswers = 0;
   attempt = 0;
}

function tryAgainQuizz(){
    resultBox.classList.add("hide");

    quizzBox.classList.remove("hide");
    resetQuizz();
    startQuizz();
}
function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuizz();
}
function startQuizz(){

    homeBox.classList.add("hide");

    quizzBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}

Window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quizz.length;
}