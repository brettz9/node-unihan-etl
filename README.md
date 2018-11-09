# node-unihan-etl

This is a Node port of [unihan-etl](https://github.com/cihai/unihan-etl).

## Installation

1. Make sure you have the [latest 2.7 branch of Python](https://www.python.org/downloads/).
2. `npm install node-unihan-etl`
3. To install `unihan-etl`, execute one of the following:
    1. `npm run install-unihan-etl` -  - Install `unihan-etl` via `pip`
    1. `npm run install-unihan-etl-plus-yml` - Install `unihan-etl` and `pyyaml` via `pip` to support the `yml` export format
    1. `npm run install-unihan-etl-source` - Install from source (requireds recursive clone of `node-unihan-etl`)

## Example

```js
const unihanETL = require('./src/index.js');

(async () => {
await unihanETL({fields: ['kFrequency'], destination: 'unihan.json'});
})();
```

## API

### `<Promise -> stderr || stdout OR rejects> = unihanETL({[format=json], [fields], [destination], [fields], [inputFiles], [source], [zipPath], [logLevel], [noExpand], [noPrune], [version]})`

We have mostly kept the same API as unihan-etl, except defaulting to JSON
given the JavaScript environment. And `destination` also takes into account
the current working directory.

- `format ("json"|"csv"|"yml")`
- `destination (string)` - Supply a path relative to the current working
  directory
- `fields (Array|string)` - e.g., `kTotalStrokes`; see <https://unihan-etl.git-pull.com/en/latest/cli.html> for choices.
- `inputFiles (Array|string)` - All Unihan files used by default.
- `source (string)` - Defaults to <http://www.unicode.org/Public/UNIDATA/Unihan.zip>
- `zipPath (string)` - Defaults to `/home/docs/.cache/unihan_etl/downloads/Unihan.zip`
- `logLevel ("DEBUG"|"INFO"|"WARNING"|"ERROR"|"CRITICAL")`
- `noExpand (boolean)` - Whether to expand values to lists in multi-value UNIHAN fields (excepting CSV)
- `noPrune (boolean)` - Whether to prune fields with empty keys (excepting CSV).
- `version (boolean)` - Just prints version and exits
