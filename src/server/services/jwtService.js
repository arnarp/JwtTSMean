var crypto = require('crypto-js');
function encode(payload, secret) {
    var algorithm = 'HS256';
    var header = {
        typ: 'JWT',
        alg: algorithm
    };
    var jwt = base64encode(JSON.stringify(header)) + '.' +
        base64encode(JSON.stringify(payload));
    return jwt + '.' + sign(jwt, secret);
}
exports.encode = encode;
function decode(token, secret) {
    var segments = token.split('.');
    if (segments.length !== 3) {
        throw new Error('Token structure incorrect');
    }
    var header = JSON.parse(base64decode(segments[0]));
    var payload = JSON.parse(base64decode(segments[1]));
    if (verify(segments[0] + "." + segments[1], secret, segments[2])) {
        return payload;
    }
    else {
        throw new Error('Token verification failed');
    }
}
exports.decode = decode;
function sign(str, key) {
    return crypto.HmacSHA256(str, key).toString();
}
function base64encode(str) {
    var res = new Buffer(str).toString('base64');
    return res;
}
function base64decode(str) {
    return new Buffer(str, 'base64').toString();
}
function verify(rawSignature, secret, signature) {
    return signature === sign(rawSignature, secret);
}
//# sourceMappingURL=jwtService.js.map