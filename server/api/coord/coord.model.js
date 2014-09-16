'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CoordSchema = new Schema({
	latitude: Number,
	longitude: Number,
	timestamp: Date,
	accuracy: Number
});

module.exports = mongoose.model('Coord', CoordSchema);