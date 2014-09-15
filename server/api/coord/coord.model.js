'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CoordSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	latitude: Number,
	longitude: Number,
	timestamp: Date,
	accuracy: Number
});

module.exports = mongoose.model('Coord', CoordSchema);