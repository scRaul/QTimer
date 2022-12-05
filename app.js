
var isStackDisplayed = false;
var stackElement = document.getElementById('stack');
stackElement.style.display = "none";

var isTimerPaused = true;
var timerElement = new TimerElement();
timerElement.getStartButton().addEventListener('click',togglePause.bind(this));
timerElement.getCntrlButton().addEventListener('click',handleCntrlClick.bind(this));
timerElement.getDropButton().addEventListener('click',toggleStackView.bind(this));

function togglePause(){
    isTimerPaused = !isTimerPaused;
    timerElement.setStartButton(isTimerPaused);
}
function handleCntrlClick(){
    if(isTimerPaused)
        console.log("Add Activity");
    else
        console.log("RestartTimer");
}
function toggleStackView(){
    isStackDisplayed = !isStackDisplayed;
    if(isStackDisplayed)
        stackElement.style.display = "block";
    else
        stackElement.style.display = "none";
}