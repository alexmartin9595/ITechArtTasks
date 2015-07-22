var Filter = (function () {
    function makeFilter(array, callback) {
        if (Object.prototype.toString.call(array) === '[object Array]')
            throw TypeError(array + 'is not an array');

        var currentArray = new Array(array.length);
        for (var i = 0; i < array.length; i++) {
            currentArray[i] = callback(array[i], i, array);
        }
        return currentArray;
    }
})();