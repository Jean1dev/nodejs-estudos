//https://www.npmjs.com/package/shelljs
const shell = require('shelljs');

module.exports = {
    name: 'mongo',
    run: async () => {
      shell.exec(`mongod --dbpath /Users/jeanfernandes/Documents/mongoDB/data/db`)
    }
  }
  