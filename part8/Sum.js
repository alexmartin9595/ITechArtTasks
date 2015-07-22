var Sum = (function () {    
    function sumNumbers() {
        var array = new Array(10);
        for (var i = 0; i < 10; i++) {
            array[i] = Math.floor(Math.random() * 10) + 1;
        }
        return LinearFold.makeFold(array, sumCallback, 0);
    }

    function sumCallback(prev, currentvalue) {
        return prev + currentvalue;
    }
    
    return {
        sumNumbers: sumNumbers
    }
})();