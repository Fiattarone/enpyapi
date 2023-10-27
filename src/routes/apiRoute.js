const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const apiKeyModel = require('../models/apiKeyModel');
const generateApiKey = require('../utils/generateApiKey');

// Endpoint for getting an API key (soon to be blockaded, but we testing rn)
// router.get('/api/', async (req, res) => {
// 	let newApiKey;
// 	let document;

// 	do {
// 		newApiKey = generateApiKey();
// 		console.warn(newApiKey);

// 		// Check to see if key already exists
// 		document = await apiKeyModel.findOne({ apiKey: newApiKey });

// 		// If the key does not exist, insert it into the collection
// 		if (!document) {
// 			try {
// 				// Create & save new document with the generated key
// 				const newDocument = new apiKeyModel({ apiKey: newApiKey });
// 				await newDocument.save();

// 				// Exit the loop because the key is now successfully logged
// 				break;
// 			} catch (error) {
// 				console.error('Error logging API key:', error);
// 			}
// 		}
// 		// Continue generating while the key exists
// 	} while (document);

// 	res.json({ apiKey: newApiKey });
// });

// To replace just randomly generating an api
router.post(
	'/api/',
	[
		check('institutionName', 'institutionName is required').not().isEmpty(),
		check('contactEmail', 'contactEmail is required').not().isEmpty(),
		check('issuedBy', 'issuedBy is required').not().isEmpty(),
		// check('issuedAt', 'issuedAt is required').not().isEmpty(),
		// check('isActive', 'isActive is required').not().isEmpty(),
		// check('totalRequests', 'totalRequests is required').not().isEmpty(),
		// check('lastUsed', 'lastUsed is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let newApiKey;
		let document;

		const { institutionName, contactEmail, issuedBy } = req.body;

		// Build api object
		const apiFields = {};
		if (institutionName) apiFields.institutionName = institutionName;
		if (contactEmail) apiFields.contactEmail = contactEmail;
		if (issuedBy) apiFields.issuedBy = issuedBy;

		do {
			newApiKey = generateApiKey();
			console.warn(newApiKey);

			// Check to see if key already exists
			document = await apiKeyModel.findOne({ apiKey: newApiKey });

			// If the key does not exist, insert it into the collection
			if (!document) {
				try {
					// Create & save new document with the generated key
					const newDocument = new apiKeyModel({
						apiKey: newApiKey,
						institutionName: institutionName,
						contactEmail: contactEmail,
						issuedBy: issuedBy,
					});

					await newDocument.save();

					console.log(apiFields);

					// Exit the loop because the key is now successfully logged
					break;
				} catch (error) {
					console.error('Error logging API key:', error);
				}
			}
			// Continue generating while the key exists
		} while (document);

		res.json({ apiKey: newApiKey });
	}
);

module.exports = router;
