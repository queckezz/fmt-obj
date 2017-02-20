
const format = require('./')

console.log(format({
  message: 'hello world',
  dev: true,
  list: [
    "hello",
    "it's",
    { key: 'val', some: 'string' }
  ],
  alwaysTrue: () => true,
  awesomeness: 9.99,
  body: {
    these: null,
    are: 'string',
    some: undefined,
    props: false
  }
}))
