"use strict";

var _jsxWrapper = function _jsxWrapper(func, args) {
    var wrapper = args ? function wrapper() {
        return func.apply(this, args);
    } : func;
    wrapper.__jsxDOMWrapper = true;
    return wrapper;
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
    for (var prop in object) {
        if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
    }
};

var _renderArbitrary = function _renderArbitrary(child) {
    var type = typeof child;

    if (type === "number" || type === "string" || child && child instanceof String) {
        text(child);
    } else if (type === "function" && child.__jsxDOMWrapper) {
        child();
    } else if (Array.isArray(child)) {
        child.forEach(_renderArbitrary);
    } else if (String(child) === "[object Object]") {
        _forOwn(child, _renderArbitrary);
    }
};

var _jsxWrapper = function _jsxWrapper(func, args) {
    var wrapper = args ? function wrapper() {
        return func.apply(this, args);
    } : func;
    wrapper.__jsxDOMWrapper = true;
    return wrapper;
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
    for (var prop in object) {
        if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
    }
};

var _renderArbitrary = function _renderArbitrary(child) {
    var type = typeof child;

    if (type === "number" || type === "string" || child && child instanceof String) {
        text(child);
    } else if (type === "function" && child.__jsxDOMWrapper) {
        child();
    } else if (Array.isArray(child)) {
        child.forEach(_renderArbitrary);
    } else if (String(child) === "[object Object]") {
        _forOwn(child, _renderArbitrary);
    }
};

var IDOM = require("incremental-dom");
var elementOpenx = IDOM.elementOpen;

function render(data) {

    var header;
    if (data.conditional) {
        header = _jsxWrapper(function (_data$myClass) {
            elementOpen("div", null, null, "class", _data$myClass);
            text("it is truexxx");
            return elementClose("div");
        }, [data.myClass]);
    } else {
        header = _jsxWrapper(function (_data$myClass2) {
            elementOpen("div", null, null, "class", _data$myClass2);
            text("it is false");
            return elementClose("div");
        }, [data.myClass]);
    }

    elementOpen("div", null, ["id", "abcx"]);

    _renderArbitrary(header);

    return elementClose("div");
}
/*
function render(data) {
    var header = data.conditional ? <div /> : null;
    var collection = data.items.map((item) => {
        return <li key={item.id} class={item.className}>{item.name}</li>;
    });

    return <div id="container">
        {header}
        <ul>{collection}</ul>
        <p {...data.props}>Some features</p>
    </div>;
}
*/
module.exports.render = render;