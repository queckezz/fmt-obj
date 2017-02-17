
const _format = require('./')
const test = require('ava')

const identity = (x) => x

const identityFormatter = {
  punctuation: identity,
  property: identity,
  literal: identity,
  number: identity,
  string: identity
}

const format = (obj, depth, offset) =>
  _format(obj, depth, identityFormatter, offset)

test('literals', (t) => {
  t.true(format({ obj: true }).includes('true'))
  t.true(format({ obj: false }).includes('false'))
  t.true(format({ obj: null }).includes('null'))
  t.true(format({ obj: undefined }).includes('undefined'))
})