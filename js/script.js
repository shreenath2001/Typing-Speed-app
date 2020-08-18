var TAKE_TEXT = document.querySelector(".given p");
const RECEIVED_TEXT = document.querySelector("#text-area");
const RECEIVER = document.querySelector(".receive");
const COUNTER = document.querySelector(".timer");
const RESET = document.querySelector(".reset");
const ANALYZE = document.querySelector(".analyzer");
const ANALYZE_SPEED = document.querySelector("#speed");
const ANALYZE_ERROR = document.querySelector("#errors");
const RESULT = document.querySelector("#result");

var correctTextList = ['India has been a secular federal republic since 1950 governed in a democratic parliamentary system.',
                        'In the early medieval era Christianity Islam Judaism and Zoroastrianism put down roots on Indias southern and western coasts.',
                        'It is the second most populous country the seventh largest country by land area and the most populous democracy in the world.',
                        'Because floor is a static method of Math you always use it as Math floor rather than as a method of a Math object you created Math is not a constructor.',
                        'India officially the Republic of India is a country in South Asia It is the second most populous country the seventh largest country by land area and the most populous democracy in the world.']

num = Math.floor(Math.random()*correctTextList.length);
TAKE_TEXT.innerHTML = correctTextList[num];
var CORRECT_TEXT = document.querySelector(".given p").innerHTML;

var timer = [0, 0, 0, 0];
var flag = 0;
var interval = null;
var numOfErrors = 0;

function leadingZero(time) {
    if (time <=9) {
        time = "0" + time;
    }
    return time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    COUNTER.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor(timer[3]/6000);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

function spellCheck() {
    textEntered = RECEIVED_TEXT.value;
    let correctTextMatch = CORRECT_TEXT.substring(0, textEntered.length);

    if(textEntered == CORRECT_TEXT) {
        RECEIVER.style.borderColor = "green";
        COUNTER.style.color = "green";
        ANALYZE.style.display = "block";
        clearInterval(interval);
    } else {
        if(textEntered == correctTextMatch) {
            RECEIVER.style.borderColor = "violet";
        } else {
            RECEIVER.style.borderColor = "red";
            numOfErrors++;
        }
    }
}

function start() {
    let textEnteredLength = RECEIVED_TEXT.value.length;
    if(textEnteredLength === 0 && flag == 0){
        flag = 1;
        interval = setInterval(runTimer, 10);
    }
}

function reset() {
    if(interval){
        clearInterval(interval);
        interval = null;
    }
    timer = [0, 0, 0, 0];
    flag = 0;

    RECEIVED_TEXT.value = "";
    COUNTER.innerHTML = "00:00:00";
    COUNTER.style.color = "black";
    RECEIVER.style.borderColor = "grey";
    numOfErrors = 0
    ANALYZE.style.display = "none";
    ANALYZE_SPEED.innerHTML = "";
    ANALYZE_ERROR.innerHTML = "";
    RESULT.style.display = "none";

    num = Math.floor(Math.random()*correctTextList.length);
    TAKE_TEXT.innerHTML = correctTextList[num];
    CORRECT_TEXT = document.querySelector(".given p").innerHTML;
}

function analyze() {
    var num_words = CORRECT_TEXT.split(" ").length;
    var time_taken = Number(COUNTER.innerHTML.slice(6, 8))/6000 + Number(COUNTER.innerHTML.slice(3, 5))/60 + Number(COUNTER.innerHTML.slice(0, 2))
    var wordsPerMinute = (num_words/time_taken);
    RESULT.style.display = "block";
    ANALYZE_SPEED.innerHTML = "Number of words per minute: " + Math.ceil(wordsPerMinute);
    ANALYZE_ERROR.innerHTML = "Number of Errors: " + numOfErrors;
}

RECEIVED_TEXT.addEventListener("keydown", start, false);
RECEIVED_TEXT.addEventListener("keyup", spellCheck, false);
RESET.addEventListener("click", reset, false);
ANALYZE.addEventListener("click", analyze, false);