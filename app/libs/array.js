/**
 * @desc Array.from(arrayLike[, mapFunc[, thisArg]]
 * @param arrayLike: An array-like or iterable object to convert to an array.
 * @param mapFunc: Optional. Map function to call on every element of the array.
 * @param thisArg: Optional. Value to use as this when executing mapFn.
 * @return array
 *
 * Array.from()可以从下面的对象创建数组:
 * 1. 类似数组的对象(具有length属性以及索引元素的对象)
 * 2. 可迭代对象(可以获取其元素的对象，比如Map, Set)
 *
 * 注意，部分主流浏览器已经支持， 还有一些浏览器不支持，比如IE, 因此需要扩展
 * 参考链接: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 */
if (!Array.from) Array.from = function(a) {
    console.log('From user custom extend Array.from');
    if (a == null) throw new TypeError('Object is null or undefined');
    var b = arguments[1],
    c = arguments[2],
    d = this,
    e = Object(a),
    f = typeof Symbol === 'function' ? typeof Symbol === 'function' ? Symbol.iterator: '@@iterator': '@@iterator',
    g = typeof b === 'function',
    h = typeof e[f] === 'function',
    i = 0,
    j,
    k;
    if (h) {
        j = typeof d === 'function' ? new d() : [];
        var l = e[f](),
        m;
        while (! (m = l.next()).done) {
            k = m.value;
            if (g) k = b.call(c, k, i);
            j[i] = k;
            i += 1;
        }
        j.length = i;
        return j;
    }
    var n = e.length;
    if (isNaN(n) || n < 0) n = 0;
    j = typeof d === 'function' ? new d(n) : new Array(n);
    while (i < n) {
        k = e[i];
        if (g) k = b.call(c, k, i);
        j[i] = k;
        i += 1;
    }
    j.length = i;
    return j;
};

/**
 * @desc Array.prototype.findIndex
 * @param callback: 对数组中的每个元素进行检查的函数，接收三个参数:
 *   1. element: 数组中当前被处理的元素
 *   2. index: 数组中当前被处理的元素的索引
 *   3. array: findIndex被调用的数组本身
 * @param thisArg: 可选项，当执行callback的时候使用的this对象
 * @return 如果数组中的元素满足提供的监测方法，返回该元素在数组中的索引; 否则返回-1.
 */
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
        console.log('From user custom extends Array.prototype.findIndex');
        if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}
/**
 * @desc Array.prototype.find
 * @param callback: 对数组中每个元素执行检查的函数，接收三个参数:
 *   1. element: 数组中当前处理的元素
 *   2. index: 数组中当前处理元素的索引
 *   3. array: find被调用的数组对象
 * @param thisArg: 可选项，执行callback的时候使用它作为this对象
 * @return 如果数组中的元素满足提供的检测函数，返回所在数组中的值;否则返回undefined.
 *
 * 当然该方法可以通过findIndex实现:
 *
 * Array.prototype.find = function(predicate) {
 *   var element = Array.prototype.findIndex.call(this, predicate, arguments[1]);
 *
 *   return element === -1 ? undefined : this[element];
 * }
 */
if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

/**
 * @desc 使用提供的静态值填充数组指定范围的元素
 * @param value: 要填充数组的静态值
 * @param start: 可选项，开始位置索引
 * @param end: 可选项，结束为止索引
 * @return 返回被填充后的数组
 */
if (!Array.prototype.fill) {
    Array.prototype.fill = function(value) {

        // Steps 1-2.
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        var O = Object(this);

        // Steps 3-5.
        var len = O.length >>> 0;

        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;

        // Step 8.
        var k = relativeStart < 0 ?
            Math.max(len + relativeStart, 0) :
            Math.min(relativeStart, len);

        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
            len : end >> 0;

        // Step 11.
        var final = relativeEnd < 0 ?
            Math.max(len + relativeEnd, 0) :
            Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
            O[k] = value;
            k++;
        }

        // Step 13.
        return O;
    };
}

/**
 * @desc Array.prototype.includes
 * @param searchElement: 要查找的元素
 * @param fromIndex: 可选项。查找元素时选择从数组的哪个位置开始。 负值表示从数组结尾处倒数开始。默认为0
 * @return boolean: 成功返回true, 失败返回false
 */
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                 (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                return true;
            }
            k++;
        }
        return false;
    };
}
