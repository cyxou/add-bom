#!/usr/bin/env node

var addBom = require('../add-bom');
var program = require('commander');


  program
  .option('-f, --file <path>', 'Specify file name')
  .parse(process.argv);

if (!program.file) program.help();

addBom(program.file);
