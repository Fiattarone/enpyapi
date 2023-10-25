const express = require('express');
const router = express.Router();
const apiKeyModel = require('../models/apiKeyModel');
const generateApiKey = require('../utils/generateApiKey');

// Endpoint for getting an API key (soon to be blockaded, but we testing rn)
router.get('/api/', async (req, res) => {
	let newApiKey;
	let document;

	do {
		newApiKey = generateApiKey();
		console.warn(newApiKey);

		// Check to see if key already exists
		let document = await apiKeyModel.findOne({ apiKey: newApiKey });

		// If the key does not exist, insert it into the collection
		if (!document) {
			try {
				// Create & save new document with the generated key
				const newDocument = new apiKeyModel({ apiKey: newApiKey });
				await newDocument.save();

				// Exit the loop because the key is now successfully logged
				break;
			} catch (error) {
				console.error('Error logging API key:', error);
			}
		}
		// Continue generating while the key exists
	} while (document);

	res.json({ apiKey: newApiKey });
});

module.exports = router;
