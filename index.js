const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const continueBtn = document.getElementById('continueBtn');
const finishBtn = document.getElementById('finishBtn');
const textInput = document.getElementById('title');
const form = document.getElementById('form');
const createBtn = document.getElementById('create-btn')
const setTitle = document.getElementById('set-title')
const timeTaken = document.getElementById('time-taken')
const resetBtn = document.getElementById('reset')



//CREATE A NEW PROJECT TO BE TRACKED
createBtn.addEventListener('click', () =>{
    if(JSON.parse(localStorage.getItem('title')) !== null){
        textInput.value = "";
        alert('Please Reset the application first')
    } else {
        const value = textInput.value.trim();
        localStorage.setItem('title', JSON.stringify(value))
        textInput.value = "";
        createBtn.style.display='none';
    }   
})


//RESET CLOCK
function reset(){
     startTime =0;
     endTime =0;
     elapsedTime = 0;
     timerInterval;
}


//VARIABLES
let startTime =0;
let endTime =0;
let elapsedTime = JSON.parse(localStorage.getItem('time')) == null ? 0 : JSON.parse(localStorage.getItem('time'));
let timerInterval;
console.log(elapsedTime)

//UPDATE DOM TIME
const updateTimer = () =>{
    elapsedTime = Date.now() - startTime;
	let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
	let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60).toString().padStart(2, '0');
	let seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
	document.getElementById("timer").innerHTML = `${hours}:${minutes}:${seconds} `;
}



//START TIMER
const startTimer = () =>{
    startTime = Date.now() - elapsedTime
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
}

//PAUSE TIMER
const pauseTimer = () => {
    clearInterval(timerInterval);
	elapsedTime = Date.now() - startTime;
	document.getElementById("continueBtn").disabled = false;
}

//CONTINUE TIMER
const continueTimer = () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    continueBtn.disabled = true;
 }

//FINISH TIMER
function finishTimer(){
    clearInterval(timerInterval);
    endTime = Date.now();
    elapsedTime = endTime - startTime;
    startTime = 0;
    startBtn.disabled = false;
    continueBtn.disabled = true;
}


//UPDATE TIME TAKE IN THE UI
setTitle.innerText = `Time spent on ${ JSON.parse(localStorage.getItem('title')) == null ? " ____________ " :JSON.parse(localStorage.getItem('title'))}`
timeTaken.innerText = elapsedTime; 
let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60).toString().padStart(2, '0');
let seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
timeTaken.innerText = `${hours}:${minutes}:${seconds} `;


//EVENT LISTENERS
startBtn.addEventListener('click', () => {
    if(JSON.parse(localStorage.getItem('title')) == null || "" ){
        alert('Please set a title')
    } else{
        startTimer();
        localStorage.removeItem('time')
    }    
})

pauseBtn.addEventListener('click', () => {
   pauseTimer()
})

continueBtn.addEventListener('click', () => {
    continueTimer()
})

finishBtn.addEventListener('click', () => {
    finishTimer()
    localStorage.setItem('time', elapsedTime)    
    location.reload(true);
    createBtn.style.display='none';
    
})

resetBtn.addEventListener('click', () => {
    reset();
    location.reload(true);
    localStorage.removeItem('time')
    localStorage.removeItem('title')
})




