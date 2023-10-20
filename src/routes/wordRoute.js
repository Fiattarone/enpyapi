const express = require('express');
const router = express.Router();
const wordEntryModel = require('../models/wordEntryModel');

// Endpoint for querying by word
router.get('/word/:word', async (req, res) => {
	const { word } = req.params;

	console.log(word);
	try {
		const document = await wordEntryModel.findOne({ word: word });

		if (!document) {
			return res.status(404).json({ message: 'Document not found' });
		}

		res.json(document);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports = router;
