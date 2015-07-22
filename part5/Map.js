var Map = (function () {    
    function makeMap(array, callback) {        
        var currentArray = new Array(array.length);
        for (var i = 0; i < array.length; i++) {            
            currentArray[i] = callback(array[i], i, array);
        }
        return currentArray;
    }

    return {
        makeMap: makeMap
    }
})();