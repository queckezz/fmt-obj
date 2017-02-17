
const lpadAlign = require('lpad-align')
const longest = require('longest')
const chalk = require('chalk')
const tsml = require('tsml')

const isPlainObj = (o) =>
  o !== null && typeof o === 'object' && o.constructor === Object

const isLiteral = (val) =>
  typeof val === 'boolean' || val === null || val === undefined

const formatFunction = (functionType, fn) =>
  `[${functionType} ${fn.displayName || fn.name || 'anonymous'}]`

const formatValue = (colors, val) => {
  if (typeof val === 'number') {
    return colors.number(val)
  }

  if (typeof val === 'function') {
    return formatFunction('Function', val)
  }

  if (isLiteral(val)) {
    return colors.literal(val)
  }

  if (isPlainObj(val)) {
    return tsml`
      ${colors.punctuation('(')}
      ${colors.string('collapsed')}
      ${colors.punctuation(')')}
    `
  }

  const stringified = Object.prototype.toString.call(val)

  if (stringified === '[object GeneratorFunction]') {
    return formatFunction('GeneratorFunction', val)
  }

  return tsml`
    ${colors.punctuation('"')}
    ${colors.string(val)}
    ${colors.punctuation('"')}
  `
}

const ifElse = (bool, then, or) => bool ? then() : or()

const formatWithDepth = (obj, depth, colors, offset) => {
  const keys = Object.keys(obj)
  const coloredKeys = keys.map((key) => colors.property(key))
  const colon = ': '

  const parts = keys.map((key, i) => {
    const val = obj[key]
    return tsml`
      ${lpadAlign(coloredKeys[i], coloredKeys, offset)}
      ${colors.punctuation(colon)}
      ${ifElse(
        depth.curr < depth.max && isPlainObj(val),
        () => format(
          val,
          { curr: depth.curr + 1, max: depth.max },
          colors,
          offset + longest(keys).length + colon.length
        ),
        () => formatValue(colors, val)
      )}
    `
  })

  return '\n' + parts.join('\n')
}

const format = (
  obj,
  depth = Infinity,
  colors = {
    punctuation: chalk.yellow,
    property: chalk.green,
    literal: chalk.magenta,
    number: chalk.cyan,
    string: chalk.bold
  },
  offset = 2
) => formatWithDepth(obj, { curr: 0, max: depth }, colors, offset)

module.exports = format
