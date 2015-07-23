var selector = function (param) {
    if (param > 10)
        return param;
}

var func = function (param) {
    if (param < 20)
        return param;
}

function method(x, y, z) {
    return x + y + z;
}

var result = PartialApplication.makePartial(method, 4, 5);
console.log(result(6));

var result = Currying.makeCurrying(method);
console.log(result(2)(3)(4));

function sumCallback(prev, currentvalue) {
    return prev + currentvalue;
}

var result = LinearFold.makeFold([2, 3, 4], sumCallback, 0);
console.log(result);

function unFoldCallback(currentValue) {
    var isWorking = true,
        value = 0;
    if (currentValue <= 0)
        isWorking = false;
    else {
        value = Math.tan(currentValue);
        currentValue -= 1;
    }

    return {
        isWorking: isWorking,
        value: value,
        state: currentValue
    }
}

var result = Unfold.makeUnfold(unFoldCallback, 10);
console.log(result);

function mapCallback(param) {
    return Math.tan(param);
}

var result = Map.makeMap([1, 2, 3, 44, 55], mapCallback);
console.log(result);

function filterCallback(param) {
    return param % 2 === 1;
}

var result = Filter.makeFilter([1, 2, 3, 4], filterCallback);
console.log(result);

var result = Average.countAverage([1, 2, 3, 4, 5, 6]);
console.log(result);

var result = Sum.sumNumbers();
console.log(result);

var result = First.findFirst([2, 8, 6, 7], filterCallback);
console.log(result);

var lazy = Lazy.makeLazy(method, 1, 2, 3);
console.log(lazy());