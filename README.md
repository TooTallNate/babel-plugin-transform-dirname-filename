# babel-plugin-transform-dirname-filename

Babel plugin that rewrites `__dirname` and `__filename` to static values.

## Example

Source file `t.js`:

```javascript
console.log(__dirname);
console.log(__filename);
```

### Execute normally

```sh
$ node t.js
/path/to
/path/to/t.js
```

### Before

```sh
$ babel --out-file build/t.js t.js

$ node build/t.js
/path/to/build
/path/to/build/t.js
```

Notice how the `build` directory is part of the paths, which is _not_ what we
want.

### After

```sh
$ babel --out-file build/t.js --plugins transform-dirname-filename t.js

$ node build/t.js
/path/to
/path/to/t.js
```

So even though the generated file is a `build/t.js`, the `__dirname` and
`__filename` values will still reference the source file!


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
