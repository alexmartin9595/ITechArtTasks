var Currying = (function () {
    function makeCurrying(func, n) {
        function getCurriedMethod(prev) {
            if (n !== 'number')
                n = func.length;
            if (typeof func !== 'function')
                throw new TypeError(func + 'is not a function');
            return function (arg) {
                var args = prev.concat(arg);
                if (args.length < n)
                    return getCurriedMethod(args);
                else
                    return func.apply(this, args);
            };
        }
        return getCurriedMethod([]);
    }

    return {
        makeCurrying: makeCurrying
    }
    
})();