const mongoose = require('mongoose');

// Using Types.Mixed for each section since it can vary from list to string
const enpyOrderedSchema = new mongoose.Schema(
	{
		word: String,
		definition: mongoose.Schema.Types.Mixed,
		synonyms: mongoose.Schema.Types.Mixed,
		antonyms: mongoose.Schema.Types.Mixed,
	},
	{
		collection: 'enpyOrdered',
	}
);

const EnpyOrderedModel = mongoose.model('EnpyOrderedModel', enpyOrderedSchema);

module.exports = EnpyOrderedModel;
