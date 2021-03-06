中文 | [English](./README_EN.md)

# p-first

让你的 Promise 支持获取第一个变为 fulfilled 状态的函数

> 不同于 `Promise.race` 不管是 fulfilled 或者是 rejected 状态都会返回

## How to use

```bash
npm i p-first -S
```

```js
import first from 'p-first'

first(yourPromises)
```

或者你可以拓展你的 `Promise` 构造函数

```js
Promise.first = first
```

## real world use

你有两个 Ajax api 获取相同的数据，但是你不知道哪个 Ajax api 会先返回，也无法预测哪个 Ajax api 会出问题, 你可以使用 `p-first` 来获取**第一个成功返回**的数据

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

当没有一个 Promise 变为了 fulfilled 状态，你可以在 `.catch` 中捕获 error

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