/*  JSON 与 JS 对象的关系
        很多人搞不清楚 JSON 和 Js 对象的关系，甚至连谁是谁都不清楚。其实，可以这么理解：
        JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串。
        var obj = {a: 'Hello', b: 'World'}; //这是一个对象，注意键名也是可以使用引号包裹的
        var json = '{"a": "Hello", "b": "World"}'; //这是一个 JSON 字符串，本质是一个字符串
    JSON 和 JS 对象互转
        要实现从对象转换为 JSON 字符串，使用 JSON.stringify() 方法：
        var json = JSON.stringify({a: 'Hello', b: 'World'}); //结果是 '{"a": "Hello", "b": "World"}'
        要实现从 JSON 转换为对象，使用 JSON.parse() 方法：
        var obj = JSON.parse('{"a": "Hello", "b": "World"}'); //结果是 {a: 'Hello', b: 'World'}*/
