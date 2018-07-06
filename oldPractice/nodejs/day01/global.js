console.log(__filename);
console.log(__dirname);
function sum (a,b) {
  return a+b;
}
function reduce (a,b) {
  return Math.abs(a-b);
}

module.exports = {
  sum,
  reduce
};