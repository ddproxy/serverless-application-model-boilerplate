const fs = require('fs');
const entryMap = {};

fs.readdirSync('./src/lambda/')
  .filter(file => {
    return file.match(/.*\.js$/);
  })
  .forEach(f => {
    entryMap[f.replace(/\.js$/, '')] = ['./src/lambda/' + f];
  });

module.exports = {
  entry: entryMap,
  target: 'node',
  output: {
    path: `${process.cwd()}/dist`,
    filename: './[name]/index.js',
    libraryTarget: 'commonjs'
  },
  externals: {
    'aws-sdk': 'aws-sdk'
  }
};
