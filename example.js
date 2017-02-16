
const format = require('./')

console.log(format({
  message: 'hello world',
  dev: true,
  awesomeness: 9.99,
  body: {
    these: null,
    are: 'string',
    some: 12,
    props: false
  }
}))
