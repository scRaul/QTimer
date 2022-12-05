class TestActivityList{
    constructor(){}

    testInserting(){
        var notPassed = 0
        var list = new ActivityList();

        for(let i = 0; i < 100; i++){
            list.insert(new Activity());
        }
        notPassed += eqAssert(list.Count(),100,'inserting failed');
        // list.insert("hello");
        // notPassed += eqAssert(list.Count(),100,'inserting failed');

        for(let i = 0; i < 100; i++){
            list.getNext();
        }
        notPassed += eqAssert(list.Index(), 99, `Cycling ended at Index = ${list.Index()}`);

        var activity = list.getNext(); 
        notPassed += eqAssert(activity.getName(),'activity','failed to return activity');

        var msg = "ActivityListTest-Inserting: ";
        msg = (notPassed == 0) ? msg+"passed": msg+"failed";
        console.log(msg);
    }
    testReturn(){
        var notPassed = 0; 
        var list = new ActivityList();

        list.insert(new Activity());
        var activity = list.getNext(); 
        activity.update('change',activity.getMinutes(),activity.getSeconds());
        var test = list.getNext(); ; 
        notPassed += eqAssert(test.getName(),'change',`returned ${test.getName()}`);


        var msg = "ActivityListTest-Return: ";
        msg = (notPassed == 0) ? msg+"passed": msg+"failed";
        console.log(msg);
    }
    testRemoving(){
        var notPassed = 0
        var list = new ActivityList();

        for(let i = 0; i < 100; i++){
            list.insert(new Activity());
        }

        for(let i = 0; i < 50; i++){
            list.removeActivity(0);
        }
        notPassed += eqAssert(list.Count(),50,'list count does not match');

        var activity = list.front(); 
        list.removeActivity(0);
        activity.update('change',activity.getMinutes(),activity.getSeconds());
        var test = list.front(); 
        notPassed += eqAssert(test.getName(),'activity','failed to remove front');


        var msg = "ActivityListTest-Removing: ";
        msg = (notPassed == 0) ? msg+"passed": msg+"failed";
        console.log(msg);

    }

    testAll(){
        this.testInserting();
        this.testReturn();
        this.testRemoving();
    }







}