English | [中文](./README.md)

# p-first

make your Promise support getting first fulfilled Promise 

## How to use

```bash
npm i p-first -S
```

```js
import first from 'p-first'

first(yourPromises)
```

or you can extend you `Promise` constructor

```js
Promise.first = first
```

## real world use

You have two Ajax api to get same data, but you don't know which Ajax api will return first or which Ajax api will not work, you can use `p-first` to get the first

```js
const p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve (12)
    }, 5000)
})

const p2 = new Promise(resolve => {
    setTimeout (() => {
        resolve ('huruji')
    }, 1000)
})

const p3 = new Promise((resolve, reject) => {
    reject(404)
})

Promise.first([p1, p3, p2]).then(data => {
    console.log(data)
})

// output: huruji
```

## catch error

when none of the promises resolves, you can use `.catch` to catch error

```js
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject (12)
    }, 5000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout (() => {
        reject('huruji')
    }, 1000)
})

const p3 = new Promise((resolve, reject) => {
    reject(404)
})

Promise.first([p1, p3, p2]).then(data => {
    console.log(data)
}).catch((errs) => {
    console.log('have errors')
    console.log(errs)
})

// have errors
// [12, 404, 'huruji']
```