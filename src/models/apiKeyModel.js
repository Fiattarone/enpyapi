const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema(
	{
		apiKey: { type: String, unique: true },
	},
	{
		collection: 'apiKey',
	}
);

const ApiKeyModel = mongoose.model('ApiKeyModel', apiKeySchema);

module.exports = ApiKeyModel;
