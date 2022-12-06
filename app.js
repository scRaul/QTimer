const maxW = 600;
var isStackDisplayed = false;
var isMainDisplayed = true;
var isTimerPaused = true;
var canDelete = true; 

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
var autoplay = document.getElementById('autoplay');

var actList = new ActivityList();
var timer = new Timer(); 

var editingActivity = null;
var editingSlot = null;
var editingIndex = -1;

var currentActivity = null;
var slotList = [];
var actToSlot = {}

window.onload = window['preFill'];

function preFill(){
    actList.insert(new Activity('Pomo',3,0));
    actList.insert(new Activity('Short Break',1,0));
    reEnterSlots()
    setcurrentActivity();
}
function reEnterSlots(){
    actToSlot = {};
    for(let i = 0; i < slotList.length; i++)
        slotList[i].remove();
    slotList = [];
    var copy = [];
    copy = actList.GetList();
    let j = 0;
    copy.forEach(act =>{
        AddSlot(act,j);
        j++;
    });
}
async function updateTmer(){
    if(isTimerPaused){
        timer.stop();
        return;
    }
    timerElement.setFill(timer.getMsStart(),timer.getMsLeft());
    timerElement.setTime(timer.getSecondsLeft());
    await new Promise(resolve => setTimeout(resolve, 5));
    if(timer.getSecondsLeft() > 0)
        updateTmer(); 
    else{ 
        if(autoplay.checked)
            togglePause();
        togglePause();
    }
}

function AddSlot(activity,index){
    if(! (activity instanceof Activity)){
        console.error( `"${activity}" not added, not an instance of Activiy`);
        return;
    }
    var minutes = activity.getMinutes();
    var seconds = activity.getSeconds();
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    var slot = document.createElement("div");
    slot.className = "timeSlot";
    slot.innerHTML = `
    <div class="slotTitle">
      ${activity.getName().toUpperCase()}
    </div>
    <div class="slotTime">|${minutes}:${seconds}</div>
    `;
    slot.addEventListener("click",editSlot.bind(this, { slot: slot, activity: activity, index:index}));
    stackElement.appendChild(slot);
    actToSlot[activity] = slot;
    slotList.push(slot);
}

function editSlot(e){
    activityForm.preFillForm(e.activity);
    enableForm();
    editingActivity = e.activity;
    editingSlot = e.slot;
    editingIndex = e.index;
}
function setcurrentActivity(){
    if(currentActivity == null && actList.Count() == 0){
        timer.setTime(0,0,0);
        timerElement.setActivityName("Activity");
        timerElement.setTime(0);
        timerElement.setFill(1,1);//set to full 
        return;
    }
    if(currentActivity == null) currentActivity = actList.getNext();
    timer.setTime(0,currentActivity.getMinutes(),currentActivity.getSeconds());
    timerElement.setActivityName(currentActivity.getName());
    timerElement.setTime(timer.getSecondsLeft());
    timerElement.setFill(1,1);//set to full 
    actToSlot[currentActivity].className = "timeSlot currentTimeSlot";
}
function togglePause(){
    isTimerPaused = !isTimerPaused;
    timerElement.setStartButton(isTimerPaused);
    if(isTimerPaused) return;
    if(timer.getSecondsLeft() == 0){
        if(currentActivity != null){
            actToSlot[currentActivity].className = "timeSlot";
        }
        currentActivity = actList.getNext(); 
        setcurrentActivity();
    }
    timer.start();
    updateTmer();
}
//RESTART AND ADD FUNCTIONALITY

function handleCntrlClick(){
    if(isTimerPaused)
        enableForm();
    else{//restart current activity
        togglePause();
        timer.reset();
        setcurrentActivity();
    }

}
function toggleStackView(){
    isStackDisplayed = !isStackDisplayed;
    timerElement.setBoxButton(isStackDisplayed);
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
    editingActivity = null;
    editingSlot = null;
    editingIndex = null;
    canDelete = true;
}
function enterForm(){   
    if(editingActivity == null){
        var activity = activityForm.getActivity();
        actList.insert(activity);
        AddSlot(activity,actList.Count()-1);
    }else{
        actToSlot[editingActivity] = null;
        activityForm.update(editingActivity,editingSlot);
        actToSlot[editingActivity] = editSlot;
        if(!isTimerPaused)
            togglePause();
    }
    if(currentActivity == null){
        currentActivity = actList.getNext();
    }
    setcurrentActivity();
    disableForm();
    console.log("After Added: \n" + actList.toString());
}
function deleteForm(){
    if(!canDelete) return;
    if(editingActivity != null){
        canDelete = false;
        actList.removeActivity(editingIndex);
        editingSlot.remove();
        reEnterSlots();
        if(!isTimerPaused)
            togglePause();
        if(editingActivity == currentActivity)
            currentActivity= actList.GetCurrent();
        else
            currentActivity = actList.getNext();
        setcurrentActivity();
    }
    disableForm();
}