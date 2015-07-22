var Average = (function () {
    function countAverage(array) {
        if (Object.prototype.toString.call(array) === '[object Array]')
            throw TypeError(array + 'is not an array');

        var evenArray = Filter.makeFilter(array, callback);
        var sum = LinearFold.makeFold(evenArray, foldCallback, evenArray[0]);
        return sum / evenArray.length;        
    }

    function callback(value) {
        return value % 2 === 0;
    }

    function foldCallback() {

    }
})();