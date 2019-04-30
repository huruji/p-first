import first from './index'

const p1 = new Promise(resolve => {
    resolve(12)
})

const p2 = new Promise(resolve => resolve('12'))

first([p1, p2])