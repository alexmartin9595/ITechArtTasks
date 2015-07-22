var selector = function (param) {
    if (param > 10)
        return param;
}

var func = function (param) {
    if (param < 20)
        return param;
}

var array = [1, 9, 11, 12, 25, 6, 3, 52];
var chain1 = LinqLibrary.asChain(array).where(selector);
var chain2 = chain1.where(func).toArray();
console.log(chain1.toArray());
console.log(chain2);
console.log(LinqLibrary.isNumber("sdfsdf"));
console.log(LinqLibrary.isString("sdfsdf"));
console.log(LinqLibrary.isFunction(selector));


