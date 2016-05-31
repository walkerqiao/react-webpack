if (JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]') JSON.stringify = function(a) {
    var b = /\u2028/g,
    c = /\u2029/g;
    return function d(e, f, g) {
        var h = a.call(this, e, f, g);
        if (h) {
            if ( - 1 < h.indexOf('\u2028')) h = h.replace(b, '\\u2028');
            if ( - 1 < h.indexOf('\u2029')) h = h.replace(c, '\\u2029');
        }
        return h;
    };
} (JSON.stringify);
