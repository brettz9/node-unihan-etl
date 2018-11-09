const util = require('util');
const path = require('path');
const execFile = util.promisify(require('child_process').execFile);

async function build ({
  format = 'json',
  inputFiles,
  destination,
  fields,
  source,
  zipPath,
  logLevel,
  noExpand,
  noPrune,
  version
}) {
  let destinationPath;
  if (destination) {
    destinationPath = path.join(process.cwd(), destination);
  }
  const args = [
    ...(!version ? ['-F', format] : []),
    ...(destinationPath ? ['--destination', destinationPath] : []),
    ...(fields ? [
      '--fields',
      ...(Array.isArray(fields) ? fields : [fields])
    ] : []),
    ...(inputFiles ? [
      '--input-files',
      ...(Array.isArray(inputFiles) ? inputFiles : [inputFiles])
    ] : []),
    ...(source ? ['--source', source] : []),
    ...(zipPath ? ['--zip-path', zipPath] : []),
    ...(logLevel ? ['--log_level', logLevel] : []),
    noExpand ? '--no-expand' : '',
    noPrune ? '--no-prune' : '',
    version ? '--version' : ''
  ].filter((a) => a);

  // console.log('args: ', args);

  try {
    const {stdout, stderr} = await execFile('unihan-etl', args);
    return (stderr || stdout);
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
}

module.exports = build;
