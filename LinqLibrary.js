var LinqLibrary = (function () {
    var currentArray = new Array();

    this.where = function (array, selector) {        
        return array.filter(selector);        
    }

    this.last = function (array) {        
        return currentArray[currentArray.length - 1];        
    }

    this.asChain = function (array) {
        return new ChainObject(array);
    }

    function ChainObject(array) {
        var currentArray = array;
        where = function (selector) {
            var modifiedArray = array.filter(selector);
            return new ChainObject(modifiedArray);
        }

        last = function () {
            var lastItem = currentArray[currentArray.length - 1];
            return lastItem;
        }

        toArray = function () {
            return currentArray;
        }
        
        return {
            where: where,
            last: last,
            toArray: toArray
        }
    }

    this.toArray = function () {
        return currentArray;
    }

    this.isFunction = function (object) {        
        return Object.prototype.toString.call(object) === '[object Function]';
    }

    this.isNumber = function (object) {
        return (typeof object === "number");        
    }

    this.isString = function (object) {
        return (typeof object === "string");
    }

    return {
        asChain: asChain,
        where: where,
        last: last,
        toArray: toArray,
        isFunction: isFunction,
        isNumber: isNumber,
        isString: isString
    }
})();
