const crypto = require('crypto');

const generateApiKey = () => {
	// Generate a random 64-character API key
	const apiKey = crypto.randomBytes(32).toString('hex');
	return apiKey;
};

module.exports = generateApiKey;
