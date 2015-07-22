#!/usr/bin/env node
'use strict';
var fs = require('fs');
var meow = require('meow');
var isUtf8 = require('is-utf8');

var cli = meow({
	help: [
		'Usage',
		'  $ add-bom <file>',
		'',
		'Example',
		'  $ add-bom unicorn.txt'
	]
});

var input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Expected a filename');
	process.exit(1);
}

if (input) {
	fs.readFile(input, function (err, data) {
		if (err) throw err;

		if (!Buffer.isBuffer(data)) throw 'Got no buffer!';
		if (!isUtf8(data)) throw 'File is not in UTF-8 encoding!';
		if (data[0] === 0xEF && data[1] === 0xBE && data[2] === 0xBB)
			return console.log('File %s already has BOM markers!', input);

		var bom = new Buffer([0xEF, 0xBE, 0xBB]);
		var bommed = Buffer.concat([bom, data], bom.length + data.length);

		fs.writeFile(input, bommed, function (err) {
			if (err) throw err;
			else console.log('BOM was appended to %s', input);
		});

	});
}
