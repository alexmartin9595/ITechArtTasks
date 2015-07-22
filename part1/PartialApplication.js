var PartialApplication = (function () {
    var makePartial = function (func) {
        var slice = Array.prototype.slice,
            args = slice.call(arguments, 1);

        return function () {
            return func.apply(this, args.concat(slice.call(arguments)));
        };
    };    

    return {
        makePartial: makePartial        
    };
})();