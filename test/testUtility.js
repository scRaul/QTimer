

//returns 0 if passed 
//returns 1 if not passed 
function eqAssert(test,expected,msgIfFailed){
    console.assert(test == expected,msgIfFailed);
    if(test != expected ) return 1;
    return 0; 
}
function boundAssert(test,expected,bound,msgIfFailed){
    console.assert(Math.abs(test-expected) <= bound,msgIfFailed);
    if(Math.abs(test-expected) > bound ) return 1;
    return 0; 
}