
function generateCode(input) {
    return require('crypto').randomBytes(8).toString('hex');
}
module.exports = generateCode;
