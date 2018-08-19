const url = require('url');
const querystring=require('querystring');
const baidu='http://xutianshi.top?a=1&b=2';
console.log(url.parse(baidu));
console.log(url.parse(baidu).query);
console.log(querystring.parse('a=1&b=2'));
console.log(querystring.stringify({a:2,b:3}));


/* 
querystring.stringify(obj[, sep[, eq[, options]]])#
新增于: v0.1.25
obj <Object> 要序列化成 URL 查询字符串的对象。
sep <string> 用于界定查询字符串中的键值对的子字符串。默认为 '&'。
eq <string> 用于界定查询字符串中的键与值的子字符串。默认为 '='。
options
encodeURIComponent <Function> 把对象中的字符转换成查询字符串时使用的函数。默认为 querystring.escape()。
该方法通过遍历给定的 obj 对象的自身属性，生成 URL 查询字符串。
*/
console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// 返回 'foo=bar&baz=qux&baz=quux&corge='
console.log(querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':'));
querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// 返回 'foo:bar;baz:qux'