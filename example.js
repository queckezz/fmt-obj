
const format = require('./')

console.log(format({
  message: 'hello world',
  dev: true,
  list: [1, 2, 3],
  alwaysTrue: () => true,
  awesomeness: 9.99,
  body: {
    these: null,
    are: 'string',
    some: undefined,
    props: false
  }
}))
