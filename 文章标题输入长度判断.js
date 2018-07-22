// 字符总长度
const numText = 50
// 字符长度
const num = 18
// 提醒题目剩余字数
$('#title').oninput = () => {
  // 判断文本高度
  if ($('#title').value.length > num) {
    $('.title-box').style.height = '1.20rem'
  } else if ($('#title').value.length < num) {
    $('.title-box').style.height = '0.8rem'
  }
  // 判断文本高度
  if ($('#title').value.length > 2 * num) {
    $('.title-box').style.height = '1.8rem'
  }
  $('.tips-text span')
  if ($('#title').value.length > numText) {
    $('.tips-text span').innerText = 0
  } else {
    $('.tips-text span').innerText = numText - $('#title').value.length
  }
}
