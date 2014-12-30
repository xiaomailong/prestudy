/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

/*// Some samples to try
var strings = ['Hello', '98052', '101'];
// Validators to use
var validators: { [s: string]: Validation.StringValidator; } = {};
	validators['ZIP code'] = new Validation.ZipCodeValidator();
	validators['Letters only'] = new Validation.LettersOnlyValidator();
	// Show whether each string passed each validator
strings.forEach(s => {
	for (var name in validators) {
		console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
	}
});*/

import validation = require('./Validation');
import zip = require('./ZipCodeValidator');
import letters = require('./LettersOnlyValidator');

// Some samples to try
var strings = ['Hello', '98052', '101'];
// Validators to use
var validators: { [s: string]: validation.StringValidator; } = {};
	validators['ZIP code'] = new zip.ZipCodeValidator();
	validators['Letters only'] = new letters.LettersOnlyValidator();
	// Show whether each string passed each validator
	strings.forEach(s => {
		for (var name in validators) {
			console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
		}
		});
