class TestActivity{
    constructor(){}
    //test the construction of Activity objects
    testConstruction(){
        var notPassed = 0
        var emt ="name: activity\nminutes: 0\nseconds: 0";
        let a = new Activity();
        notPassed += eqAssert(a,emt,'empty construction failed');

        let b = new Activity('same');
        let c = new Activity('same');
        notPassed += eqAssert(b.toString(),c.toString(),'equal comparison failed');

        a = new Activity("run",10,45);
        notPassed += eqAssert(a.getName(),"run",'name construction failed');
        notPassed += eqAssert(a.getMinutes(),10,'minute construction failed');
        notPassed += eqAssert(a.getSeconds(),45,'seconds construction failed');

        var msg = "ActivityTest-Construction: ";
        msg = (notPassed == 0) ? msg+"passed": msg+"failed";
        console.log(msg);
    }
    //test the update method of Activity objects
    testUpdating(){
        var notPassed  = 0;

        let test = new Activity("run",1,30);

        notPassed += eqAssert(test.getName(),"run")

        test.update("walk",test.getMinutes(),test.getSeconds());
        notPassed += eqAssert(test.getName(),"walk",'updating name failed');

        test.update(test.getName(),2,test.getSeconds());
        notPassed += eqAssert(test.getMinutes(),2,'updating minutes failed');

        test.update(test.getName(),test.getSeconds(),5);
        notPassed += eqAssert(test.getSeconds(),5,'updating seconds failed');


        var msg = "ActivityTest-Updating: ";
        msg = (notPassed == 0) ? msg+"passed": msg+"failed";
        console.log(msg);
    }

    testAll(){
        this.testConstruction();
        this.testUpdating();
    }
}