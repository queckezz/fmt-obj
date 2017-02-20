
const lpadAlign = require('lpad-align')
const longest = require('longest')
const chalk = require('chalk')
const tsml = require('tsml')

const isPlainObj = (o) =>
  o !== null && typeof o === 'object' && o.constructor === Object

const isLiteral = (val) =>
  typeof val === 'boolean' || val === null || val === undefined

const annotate = (formatter, keyword, val) => tsml`
  ${formatter.annotation(`[${keyword} `)}
  ${formatter.string(val)}
  ${formatter.annotation(']')}
`

const formatFunction = (formatter, functionType, fn) =>
  annotate(formatter, functionType, fn.displayName || fn.name || 'anonymous')

const formatCollapsedObject = (formatter, val) => tsml`
  ${formatter.punctuation('(')}
  ${formatter.string('collapsed')}
  ${formatter.punctuation(')')}
`

const formatValue = (formatter, val) => {
  if (typeof val === 'number') {
    return formatter.number(val)
  }

  if (isLiteral(val)) {
    return formatter.literal(String(val))
  }

  const stringified = Object.prototype.toString.call(val)

  if (stringified === '[object Function]') {
    return formatFunction(formatter, 'Function', val)
  }

  if (stringified === '[object GeneratorFunction]') {
    return formatFunction(formatter, 'GeneratorFunction', val)
  }

  return tsml`
    ${formatter.punctuation('"')}
    ${formatter.string(val)}
    ${formatter.punctuation('"')}
  `
}

const isIterableWithKeys = (val) => isPlainObj(val) || Array.isArray(val)

const formatWithDepth = (obj, depth, formatter, offset) => {
  const keys = Object.keys(obj)
  const coloredKeys = keys.map((key) => formatter.property(key))
  const colon = ': '

  const parts = keys.map((key, i) => {
    const val = obj[key]

    let out = tsml`
      ${lpadAlign(coloredKeys[i], coloredKeys, offset)}
      ${formatter.punctuation(colon)}
    `

    if (depth.curr > depth.max) {
      return out + formatCollapsedObject(formatter, val)
    }

    if (isIterableWithKeys(val)) {
      out += formatWithDepth(
        val,
        { curr: depth.curr + 1, max: depth.max },
        formatter,
        offset + longest(keys).length + colon.length
      )
    } else {
      out += formatValue(formatter, val)
    }

    return out
  })

  return '\n' + parts.join('\n')
}

const defaultFormatter = {
  punctuation: chalk.yellow,
  annotation: chalk.gray,
  property: chalk.green,
  literal: chalk.magenta,
  number: chalk.cyan,
  string: chalk.bold
}

const format = (
  obj,
  depth = Infinity,
  formatter = defaultFormatter,
  offset = 2
) => formatWithDepth(obj, { curr: 0, max: depth }, formatter, offset)

module.exports = format
