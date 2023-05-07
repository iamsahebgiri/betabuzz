const crypto = require('crypto');

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

module.exports = { generateFileName };
