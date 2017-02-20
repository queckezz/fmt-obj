
const format = require('./')

const a = { a: 1 }

let tree = {
  message: 'hello world',
  a,
  b: a,
  dev: true,
  list: [
    'hello',
    'it\'s',
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
}

tree.body.circular = tree.body

console.log(format(tree))
