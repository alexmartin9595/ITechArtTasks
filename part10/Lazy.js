var Lazy = (function () {
    function makeLazy(func) {
        return PartialApplication.makePartial.apply(func, arguments);
    }

    return {
        makeLazy: makeLazy
    }
})();