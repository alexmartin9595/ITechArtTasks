var Unfold = (function () {        
    function makeUnfold(callback, initialValue) {       
        var currentArray = new Array(),            
            isWorking = true;                       

        while (isWorking) {
            currentState = callback(initialValue);
            isWorking = currentState.isWorking;
            if (!isWorking)
                break;
            initialValue = currentState.state;
            currentArray.push(currentState.value);                                      
        }
        return currentArray;
    }

    return {
        makeUnfold: makeUnfold
    }    
})();