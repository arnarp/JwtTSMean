import crypto = require('crypto-js');

export function encode(payload: any, secret: any): any {
	var algorithm = 'HS256';
	var header = {
		typ: 'JWT',
		alg: algorithm
	};
	var jwt = base64encode(JSON.stringify(header)) + '.' +
		base64encode(JSON.stringify(payload));
	return jwt + '.' + sign(jwt, secret);
}

export function decode(token: string, secret: string): any {
	var segments = token.split('.');
	if (segments.length !== 3) {
		throw new Error('Token structure incorrect');
	}
	var header = JSON.parse(base64decode(segments[0]));
	var payload = JSON.parse(base64decode(segments[1]));
	if (verify(
		`${segments[0]}.${segments[1]}`, secret, segments[2]
		)) {
		return payload;
	} else {
		throw new Error('Token verification failed');
	}
}

function sign(str: string, key: string) : string {
	return crypto.HmacSHA256(str, key).toString();
}

function base64encode(str: string) : string {
	var res = new Buffer(str).toString('base64');
	return res;
}

function base64decode(str: string): string {
	return new Buffer(str, 'base64').toString();
}

function verify(rawSignature: string, secret: string,
	signature: string): boolean {
	return signature === sign(rawSignature, secret);
}