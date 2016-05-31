(function() {
    /**
     * @desc Object.assign 从一个或多个源对象拷贝可枚举的私有属性到目标对象中。
     * @param target: 目标对象
     * @param sources: 源对象列表， 一个或多个源对象
     * @return 最终的target对象
     */
    if (Object.assign) return;
    var a = Object.prototype.hasOwnProperty,
    b;
    if (Object.keys && Object.keys.name !== 'object_keys_polyfill') {
        b = function(c, d) {
            var e = Object.keys(d);
            for (var f = 0; f < e.length; f++) c[e[f]] = d[e[f]];
        };
    } else b = function(c, d) {
        for (var e in d) if (a.call(d, e)) c[e] = d[e];
    };
    Object.assign = function(c, d) {
        if (c == null) throw new TypeError('Object.assign target cannot be null or undefined');
        var e = Object(c);
        for (var f = 1; f < arguments.length; f++) {
            var g = arguments[f];
            if (g != null) b(e, Object(g));
        }
        return e;
    };
})();

(function(){
    var a = Object.prototype.hasOwnProperty;

    /**
     * @desc Object.entries 返回给定对象自己的可枚举属性[key,value]对, 和for ... in循环中出现的顺序一致。
     * @param obj Object
     * @return properties key=>value list
     */
    if (typeof Object.entries !== 'function') Object.entries = function(b) {
        if (b == null) throw new TypeError('Object.entries called on non-object');
        var c = [];
        for (var d in b) if (a.call(b, d)) c.push([d, b[d]]);
        return c;
    };

    /**
     * @desc Object.values 返回给定对象自己的可枚举属性的值，顺序同上
     */
    if (typeof Object.values !== 'function') Object.values = function(b) {
        if (b == null) throw new TypeError('Object.values called on non-object');
        var c = [];
        for (var d in b) if (a.call(b, d)) c.push(b[d]);
        return c;
    };
})();
