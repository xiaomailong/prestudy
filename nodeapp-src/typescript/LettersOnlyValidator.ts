/*/// <reference path="Validation.ts" />
module Validation {
	var lettersRegexp = /^[A-Za-z]+$/;
	export class LettersOnlyValidator implements StringValidator {
		isAcceptable(s: string) {
			return lettersRegexp.test(s);
		}
	}
}*/

import validation = require('./Validation');
var lettersRegexp = /^[A-Za-z]+$/;
export class LettersOnlyValidator implements validation.StringValidator {
	isAcceptable(s: string) {
		return lettersRegexp.test(s);
	}
}
