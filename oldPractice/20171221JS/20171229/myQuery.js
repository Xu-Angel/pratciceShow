/*
 * @Author: 
 * @Date: 
 * @Last Modified :
 * @Last Modified :
 */
document.getElementsByClassName =
    document.getElementsByClassName ?
        document.getElementsByClassName : getByClassName;

/**
 * 根据id，类名或标签选择对应的dom对象
 * @param obj           需要查找的关键字
 * @returns {*}
 */
function $(obj) {
    // 获取第一个字符，如果是#使用的id选择器，如果是.使用类选择器，其它使用tagName
    var first = obj.substr(0, 1);
    var name = obj.slice(1); // 需要查找的名称
    if (first == '#') { // 使用id
        return document.getElementById(name);
    } else if (first == '.') { // 使用class
        return document.getElementsByClassName(name);
    } else { // tagName
        return document.getElementsByTagName(obj)
    }

}

/**
 * 根据类选择器查找标签
 * @param className           选择器的名称
 * @returns {Array}
 */
function getByClassName(className) {
    var result = [];
    // 获取所有标签元素
    var allElements = document.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        var el = allElements[i];
        // 判断标签是否有class属性
        if (el.className && hasClass(el, className)) {
            result.push(el);
        }
    }
    return result;
}

/**
 * 检查元素是否使用了指定的类选择器
 * @param el                标签元素
 * @param className         类选择器的名称
 */
function hasClass(el, className) {
    // 使用' '把className的内容分隔为数组形式
    var arr = el.className.split(' ');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == className) {
            return true;
        }
    }
    return false;
}

/**
 * 给标签添加新的类选择器
 * @param el               标签对象
 * @param className        类选择器的名称
 */
function addClass(el, className) {
    // 检查元素是否已经在使用需要添加的类名，如果没有使用才能添加
    if (!hasClass(el, className)) {
        el.className += ' ' + className;
        //el.className = className + ' ' + el.className;
        /*var arr = el.className.split(' ');
        arr.push(className)
        el.className = arr.join(' ');*/
    }
}

/**
 * 删除标签指定的类名
 * @param el                标签对象
 * @param className         需要删除的类名
 */
function removeClass(el, className) {
    var arr = el.className.split(' ');
    var pos = -1;               // 保存className出现在的位置
                                // el.className='a b c d' className=c
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == className) {
            pos = i;            // 记录className在标签class中的位置
            break;
        }
    }
    if (pos == -1) {                 // 查找不到类名
        return;                     // 表示不再执行后面的代码（函数执行完成）
    } else if (pos == 0) {              // 第1个
        arr.shift();
    } else if (pos == arr.length - 1) {  // 最后1个
        arr.pop();
    } else {
        var arr1 = arr.slice(0, pos);   // 从开始截取到需要删除元素之前
        var arr2 = arr.slice(pos + 1);    // 从需要删除元素之后开始截取
        arr = arr1.concat(arr2);        // arr1和arr2合拼为一个新的数组
    }

    el.className = arr.join(' ');
}

/**
 * 返回(0,1)之间的随机数
 * @returns {number}
 */
function random() {
    return Math.random();
}

/**
 * 返回[0, val)整数的随机数
 * @param val           返回的最大整数值
 * @returns {number}
 */
function next(val) {
    val = val == undefined ? 100 : val;
    return Math.floor(Math.random() * val);
}






