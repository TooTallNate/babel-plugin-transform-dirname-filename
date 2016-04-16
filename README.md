# babel-plugin-transform-dirname-filename

Babel plugin that rewrites `__dirname` and `__filename` to static values.

## Example

### In

```js
console.log(__dirname);
console.log(__filename);
```

### Compile with `babel-cli`

```bash
$ babel --out-file build/out.js --plugins transform-dirname-filename in.js
```

### Out

```js
__dirname = "/path/to";
__filename = "/path/to/in.js";
console.log(__dirname);
console.log(__filename);
```

So even though the generated file is a `build/out.js`, the `__dirname` and
`__filename` values will still reference the source file.

## Installation

```sh
$ npm install babel-plugin-transform-dirname-filename
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-dirname-filename"]
}
```

### Via CLI

```sh
$ babel --plugins transform-dirname-filename script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-dirname-filename"]
});
```
