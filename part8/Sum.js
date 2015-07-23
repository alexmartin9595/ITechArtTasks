var Sum = (function () {    
    function sumNumbers() {
        var array = new Array(10);
        array = Unfold.makeUnfold(unFoldCallback, 10)
        return LinearFold.makeFold(array, sumCallback, 0);
    }

    function unFoldCallback(currentValue) {
        var isWorking = true,            
            value = 0;
        if (currentValue <= 0)
            isWorking = false;
        else {
            value = Math.floor(Math.random() * 10) + 1;
            currentValue -= 1;
        }

        return {
            isWorking: isWorking,
            value: value,
            state: currentValue
        }
    }

    function sumCallback(prev, currentvalue) {
        return prev + currentvalue;
    }
    
    return {
        sumNumbers: sumNumbers
    }
})();