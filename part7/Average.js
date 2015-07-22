var Average = (function () {
    function countAverage(array) {
        var evenArray = Filter.makeFilter(array, callback),
            sum = LinearFold.makeFold(evenArray, sumCallback, 0);
        return sum / evenArray.length;                
    }

    function callback(value) {
        return value % 2 === 0;
    }

    function sumallback(prev, currentvalue) {
        return prev + currentvalue;
    }

    return {
        countAverage: countAverage
    }
})();