const fs = require('fs')
fs.readdir('./server', (err, files) => {
  console.log(files); // files 是目录中的文件名的数组
  const filesNameArr = files
  // 筛选出公司-进行文件夹建立
  const fileName = files.filter(v => /^[^a-zA-Z]/.test(v))
  fileName.forEach(V => {
    fs.mkdirSync(`./server/${V.split('.')[0]}`) // 建立对应文件夹
    filesNameArr.forEach(v => { 
      // 复制该公司相关文件 filesNameArr
      if (new RegExp(V).test(v)) {
        fs.copyFileSync(`./server/${v}`, `./server/${V.split('.')[0]}/${v}`, (err) => { // 默认情况下将创建或覆盖目标文件。
          if (err) throw err;
          console.log('源文件已拷贝到目标文件');
        });
      }
      
    })
    
  })
})