'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
	latitude: Number,
	longitude: Number,
	description: String,
	type: String,
	area: Number
});

module.exports = mongoose.model('Event', EventSchema);