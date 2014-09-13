'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
	coords: [Number, Number],
	description: String,
	area: Number
});

module.exports = mongoose.model('Event', EventSchema);