const http = require('http'),
  path = require('path'),
  fs = require('fs'),
  xtpl = require('xtpl'),
  querystring = require('querystring');
let data = require('./data.json');

const server = http.createServer();

server.on('request', (req, res) => {
  //路径名
  let basename = path.basename(req.url)
  if (basename.startsWith('index.html')) { //html文件请求
    xtpl.renderFile(path.join(__dirname, 'static', basename), {
      data
    }, (error, content) => {
      if (error) {
        console.log(reeor);
        return;
      }
      res.end(content);
    });


  } else if (basename.endsWith('.mp3')) { //请求的是mp3文件

    console.log(basename);
    basename = decodeURIComponent(basename); //解码
    console.log(basename);
    fs.readFile(path.join(__dirname, 'static', 'music', basename), (error, content) => {
      if (error) {
        console.log(error);
        return;
      }
      res.end(content);
    });
  } else if (basename.startsWith('del')) { //删除请求
    const params = basename.slice(4);
    const json = querystring.parse(params);
    console.log(json, params);
    let dataArr = []; //新数据
    for (let i = 0; i < data.length; i++) {
      if (data[i].id != json.id) {
        dataArr.push(data[i]);
      }
    }
    data = dataArr;
    res.end('del ok'); //返回结束 避免一直请求
  } else { //其他文件的请求
    fs.readFile(path.join(__dirname, 'static', 'js', basename), (error, content) => {
      if (error) {
        console.log(error);
        return;
      }
      res.end(content);
    });
  }

});
server.listen(8888);