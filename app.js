const maxW = 600;
var isStackDisplayed = false;
var isMainDisplayed = true;
var isTimerPaused = true;
var canDelete = true; 

var sfxTic = new Audio('Sounds/tick.wav');
var sfxRecharge = new Audio('Sounds/recharge.mp3');
sfxTic.volume = 0.7;
sfxRecharge.volume = 0.05;
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
var delayTimer = new Timer();
delayTimer.setTime(0,0,3); // 5 second refill
var delayOn = false;
var editingActivity = null;
var editingSlot = null;
var editingIndex = -1;

var currentActivity = null;
var slotList = [];
var actToSlot = {}

window.onload = window['preFill'];

var dkeys = [];
dkeys.push('stack');
dkeys.push('index');
dkeys.push('isPaused');
dkeys.push('msLeft');
function clearStorage(){
    dkeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    });
}
function preFill(){
    let data = localStorage.getItem('stack');
    if(data != null){
       let actSet =  data.split('}\n');
        for(let i = 0; i < actSet.length-1; i+=1){
            let actData = actSet[i].split('\n');
            let nameField = actData[0].split(' ');
            let name ="";
            for(let n=1; n < nameField.length;n++){
                name += nameField[n];
                if(n < (nameField.length-1) )
                    name+=" ";
            }
            if(name[length-1] == '\n') name[length-1] = "";
            let minutes = parseInt(actData[1].split(' ')[1]);
            let seconds = parseInt(actData[2].split(' ')[1]);
            actList.insert(new Activity(name,minutes,seconds));
        }
    }
    reEnterSlots();
    let index = sessionStorage.getItem('index');
    if(index != null){
        while(index+1){
            currentActivity = actList.getNext();
            index--;
        }
    }
    setcurrentActivity();
    let msLeft = sessionStorage.getItem('msLeft');
    if(msLeft != null) {
        timer.setMsLeft(parseInt(msLeft));
        timerElement.setFill(timer.getMsStart(),timer.getMsLeft());
        timerElement.setTime(timer.getSecondsLeft());
    }
    let pause  = sessionStorage.getItem('isPaused');
    if(pause == 'false') togglePause();
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
var prevSec=100;
async function updateTmer(){
    if(isTimerPaused){
        timer.stop();
        return;
    }
    timerElement.setFill(timer.getMsStart(),timer.getMsLeft());
    timerElement.setTime(timer.getSecondsLeft());
    if(timer.getSecondsLeft() < prevSec){
         prevSec = timer.getSecondsLeft();
         if(prevSec <= 5)
            sfxTic.play();
    }
    await new Promise(resolve => setTimeout(resolve, 5));
    if(timer.getSecondsLeft() > 0){
        updateTmer(); 
        sessionStorage.setItem('msLeft',timer.getMsLeft());
     } else{ 
        if(!delayOn && delayTimer.getSecondsLeft() > 0){
            prevSec = 100;
            timerElement.setTime(0);
            togglePause();
            delayOn = true;
            delayTimer.start();
            timerElement.setFill(100,.1);
            sfxRecharge.play();
            refillTimer();
        }
    }
}
async function refillTimer(){
    timerElement.setRefill(delayTimer.getMsStart(),delayTimer.getMsLeft());
    await new Promise(resolve => setTimeout(resolve, 5));
    if(delayTimer.getSecondsLeft() > 0) 
        refillTimer();
    else{
        delayOn = false;
        sessionStorage.setItem('msLeft',timer.getMsStart());
            if(autoplay.checked)
                togglePause();
        delayTimer.reset();
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
      ${activity.getName()}
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
    sessionStorage.setItem('index',actList.GetIndex());
}
function togglePause(){
    isTimerPaused = !isTimerPaused;
    sessionStorage.setItem('isPaused',isTimerPaused);
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
        if(activity != undefined && activity != null){
            actList.insert(activity);
            AddSlot(activity,actList.Count()-1);
        }
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
    localStorage.setItem('stack',actList.toString());
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
        currentActivity = actList.getNext();
        setcurrentActivity();
        localStorage.setItem('stack',actList.toString());
    }
    disableForm();
}