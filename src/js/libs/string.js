if (typeof String.fromCodePoint !== 'function') String.fromCodePoint = function() {
    'use strict';
    var a = [];
    for (var b = arguments.length, c = Array(b), d = 0; d < b; d++) c[d] = arguments[d];
    for (var e = 0; e < c.length; e++) {
        var f = Number(c[e]);
        if (!isFinite(f) || Math.floor(f) != f || f < 0 || 1114111 < f) throw RangeError('Invalid code point ' + f);
        if (f < 65536) {
            a.push(String.fromCharCode(f));
        } else {
            f -= 65536;
            a.push(String.fromCharCode((f >> 10) + 55296), String.fromCharCode(f % 1024 + 56320));
        }
    }
    return a.join('');
};
if (!String.prototype.startsWith) String.prototype.startsWith = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this),
    c = arguments.length > 1 ? Number(arguments[1]) || 0: 0,
    d = Math.min(Math.max(c, 0), b.length);
    return b.indexOf(String(a), c) == d;
};
if (!String.prototype.endsWith) String.prototype.endsWith = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this),
    c = b.length,
    d = String(a),
    e = arguments.length > 1 ? Number(arguments[1]) || 0: c,
    f = Math.min(Math.max(e, 0), c),
    g = f - d.length;
    if (g < 0) return false;
    return b.lastIndexOf(d, g) == g;
};
if (!String.prototype.contains) String.prototype.contains = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this),
    c = arguments.length > 1 ? Number(arguments[1]) || 0: 0;
    return b.indexOf(String(a), c) != -1;
};
if (!String.prototype.repeat) String.prototype.repeat = function(a) {
    "use strict";
    if (this == null) throw TypeError();
    var b = String(this);
    a = Number(a) || 0;
    if (a < 0 || a === Infinity) throw RangeError();
    if (a === 1) return b;
    var c = '';
    while (a) {
        if (a & 1) c += b;
        if (a >>= 1) b += b;
    }
    return c;
};
if (!String.prototype.codePointAt) String.prototype.codePointAt = function(a) {
    'use strict';
    if (this == null) throw TypeError('Invalid context: ' + this);
    var b = String(this),
    c = b.length;
    a = Number(a) || 0;
    if (a < 0 || c <= a) return undefined;
    var d = b.charCodeAt(a);
    if (55296 <= d && d <= 56319 && c > a + 1) {
        var e = b.charCodeAt(a + 1);
        if (56320 <= e && e <= 57343) return (d - 55296) * 1024 + e - 56320 + 65536;
    }
    return d;
};
if (!String.prototype.trimLeft) String.prototype.trimLeft = function() {
    return this.replace(/^\s+/, '');
};
if (!String.prototype.trimRight) String.prototype.trimRight = function() {
    return this.replace(/\s+$/, '');
};
