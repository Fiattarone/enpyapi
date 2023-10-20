require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes/wordRoute');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

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

	app.use(routes);

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
