const crypto = require('crypto');

const generateApiKey = () => {
	// Generate a random 32-character API key
	const apiKey = crypto.randomBytes(16).toString('hex');
	return apiKey;
};

module.exports = generateApiKey;
