'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  login: String,
  role: {
    type: String,
    default: 'user'
  },
  coord: { type: Schema.Types.ObjectId, ref: 'Coord' }
});

module.exports = mongoose.model('User', UserSchema);
