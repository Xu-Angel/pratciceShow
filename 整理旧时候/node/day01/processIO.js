/* //标准I/O
process.stdin.resume();//通知stream开始读取数据
process.stdin.setEncoding( 'utf8');//设置编码格式
process.stdin.on('data',(text)=>{
  process.stdout.write(`你好:${text}`);
  // console.log(`你好:${text}`);
}); */
