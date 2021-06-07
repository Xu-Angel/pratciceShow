
/* http://www.alloyteam.com/2020/02/14255/ */
function filterByTerm(inputArr, searchTerm) {
  /* 测试覆盖率  XX行/总行 */
  if (!searchTerm) throw Error("searchTerm cannot be empty");
  if (!inputArr.length) throw Error("inputArr cannot be empty"); // new line
  const regex = new RegExp(searchTerm, "i");
  return inputArr.filter(function(arrayElement) {
    return arrayElement.url.match(regex);
  });
}


module.exports = filterByTerm