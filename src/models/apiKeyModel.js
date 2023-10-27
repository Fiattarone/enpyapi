const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema(
	{
		apiKey: { type: String, unique: true, required: true },
		institutionName: { type: String, required: true },
		contactEmail: { type: String, required: true },
		issuedBy: { type: String, required: true },
		issuedAt: { type: Date, default: Date.now },
		isActive: { type: Boolean, default: true },
		usageStats: {
			totalRequests: { type: Number, default: 0 },
			lastUsed: { type: Date },
		},
	},
	{
		collection: 'apiKey',
	}
);

const ApiKeyModel = mongoose.model('ApiKeyModel', apiKeySchema);

module.exports = ApiKeyModel;
