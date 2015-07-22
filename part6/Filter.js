var Filter = (function () {
    function makeFilter(array, callback) {
        var currentArray = new Array();
        for (var i = 0; i < array.length; i++) {
            if (callback(array[i], i, array))
                currentArray.push(array[i]);
        }
        return currentArray;
    }
    return {
        makeFilter: makeFilter
    }
})();