const maxW = 600;
var isStackDisplayed = false;
var isTimerPaused = true;
var isMainDisplayed = true;

var stackElement = document.getElementById('stack');
stackElement.style.display = "none";
var timerMain = document.getElementById('timer_main');

var activityForm = new ActivityForm();
activityForm.hideForm();
activityForm.getEnterBttn().addEventListener('click',enterForm.bind(this));
activityForm.getDeleteBttn().addEventListener('click',deleteForm.bind(this));

var timerElement = new TimerElement();
timerElement.getStartButton().addEventListener('click',togglePause.bind(this));
timerElement.getCntrlButton().addEventListener('click',handleCntrlClick.bind(this));
timerElement.getDropButton().addEventListener('click',toggleStackView.bind(this));


enableForm();

function togglePause(){
    isTimerPaused = !isTimerPaused;
    timerElement.setStartButton(isTimerPaused);
}
function handleCntrlClick(){
    if(isTimerPaused)
        enableForm();
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
function enableForm(){
    isMainDisplayed = false;
    timerMain.style.display="none";
    activityForm.showForm();
}
function disableForm(){
    isMainDisplayed = true;
    timerMain.style.display="flex";
    activityForm.hideForm();
}
function enterForm(){


    disableForm();
}
function deleteForm(){

    disableForm();
}