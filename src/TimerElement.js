class TimerElement{
    #view;
    #fillMax;//svg array segment length
    #fill; // svg to show progress 
    #clock;//shows time left
    #startButton; // shows if timer is paused or active
    #cntrlButton;
    #dropButton;
    constructor(){
        this.#view = document.getElementById("timer");
        this.#startButton = document.getElementById("timer_startB");
        this.#cntrlButton = document.getElementById("multi_bttn");
        this.#dropButton = document.getElementById('drop_boxB');
        this.#clock = this.#view.querySelector("#timer_clock");
        this.#initialize();
    }
    #initialize(){
        let owidth = Math.floor(window.innerWidth * .9);
        owidth = (owidth > maxW) ? maxW : owidth;
        let iwidth = owidth - 10;
        let outer = this.#view.querySelector("#timer_outer");
        this.#view.style.cssText=`width:${owidth}px; height:${owidth}px;`;
        outer.style.cssText = `width:${owidth}px; height:${owidth}px;`;
        let inner = this.#view.querySelector("#timer_inner");
        inner.style.cssText = `width:${iwidth}px; height:${iwidth}px;`;
        this.#startButton.style.cssText = `width:${iwidth / 4}px;height:${iwidth / 4}px`;
        this.#cntrlButton.style.cssText = `width:${iwidth / 10}px;height:${iwidth / 10}px`;
        this.#dropButton.style.cssText = `width:${iwidth / 10}px;height:${iwidth / 10}px`;
        this.#setPaused();
        this.#dropButton.style.backgroundImage = "url('Images/dropBox_closed.png')";
        this.#dropButton.style.backgroundSize = "cover";

        let w = (owidth - iwidth) / 2;
        owidth /= 2;
        iwidth /= 2;
        let r = (owidth + iwidth) / 2;
        this.#clock.style.fontSize = `${r / 2.5}px`;
        this.#fillMax = Math.floor(2 * Math.PI * r);
        // create svg circle 
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconSvg.setAttribute('width', `${owidth*2}`);
        iconSvg.setAttribute('height', `${owidth*2}`);
        const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        iconPath.setAttribute('cx', owidth);
        iconPath.setAttribute('cy', owidth);
        iconPath.setAttribute('r', r);
        iconPath.setAttribute('stroke-linecap', 'round');
        iconPath.setAttribute('stroke-width', `${w}px`);
        iconPath.setAttribute('stroke-dasharray', `${this.#fillMax}px`);
        iconSvg.appendChild(iconPath);

        this.#view.appendChild(iconSvg);
        this.#fill = iconPath;
        this.setActivityName("activity");
        this.setTime(3600);
        this.setFill(1000,900);
    }
    getStartButton(){return this.#startButton;}
    getCntrlButton(){return this.#cntrlButton;}
    getDropButton(){return this.#dropButton;}


    async setActivityName(act) {
        if(typeof act != 'string') return;
        var activity = this.#view.querySelector("#timer_activity");
        activity.innerHTML = act.toUpperCase();
        var f = 60;
        activity.style.fontSize = f + "px";
        var maxH = f;
        await 1; // to ensure html has time to update elements;
        var h = activity.getBoundingClientRect().height;
        var w = activity.getBoundingClientRect().width;
        let inner = this.#view.querySelector("#timer_inner").getBoundingClientRect().width;
        inner *= 7;
        while (h > maxH || w > inner) {
          f--;
          activity.style.fontSize = f + "px";
          h = activity.getBoundingClientRect().height;
          w= activity.getBoundingClientRect().width;
        }
    }
    setTime(seconds){
        if(typeof seconds != 'number') return;
        var minutes = Math.floor(seconds / 60);
        var seconds = parseInt(seconds % 60);
        minutes = (minutes < 10) ? `0${minutes}`:minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        this.#clock.innerHTML = `${minutes}:${seconds}`;
    }
    setFill(ms_start,ms_left){
        var diff = ms_start - ms_left;
        var f = Math.floor(this.#fillMax * (diff / ms_start));
        if (f < this.#fillMax)
        this.#fill.style.strokeDashoffset = `${f}px`;
    }
    setRefill(ms_start,ms_left){
        var f = Math.floor(this.#fillMax * (ms_left / ms_start));
        if (f >= 0)
        this.#fill.style.strokeDashoffset = `${f}px`;
    }
    setStartButton(bool){
        if(bool) this.#setPaused();
        else this.#setUnpaused();
    }
    setBoxButton(bool){
        if(bool){
            this.#dropButton.style.backgroundImage = "url('Images/dropBox_open.png')";
            this.#dropButton.style.backgroundSize = "cover";
        }else{
            this.#dropButton.style.backgroundImage = "url('Images/dropBox_closed.png')";
            this.#dropButton.style.backgroundSize = "cover";
        }
    }
    #setPaused(){
        this.#startButton.style.backgroundImage = "url('Images/start.png')";
        this.#startButton.style.backgroundSize = "cover";
        this.#cntrlButton.style.backgroundImage = "url('Images/add.png')";
        this.#cntrlButton.style.backgroundSize = "cover";
    }
    #setUnpaused(){
        this.#startButton.style.backgroundImage = "url('Images/pause.png')";
        this.#startButton.style.backgroundSize = "cover";
        this.#cntrlButton.style.backgroundImage = "url('Images/restart.png')";
        this.#cntrlButton.style.backgroundSize = "cover";
    }

}