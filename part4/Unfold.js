var Unfold = (function () {        
    function makeUnfold(callback, initialValue) {       
        var currentArray = new Array(),
            currentState = initialValue;

        while (currentState !== 0) {
            currentArray.push(currentState);
            currentState = callback(currentState);                          
        }
        return currentArray;
    }

    return {
        makeUnfold: makeUnfold
    }    
})();