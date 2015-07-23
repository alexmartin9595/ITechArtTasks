var LinearFold = (function () {    
    function makeFold(array, callback, initialState) {
        var i = 0;
        if (typeof initialValue === "undefined") {
            prev = array[0];
            i = 1;
        }

        var prev = initialState;
        for (i; i < array.length; i++) {
            prev = callback(prev, array[i], i, array);
        }
        return prev;
    }      

    return {
        makeFold: makeFold
    }
})();