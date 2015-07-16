var LinqLibrary = (function () {
    var currentObject = {
        where: function (array, selector) {
            try {
                modifiedArray = array.map(selector);
            }
            catch (error) {
                throw new TypeError('Incorrect values');
            }
            return modifiedArray;
        },

        last: function (array) {
            try {
                var lastItem = array[array.length - 1];
            }
            catch (error) {
                throw new TypeError('Incorrect values');
            }
            return lastItem;
        }
    };

    this.asChain = function (array) {
        currentObject.currentArray = array;
        return this;
    }

    this.where = function (selector) {
        currentObject.currentArray = currentObject.where(currentObject.currentArray, selector).filter(function (value) {
            return value !== undefined && value !== null;
        });
        return this;
    }

    this.last = function () {
        return currentObject.last(currentObject.currentArray);
    }

    this.toArray = function () {
        return currentObject.currentArray;
    }

    this.isFunction = function (object) {
        var getType = {};
        return object && getType.toString.call(object) === '[object Function]';
    }

    this.isNumber = function (object) {
        return (typeof object === "number");
        
    }

    this.isString = function (object) {
        return (typeof object === "string")
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
