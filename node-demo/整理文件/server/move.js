const fs = require('fs-extra')
const path = require('path')
const notifier = require('node-notifier')
const Dist = path.join(__dirname, '..', 'dist')
// 更改为自己的本地路径
const View = path.join(__dirname, '..', '../../project/src/www/view')
const App = path.join(__dirname, '..', '../../project/src/www/app')

const distArr = fs.readdirSync(Dist)
const htmlArr = distArr.filter(v => /html$/.test(v))
const dirArr = distArr.filter(v => !/html$/.test(v))

const task = async () => {
  notifier.notify({ message: '文件移动开始~', time: 100, title: '主人'})
  // 复制html到View文件夹
  for (const v of htmlArr) {
    console.log(`当前html：${v}`)
    fs.copySync(`${Dist}/${v}`, `${View}/${v}`, { overwrite: true })
  }

  // 删除app文件夹
  fs.removeSync(App)

  // 创建app文件夹
  fs.mkdirSync(App)

  // 复制dist文件夹下子文件夹文件到app文件夹
  for (const v of dirArr) {
    console.log(`当前文件夹：${v}`)
    fs.copySync(`${Dist}/${v}`, `${App}/${v}`, { overwrite: true })
  }

  notifier.notify('文件移动完成~')
}
task()
