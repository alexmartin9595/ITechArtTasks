var LinearFold = (function () {    
    function makeFold(array, callback, initialState) {     
        var prev = initialState;
        for (var i = 0; i < array.length; i++) {
            prev = callback(prev, array[i], i, array);
        }
        return prev;
    }      

    return {
        makeFold: makeFold
    }
})();