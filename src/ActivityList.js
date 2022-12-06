/*
ActiviyList class maintaince o;
*/
class ActivityList{
    #list;
    #currentIndex;
    constructor(){
        this.#list = [];
        this.#currentIndex = -1;
    }
    insert(activity){
        if(! (activity instanceof Activity))
            console.error( `"${activity}" not added, not an instance of Activiy`);
        else
            this.#list.push(activity);
    }
    Count(){return this.#list.length;}
    // returns the current Activity,
    GetCurrent(){
        if(this.#list.length == 0 ) return null;
        if(this.#currentIndex >= this.length)
            this.#currentIndex = 0;
        return this.#list[this.#currentIndex];}
    GetList(){return this.#list; }
    // returns the next Activity in the list, or null if list is empty
    getNext(){
        if(this.#list.length == 0) return null;
        this.#currentIndex++; 
        if(this.#currentIndex == this.#list.length) this.#currentIndex = 0;
        return this.#list[this.#currentIndex];
    }
    front(){
        if(this.#list.length) return this.#list[0];
    }
    removeActivity(index){
        if(typeof index !='number')  return;
        if(index < 0 || index > this.#list.length) return;
        this.#list.splice(index,1)  ;
    }
    toString(){
        var builder = "";
        this.#list.forEach(activity =>{
            builder += `{\n${activity.toString()}\n}\n`
        });
        return builder;
    }

}