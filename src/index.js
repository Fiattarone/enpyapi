require('dotenv').config();

const express = require('express');
const app = express();
const wordRoute = require('./routes/wordRoute');
const apiRoute = require('./routes/apiRoute');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const apiKeyModel = require('./models/apiKeyModel');
const axios = require('axios');

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 100, // limit each IP to 100 requests per windowMs
});

// This is for testing
// const headers = {
// 	Authorization: `Bearer ${process.env.API_KEY}`,
// };

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
	console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
	console.log('Connected to MongoDB');

	app.use(express.json());
	app.use(async (req, res, next) => {
		// Check header for api key
		const apiKey = req.headers['x-api-key'];

		// If the request has a valid API key, allow it to bypass rate limiting
		if (apiKey && isValidApiKey(apiKey)) {
			try {
				const apiKeyDocument = await apiKeyModel.findOne({ apiKey });

				if (apiKeyDocument) {
					// Increment the totalRequests count and update the lastUsed timestamp
					apiKeyDocument.usageStats.totalRequests += 1;
					apiKeyDocument.usageStats.lastUsed = new Date();
					await apiKeyDocument.save();
				}
			} catch (error) {
				console.error('Error updating usage stats:', error);
			}

			return next();
		}

		// Apply rate limiting to requests without a valid API key
		limiter(req, res, next);
	});

	const isValidApiKey = async (apiKey) => {
		const document = await apiKeyModel.findOne({ apiKey: apiKey });
		if (document) console.warn('Api Key is valid!');
		return Boolean(document);
	};

	app.use(wordRoute);
	app.use(apiRoute);

	app.get('/', (req, res) => {
		res.send('Hello World -- ENPY API here!');
	});

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('MongoDB connection disconnected through app termination');
		process.exit(0);
	});
});
