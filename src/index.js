require('dotenv').config();

const express = require('express');
const app = express();
const wordRoute = require('./routes/wordRoute');
const apiRoute = require('./routes/apiRoute');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 100, // limit each IP to 100 requests per windowMs
});

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

	app.use(limiter);
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
