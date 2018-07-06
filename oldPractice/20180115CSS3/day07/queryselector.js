/*
 * @Author: 
 * @Date: 
 * @Last Modified :
 * @Last Modified :
 */
HTMLDocument.prototype.$ = function (selector) {
    // Only for HTML
    return this.querySelector(selector);
};
$(`div`);
HTMLDocument.prototype.$$ = function (selector) {
    // Only for HTML
    return this.querySelectorAll(selector);
};
$$(`div`);
function $ (selector, el) {
    if (!el) {el = document;}
    return el.querySelector(selector);
}
function $$ (selector, el) {
    if (!el) {el = document;}
    return el.querySelectorAll(selector);
    // Note: the returned object is a NodeList.
    // If you'd like to convert it to a Array for convenience, use this instead:
    // return Array.prototype.slice.call(el.querySelectorAll(selector));
}
alert($('#myID').id);
