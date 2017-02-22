
# `fmt-obj` [![Build status][travis-image]][travis-url] [![NPM version][version-image]][version-url] [![Dependency Status][david-image]][david-url] [![License][license-image]][license-url] [![Js Standard Style][standard-image]][standard-url]

Prettifies any javascript object in your console. Make it look awesome! :lipstick:

**Screenshot**

<p align="center">
  <img src="./intro.png" />
</p>

<sub><a href='./example.js'>View Example</a></sub>

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

### `fmtObj(obj, depth = Infinity, formatter = defaultFormatter, offset = 2)`

Prettifies `obj` given a `formatter` map with optional `depth`.

#### `depth` (optional)

Objects deeper than `depth` will get collapsed and hide their sub properties.

#### `formatter` (optional)

`fmt-obj` uses [`chalk`](https://github.com/chalk/chalk) behind the scenes.
You can tweak the color mapping by the following tokens:

* **punctuation** - The characters sorrounding your data: `:` and `"`
* **literal** - Either `true`, `false`, `null` or `undefined`
* **annotation** - Type annotation for errors, functions and circular references like `[Function {name}]`
* **property**
* **string**
* **number**

Here is an example of using a custom color map:

```js
const format = require('fmt-obj')
const chalk = require('chalk')

const customFormat = (...args) => format(...args, {
  punctuation: chalk.cyan,
  annotation: chalk.red,
  property: chalk.yellow,
  literal: chalk.blue,
  number: chalk.green,
  string: chalk.bold
})

console.log(customFormat({ hello: 1.0 }))
```

##### Default color map

```js
{
  punctuation: chalk.yellow,
  annotation: chalk.gray,
  property: chalk.green,
  literal: chalk.magenta,
  number: chalk.cyan,
  string: chalk.bold
}
```

#### `offset` (optional)

The amount of whitespace after the object gets displayed.

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
