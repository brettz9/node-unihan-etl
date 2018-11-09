const fs = require('fs');
const unihanETL = require('../src/index.js');

const util = require('util');
const path = require('path');

const exists = util.promisify(fs.exists);
const unlink = util.promisify(fs.unlink);

(async () => {
await unihanETL({fields: ['kFrequency'], destination: 'unihan.json'});

const unihanFile = path.join(process.cwd(), 'unihan.json');

console.assert(await exists(unihanFile), 'File exists');

console.assert('unihan-etl 0.10.1' === (await unihanETL({version: true})).trim(), 'Version returned.');

unlink(unihanFile);

})();
