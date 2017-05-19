
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

const formatRef = (formatter, path) =>
  annotate(formatter, 'References', '~' + path.join('.'))

const formatCollapsedObject = (formatter) => tsml`
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

const createRefMap = () => {
  let map = new Map()

  return (path, val, replacer) => {
    if (!val || typeof (val) !== 'object') {
      return null
    }

    const ref = map.get(val)
    if (ref) return replacer(ref)
    map.set(val, path)
    return null
  }
}

const formatWithDepth = (
  obj,
  formatter,
  { lookupRef, path, depth, offset }
) => {
  const keys = Object.keys(obj)
  const coloredKeys = keys.map((key) => formatter.property(key))
  const colon = ': '

  const parts = keys.map((key, i) => {
    const nextPath = path.concat([key])
    const val = obj[key]

    const ref = lookupRef(
      nextPath,
      val,
      (npath) => formatRef(formatter, npath)
    )

    const out = tsml`
      ${lpadAlign(coloredKeys[i], coloredKeys, offset)}
      ${formatter.punctuation(colon)}
    `

    if (depth.curr > depth.max) {
      return out + formatCollapsedObject(formatter)
    }

    if (ref) {
      return out + ref
    }

    if (isIterableWithKeys(val)) {
      return out + formatWithDepth(val, formatter, {
        offset: offset + longest(keys).length + colon.length,
        depth: { curr: depth.curr + 1, max: depth.max },
        path: nextPath,
        lookupRef
      })
    } else {
      return out + formatValue(formatter, val)
    }
  })

  return '\n' + parts.join('\n')
}

const identityFormatter = [
  'punctuation',
  'annotation',
  'property',
  'literal',
  'number',
  'string'
].reduce(
  (acc, prop) => Object.assign({}, acc, { [prop]: (x) => x }),
  {}
)

const createFormatter = (opts = {}) => {
  const offset = opts.offset || 2
  const formatter = Object.assign({}, identityFormatter, opts.formatter)

  return (obj, depth = Infinity) => {
    return formatWithDepth(obj, formatter, {
      depth: { curr: 0, max: depth },
      lookupRef: createRefMap(),
      path: [],
      offset
    })
  }
}

const format = createFormatter({
  formatter: {
    punctuation: chalk.yellow,
    annotation: chalk.gray,
    property: chalk.green,
    literal: chalk.magenta,
    number: chalk.cyan,
    string: chalk.bold
  }
})

module.exports = format
module.exports.createFormatter = createFormatter
