// Polyfill
function at(n) {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0
  // Allow negative indexing from the end
  if (n < 0) n += this.length
  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= this.length) return undefined
  // Otherwise, this is just normal property access
  return this[n]
}

function at(n) {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0
  // Allow negative indexing from the end
  if (n < 0) n += this.length
  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= this.length) return undefined
  // Otherwise, this is just normal property access
  return this[n]
}

// Other TypedArray constructors omitted for brevity.
for (let C of [Array, String, Uint8Array]) {
  Object.defineProperty(C.prototype, 'at', { value: at, writable: true, enumerable: false, configurable: true })
}
console.log(Array.prototype.at, Array.prototype.map)
Array.prototype.at = at
String.prototype.at = at
const arr = [[0, 8, 9], 2, 3, 4, 5, 6, 7]
const str = '[1]1[]23456[0]'
function hi() {
  const i = 8 + 9
}
console.log(arr.at(-1), str.at(-1))
console.log(arr.at(-7))
console.log(arr.at(-8))
console.log(arr.at(0))
console.log(arr.at(1))
console.log(arr.at(7))
console.log(arr.at(6))
