var First = (function () {
    function findFirst(array, callback) {
        for (var i = 0; i < array.length; i++) {
            if (callback(array[i], i, array))
                return array[i];
        }
        return null;
    }

    return {
        findFirst: findFirst
    }
})();