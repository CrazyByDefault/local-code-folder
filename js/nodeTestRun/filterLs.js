var path = require('path');
var fs = require('fs');
var mymod = require('./mymodule.js')

fs.readdir(process.argv[2], mymod);