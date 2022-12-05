class ActivityForm{
    #form;
    #min;
    #sec;
    #act;
    #enterButton;
    #deleteButton;
    constructor(){
        this.#form = document.getElementById('activity_form');
        this.#min = document.getElementById("form_min");
        this.#sec = document.getElementById("form_sec");
        this.#act = document.getElementById("form_act");
        this.#enterButton = document.getElementById("form_enter");
        this.#deleteButton = document.getElementById("form_delete");


        this.hideForm();
        this.initialize();
    }
    initialize(){
        let owidth = Math.floor(window.innerWidth * .9);
        owidth = (owidth > maxW) ? maxW : owidth;
        let iwidth = owidth - 10;

        this.#enterButton.style.cssText = `width:${iwidth / 6}px;height:${iwidth / 6}px`;
        this.#deleteButton.style.cssText = `width:${iwidth / 6}px;height:${iwidth / 6}px`;

        this.#enterButton.style.backgroundImage = "url('Images/enter.png')";
        this.#enterButton.style.backgroundSize = "cover";
        this.#deleteButton.style.backgroundImage = "url('Images/delete.png')";
        this.#deleteButton.style.backgroundSize = "cover";

        let f = (owidth + iwidth) / (4 * 2.5);
        this.#min.style.fontSize = `${f}px`;
        this.#min.style.width = `${1.2*f}px`;
        this.#min.style.height= `${f}px`;
        document.getElementById("form_colon").style.fontSize = `${f}px`;
        this.#sec.style.fontSize = `${f}px`;
        this.#sec.style.width = `${1.2*f}px`;
        this.#sec.style.height= `${f}px`;
        this.#act.style.width = `${iwidth-30}px`;
        this.#act.style.fontSize = `${f/2}px`;
    }
    getEnterBttn(){return this.#enterButton;}
    getDeleteBttn(){return this.#deleteButton;}
    hideForm(){
        this.#form.style.display = "none";
    }
    showForm(){
        this.#form.style.display = "flex";
    }
}