/* '6位以上，包含大小写字母，数字。 强度*/

function computePasswordStrength(password) {
  if (password.length == 0) return 0

  var strength = 0
  var length = password.length

  var uniqueChars = ''
  var complexity = new Array()
  for (i = 0; i < length; i++) {
    letter = password.charAt(i)
    var asc = letter.charCodeAt()
    if (asc >= 48 && asc <= 57) {
      complexity[2] = 2
    } else if (asc >= 65 && asc <= 90) {
      complexity[1] = 2
    } else if (asc >= 97 && asc <= 122) {
      complexity[0] = 1
    } else {
      complexity[3] = 3
    }
    if (uniqueChars.indexOf(letter) == -1) uniqueChars += letter
  }

  if (uniqueChars.length > 4) strength += uniqueChars.length - 4
  var sumComplexity = 0
  var complexitySize = 0
  for (i in complexity) {
    complexitySize += 1
    sumComplexity += complexity[i]
  }
  strength += sumComplexity + 2 * (complexitySize - 1)
  if (length < 6 && strength >= 10) strength = 9

  strength = strength > 29 ? 29 : strength
  strength = Math.floor(strength / 10)

  return strength
}

passwordStrengthList = ["<span style='color:red'>\u5f31</span>", "<span style='color:#000'>\u4e2d</span>", "<span style='color:green'>\u5f3a</span>"]

passwordStrengthList[computePasswordStrength(password)]
