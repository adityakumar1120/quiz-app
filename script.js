const welcomeBtn = document.querySelector('#welcome-btn')
const welcome = document.querySelector('.welcome')
const quiz = document.querySelector('.quiz')
const timerElem = document.querySelector('#timer')
const questionElem = document.querySelector('#question')
const next = document.querySelector('.next')
const options = document.querySelectorAll('.options')
const totalQues = document.querySelector('#quiz-total-ques')
const highscore = document.querySelector('#quiz-high-score')
const score = document.querySelector('#score')
const optionsCont = document.querySelectorAll('.options-cont-2')


const localStorageNumber = localStorage.getItem('score')
const parsedNum = parseInt(localStorage.getItem('score'))
score.innerText = localStorage.getItem('score')
let flag = 0

const questionArr = [
    'What is the correct syntax to output "Hello, World!" in JavaScript?',
    'Which of the following is NOT a JavaScript data type?',
    'How do you declare a JavaScript variable?',
    'What is the result of the following expression: typeof null?',
    'Which of the following is the correct way to write an arrow function in JavaScript?'
]

const optionsArr = [
    ["console.print('Hello, World!');",
      "console.log('Hello, World!');",
      "print('Hello, World!');",
      "alertBox('Hello, World!');"],
      ["String", "Boolean", "Character", "Undefined"],
      [
        "variable myVar;",
        "var myVar;",
        "v myVar;",
        "declare myVar;"
      ],
      ["null", "object", "undefined", "boolean"],
      [
        "function => myFunction() { return x + y; }",
        "let myFunction() => { return x + y; };",
        "const myFunction = () => { return x + y; };",
        "myFunction => () { return x + y; };"
      ],
]

const correctAnswers = [
    "console.log('Hello, World!');",
    "Character",
    "var myVar;",
    "object",
    "const myFunction = () => { return x + y; };"
  ];

let timer = 30
function timerfunc(){
    setInterval(() =>{
        if(timer > 0){
            timer--
        timerElem.innerHTML = timer
        if(timer <= 30){
            quiz.style.backgroundColor = 'rgba(204, 226, 194, 1)'
            timerElem.parentElement.style.backgroundColor = 'rgba(53, 189, 58, 1)'
        }
        if(timer <= 15){
            quiz.style.backgroundColor = 'rgba(228, 229, 199, 1)'
            timerElem.parentElement.style.backgroundColor = 'rgba(197, 177, 0, 0.43)'
        }
        if(timer <= 5){
            quiz.style.backgroundColor = 'rgba(219, 173, 173, 1)'
            timerElem.parentElement.style.backgroundColor = 'rgba(197, 12, 0, 0.43)'
        }
        
    }
    checkAnswer()
    },1000)
    
// changeColor()

}

totalQues.innerText = questionArr.length

welcomeBtn.addEventListener('click', ()=>{
    welcome.classList.add('hidden')
    quiz.classList.remove('hidden')
    timerfunc()
    questionElem.innerText = questionArr[flag]
    options[0].innerText = optionsArr[flag][0]
    options[1].innerText = optionsArr[flag][1]
    options[2].innerText = optionsArr[flag][2]
    options[3].innerText = optionsArr[flag][3]
    highscore.innerText = flag + 1
    flag++
   
})

// let flag = 0
let correctAnswerIndex = 0
next.addEventListener('click' , ()=>{
    if(flag < questionArr.length){
    questionElem.innerText = questionArr[flag]
    highscore.innerText = flag + 1
    
for(let i = 0; i<options.length; i++ ){
    options[i].innerText = optionsArr[flag][i]
    
}
    // options[0].innerText = optionsArr[flag][0]
    // options[1].innerText = optionsArr[flag][1]
    // options[2].innerText = optionsArr[flag][2]
    // options[3].innerText = optionsArr[flag][3]
    for(let i = 0; i<4; i++){
        options[i].parentElement.classList.remove('correct')
    options[i].parentElement.classList.remove('wrong')
    }
    
    flag++
    correctAnswerIndex++
    timer = 30
}
})

let correctAnswerScore = 0
function checkAnswer() {
    if (timer > 0) {
        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener('click', (e) => {
                // Check if any option already has the "wrong" or "correct" class
              let isAnswered = Array.from(options).some( function (option){
               return option.parentElement.classList.contains('wrong') ||
                option.parentElement.classList.contains('correct')
              })

                // Prevent further action if an answer has already been selected
                if (isAnswered) return;

                if (options[i].innerText != correctAnswers[correctAnswerIndex]) {
                    e.target.parentElement.classList.add('wrong');
                    console.log(e.target.innerText);
                } else {
                    e.target.parentElement.classList.add('correct');
                    correctAnswerScore++;
                    score.innerText = correctAnswerScore
                    localStorage.setItem("score",correctAnswerScore)
                    console.log(correctAnswerScore);
                }

               
            });
        }
    } else if (timer == 0) {
        next.click();
    }
}

// let optionIndex = 0 
// function insertOption (){
    
// }
// insertOption()
