// const user = {
//   age: '1',
// }

// const proxy = new Proxy(user, {
//   get(target, property, receiver) {
//     console.log(`get${property}`)
//   },
//   set(target, property, value, receiver) {
//     console.log(`set${property}, ${value},`)
//   },
// })

// proxy.name = ''
// console.log(proxy.age)

// function median(...nums) {
//   return nums.sort()[Math.floor(nums.length / 2)]
// }

// const p = new Proxy(median, {
//   apply(target, thisArg, argumentList) {
//     for (const arg of argumentList) {
//       if (typeof arg !== 'number') {
//         throw 'arguments needs number'
//       }
//     }
//     return Reflect.apply(...arguments)
//   },
// })

// console.log(p(4, 7, 1))
// console.log(p(4, '7', 1))

class User {
  constructor(id) {
    this._id = id
  }
}
const pU = new Proxy(User, {
  construct(target, argumentList, newTarget) {
    if (argumentList[0] === undefined) {
      throw 'User cannot be instantiated without id'
    } else {
      return Reflect.construct(...arguments)
    }
  },
})

new pU()
new pU(1)
