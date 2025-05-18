const mongoose = require('mongoose'); // import Mongoose
const MoodSchema = new mongoose.Schema ({
	score: {
	type: Number,
	required: true,
	min: 1,
	max: 10
	},
	note: {
	type: String,
	required: false
	},
	tags: [{
	type: String
	}],
	date: {
	 type: Date,
	 default: Date.now
	},
	userId: {
	 type: String,
	 required: true
	}
});
