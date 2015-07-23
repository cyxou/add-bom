var fs = require('fs');
var isUtf8 = require('is-utf8');

module.exports = function (input) { 'use strict';
	if (!input) {
		console.error('Expected a filename');
		process.exit(1);
	}

	if (input) {
		fs.readFile(input, function (err, buf) {
			if (err) throw err;

			if (!Buffer.isBuffer(buf)) throw 'Got no buffer!';
			if (!isUtf8(buf)) throw 'File is not in UTF-8 encoding!';
			if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF)
				return console.log('File %s already has BOM markers!', input);

			fs.writeFile(input, '\ufeff' + buf, function (err) {
				if (err) throw err;
				else console.log('BOM was appended to %s', input);
			});
		});
	}
};
