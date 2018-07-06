var jd = {};
/**
 * 给对象添加过度
 * @param obj       需要添加过度的对象
 */
jd.addTransition = function(obj){
    obj.style.transition = 'all 0.5s';
    obj.style.webkitTransition = 'all 0.5s';
};
/**
 * 设置对象的变形行为
 * @param obj       需要变形的对象
 * @param dis       移动的距离
 */
jd.setTransform = function(obj, dis){
    obj.style.transform = 'translateX(' + dis + 'px)';
    obj.style.webkitTransform = 'translateX(' + dis + 'px)';
};
/**
 * 移除对象的过度行为
 * @param obj       需要移除过度的对象
 */
jd.removeTransition = function(obj){
    obj.style.transition = '';
    obj.style.webkitTransition = '';
};
/**
 * 当过度完成时，调用fn函数
 * @param obj       需要监听过度完成的对象
 * @param fn        调用的函数
 */
jd.addTransitionEnd = function(obj, fn){
    obj.addEventListener('transitionEnd', fn);
    obj.addEventListener('webkitTransitionEnd', fn);
};