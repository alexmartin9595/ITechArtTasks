var selector = function (param) {
    if (param > 10)
        return param;
}

var func = function (param) {
    if (param < 20)
        return param;
}
var array = [1, 9, 11, 12, 25, 6, 3, 52];
var last = LinqLibrary.asChain(array).where(selector).where(func).last();
alert(LinqLibrary.isNumber("sdfsdf"));
alert(LinqLibrary.isString("sdfsdf"));
alert(LinqLibrary.isFunction(selector));
alert(last);
