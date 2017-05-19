
# `fmt-obj` [![Build status][travis-image]][travis-url] [![NPM version][version-image]][version-url] [![Dependency Status][david-image]][david-url] [![License][license-image]][license-url] [![Js Standard Style][standard-image]][standard-url]

:lipstick: Prettifies any javascript object in your console. Make it look awesome!

**Screenshot**

<p align="center">
  <img src="./intro.png" />
</p>

<sub><a href='./example.js'>View Example</a></sub>

> Also check out the [`CLI version`](https://github.com/Kikobeats/fmt-obj-cli) made by [@Kikobeats](https://github.com/Kikobeats)

## Features

- Circular reference support :sparkles:
- Allows for custom formatting
- Supports any arbitrary javascript token (functions, strings, numbers, arrays, you name it!)

## Installation

```sh
npm install --save fmt-obj
```

Or even better

```sh
yarn add fmt-obj
```

## Import and Usage Example

```js
const format = require('fmt-obj')

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
```

## API

### `format(obj, depth = Infinity)`

Prettifies `obj` with optional `depth`.

#### `obj`

Any arbitrary javascript object.

#### `depth` (optional)

Colapses all properties deeper than specified by `depth`.

### `createFormatter({ offset = 2, formatter = identityFormatter })`

Create a custom format function if you need more control of *how* you want to format the tokens.

#### `opts.formatter` (optional)

`fmt-obj` uses [`chalk`](https://github.com/chalk/chalk) for it's default format function. A formatter is mostly used for colors but can be used to manipulate anything.

**Example with rounding numbers**
```js
const format = createFormatter({ number: Math.round })
format({ num: 12.49 }) // -> num: 12
```

The following tokens are available:

* **punctuation** - The characters sorrounding your data: `:` and `"`
* **literal** - Either `true`, `false`, `null` or `undefined`
* **annotation** - Type annotation for errors, functions and circular references like `[Function {name}]`
* **property**
* **string**
* **number**

**Example with a custom color map**
```js
const { createFormatter } = require('fmt-obj')

const format = createFormatter({
  offset: 4,

  formatter: {
    punctuation: chalk.cyan,
    annotation: chalk.red,
    property: chalk.yellow,
    literal: chalk.blue,
    number: chalk.green,
    string: chalk.bold
  }
})
```

#### `opts.offset` (optional)

The amount of left whitespace between the property key and all of it's sub-properties.

## Similar packages

_(Because package discovery is hard)_

* [`pretty-format`](https://github.com/facebook/jest/tree/master/packages/pretty-format) by @thejameskyle for additional ES6 type support (WeakMap, WeakSet, Symbol etc.) and more consistent output.

## Author

**fmt-obj** © [Fabian Eichenberger](https://github.com/queckezz), Released under the [MIT](./license) License.<br>
Authored and maintained by Fabian Eichenberger with help from contributors ([list](https://github.com/queckezz/fmt-obj/contributors)).

> GitHub [@queckezz](https://github.com/queckezz) · Twitter [@queckezz](https://twitter.com/queckezz)

[travis-image]: https://img.shields.io/travis/queckezz/fmt-obj.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/fmt-obj

[version-image]: https://img.shields.io/npm/v/fmt-obj.svg?style=flat-square
[version-url]: https://npmjs.org/package/fmt-obj

[david-image]: http://img.shields.io/david/queckezz/fmt-obj.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/fmt-obj

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/fmt-obj.svg?style=flat-square
[license-url]: ./license
