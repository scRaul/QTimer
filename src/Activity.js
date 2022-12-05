/*
Activiy class holds the data 
each required for each activity 
*/
class Activity{
    #name;
    #minutes;
    #seconds;
    constructor(name="new activity",minutes=0,seconds=0){
        this.#checkInput(name,minutes,seconds);
        this.#name = name;
        this.#minutes = minutes;
        this.#seconds = seconds;
    }
    getName(){return this.#name;}
    getMinutes(){return this.#minutes;}
    getSeconds(){return this.#seconds;}
    update(name,minutes,seconds){
        this.#checkInput(name,minutes,seconds);
        this.#name = name;
        this.#minutes = minutes;
        this.#seconds = seconds;
    }
    toString(){
        var builder = "name: " + this.#name + "\n";
        builder += "minutes: " + this.#minutes + "\n";
        builder += "seconds: " + this.#seconds;
        return builder;
    }
    #checkInput(name,minutes,seconds){
        if(typeof name != 'string')
            throw console.error('name must be a string');
        if(typeof minutes != 'number' || typeof seconds != 'number')
            throw console.error("minutes and seconds must be a number");
        if(minutes < 0 || seconds < 0){
            throw console.error('minutes and seconds must be a positive number');
        }
        if(!Number.isInteger(minutes)){
            console.log("minutes must be an Int. has been transformed");
            minutes = Math.floor(minutes);
        }
        if(!Number.isInteger(seconds)){
            console.log("seconds must be an Int. has been transformed");
            minutes = Math.floor(seconds);
        }
    }
}