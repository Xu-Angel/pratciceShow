// 当第二个参数为空，就是没初始值的时候reduce函数会将数组的第一个元素当做第二个参数的初始值。
// const testArr = [1, 3, 4, 1, 3, 2, 9, 8, 5, 3, 2, 0, 12, 10]
// 统计
// const count = testArr.reduce((acc, cur) => {
//   cur in acc ? acc[cur] += 1 : acc[cur] = 1
//   return acc
// }, {})
// const set = testArr.reduce((acc, cur) =>  acc.includes(cur) ? acc : [...acc, cur], [])
// console.log(set);
// console.log(count);
//统计
// const bills = [
//   { type: 'shop', money: 223 },
//   { type: 'study', money: 341 },
//   { type: 'shop', money: 821 },
//   { type: 'transfer', money: 821 },
//   { type: 'study', money: 821 }
// ];

// const sortType = bills.reduce((acc, cur) => {
//   if (!(cur['type'] in acc)) {
//     acc[cur['type']] = []
//   }
//   acc[cur['type']].push(cur)
//   return acc
// }, {})
// console.log(sortType);
// const countByType = bills.reduce((acc, cur) => {
//   if (acc[cur['type']]) {
//     acc[cur['type']] += cur['money']
//   } else {
//     acc[cur['type']] = cur['money']
//   }
//   return acc
// }, {})
// console.log(countByType);

// const testArr = [
//   { age: 20 },
//   { age: 21 },
//   { age: 99 },
//   { age: 22 }
// ]

// const max = testArr.reduce((acc, cur) => {
//   if (!acc) acc = cur
//   if (acc.age < cur.age) {
//     return cur
//   }
//   return acc
// }, 0)

// console.log(max);
const arr = [
  {
    id: 1,
    type: 'A',
    total: 3,
  },
  {
    id: 2,
    type: 'B',
    total: 5,
  },
  {
    id: 3,
    type: 'E',
    total: 7,
  },
]

const total = arr.reduce((acc, { total }) => acc + total, 0)
console.log(total) // 15

const str = arr.reduce((str, { id, type }) => {
  return str + `id:${id},type:${type};`
}, '')
console.log(str)

const obj = arr.reduce((res, { id, type, total }) => {
  res[id] = {
    type,
    total,
  }
  return res
}, {})
console.log(obj)
