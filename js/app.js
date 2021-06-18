const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const choice_list = document.querySelector(".choice_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");


//Function ถ้ากดปุ่ม Start
function start() {
    info_box.classList.add("activeInfo");
}

//Function ถ้ากดปุ่มออก
function exit() {
    info_box.classList.remove("activeInfo");
}

//Function กดปุ่มดำเนินการต่อไป
function continue_quiz() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    showTotalQuiz(1);
    startTimer(timerValue);
    startTimerLine(550)
}

let question_count = 0;
let counter;
let counterLine;
let timerValue = 20;
let widthValue = 549;
let userScore = 0;

//Function Next Question Button when Click
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const exit_quiz = result_box.querySelector(".buttons .exit_btn");

function next_question() {

    if (question_count < questions.length - 1) {
        question_count++;
        showQuestion(question_count);
        showTotalQuiz(question_count + 1);
        clearInterval(counter);
        startTimer(timerValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none"
        timeOff.textContent = "残り時間："
    } else {
        question_count = 0;
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("All Complete ");
        console.log(userScore);
        showResultBox();
    }
}


//รับคำถามและตัวเลือก จาก Array 
function showQuestion(index) {
    const question_txt = document.querySelector(".question_text");

    let question_tag = '<span>' + questions[index].question_no + '. ' + questions[index].question + '</span>';
    let choice_tag = '<div class="choice"><span>' + questions[index].choice[0] + '</span></div>' +
        '<div class="choice"><span>' + questions[index].choice[1] + '</span></div>' +
        '<div class="choice"><span>' + questions[index].choice[2] + '</span></div>' +
        '<div class="choice"><span>' + questions[index].choice[3] + '</span></div>';
    question_txt.innerHTML = question_tag;
    choice_list.innerHTML = choice_tag;

    const choice = choice_list.querySelectorAll(".choice");
    for (let i = 0; i < choice.length; i++) {
        choice[i].setAttribute("onclick", "choiceSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function choiceSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;
    let allChoice = choice_list.children.length;
    // console.log(userAnswer);
    if (userAnswer == correctAnswer) {
        answer.classList.add("correct");
        console.log("Answer is Correct.");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        userScore += 1;
        console.log(userScore);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong.");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        //เฉลยคำตอบที่ถูกโดยอัตโนมัติ
        for (let i = 0; i < allChoice; i++) {
            if (choice_list.children[i].textContent == correctAnswer) {
                choice_list.children[i].setAttribute("class", "choice correct");
                choice_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    // console.log(correctAnswer);
    // Disable Choice when user Selected answer
    for (let i = 0; i < allChoice; i++) {
        choice_list.children[i].classList.add("disable");
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); //Hide the info Box
    quiz_box.classList.remove("activeQuiz"); //Hide Quiz Box
    result_box.classList.add("activeResult"); //Active Result Box
    const scoreText = result_box.querySelector(".score_total ");
    if (userScore < 3) {
        let scoreTag = '<span>เสียใจด้วย คุณได้คะแนนไปทั้งสิ้น : <p>' + userScore + '</p> จากทั้งหมด<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore < 8) {
        let scoreTag = '<span>คุณได้คะแนนไปทั้งสิ้น : <p>' + userScore + '</p> จากทั้งหมด<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>ยินดีด้วย!! คุณได้คะแนนไปทั้งสิ้น : <p>' + userScore + '</p> จากทั้งหมด<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    timeLine.style.background = "green";

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;

        }
        if (time < 0) {
            clearInterval(counter);
            clearInterval(counterLine);
            timeCount.textContent = "00";
            timeOff.textContent = "時間切れ :";

            let correctAnswer = questions[question_count].answer;
            let allChoice = choice_list.children.length;

            for (let i = 0; i < allChoice; i++) {
                if (choice_list.children[i].textContent == correctAnswer) {
                    choice_list.children[i].setAttribute("class", "choice correct");
                    choice_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allChoice; i++) {
                choice_list.children[i].classList.add("disable");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 38.5);

    function timer() {
        time -= 1;
        timeLine.style.width = time + "px";
        if (time < 70) {
            timeLine.style.background = "red";
        }
        if (time < 0) {
            clearInterval(counterLine);
            timeLine.style.background = "green";
        }
    }
}

function showTotalQuiz(index) {
    const btm_question_counter = quiz_box.querySelector(".total_answer");
    let btm_question_tag = '<span>คำถามที่ <p>' + index + '</p>จาก<p>' + questions.length + '</p></span>';
    return btm_question_counter.innerHTML = btm_question_tag;
}

function ExitQuit() {
    window.location.reload();
}

function restartQuiz() {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let question_count = 0;
    let timerValue = 20;
    let widthValue = 549;
    userScore = 0;
    showQuestion(question_count);
    showTotalQuiz(question_count + 1);
    clearInterval(counter);
    startTimer(timerValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
}
