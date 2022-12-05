class TestTimer{
    #timer;
    #startingTime;
    #expectedDiff;
    constructor(){this.#timer = new Timer();}
    testSettingTimer(){
        var notPassed = 0
        var t = 24;
        this.#timer.setTime(t);
        notPassed += eqAssert(this.#timer.getMsLeft(),t*3600*1000,'hours failed to convert to ms');
        this.#timer.setTime(0,t);
        notPassed += eqAssert(this.#timer.getMsLeft(),t*60*1000,'minutes failed to convert to ms');
        this.#timer.setTime(0,0,t);
        notPassed += eqAssert(this.#timer.getMsLeft(),t*1000,'seconds failed to convert to ms');
        var msg = "TimerTest-SettingTime: ";
        msg = (notPassed == 0) ? msg+"passed": msg+"failed";
        console.log(msg);
    }
    testGetSecByValue(){
        var notPassed = 0;
        this.#timer.setTime(1); 
        var seconds = this.#timer.getMsLeft(); 
        seconds = 5; 
        notPassed += eqAssert(this.#timer.getMsLeft(),3600*1000,'timer returning secondsLeft by refernces');
        var msg = "TimerTest-GetSecondsByValue: ";
        msg = (notPassed == 0) ? msg+"passed": msg+"failed";
        console.log(msg);
    }
    testTimePassed(){
        var t = 5;
        this.#timer.setTime(0,0,t); 
        this.#startingTime = Date.now();
        this.#expectedDiff =t*1000;
        this.#timer.start(); 
        this.#waitForResult();
    }
    async #waitForResult(){
        if(this.#timer.getSecondsLeft() <= 0 ){ return this.#timePassedResult(); }
        console.log(this.#timer.getSecondsLeft());
        await new Promise(resolve => setTimeout(resolve, 500));
        this.#waitForResult();
    }
    #timePassedResult(){
        var diff  = Date.now() - this.#startingTime; 
        //check if within a tenth of a second
        var notPassed = boundAssert(diff,this.#expectedDiff,100,`${diff} ms passed`);
        var msg = "TimerTest-timePassed: ";
        msg = (notPassed== 0) ? msg+"passed": msg+"failed";
        console.log(msg);
        return null;
    }
    testAll(){
        this.testSettingTimer(); 
        this.testGetSecByValue();
        this.testTimePassed();
    }
}