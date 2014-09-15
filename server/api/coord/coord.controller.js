'use strict';

var _ = require('lodash');
var Coord = require('./coord.model');

// Get list of coords
exports.index = function(req, res) {
  Coord.find({'timestamp': {'$gt': new Date() - 180000}}, function (err, coords) {
    if(err) { return handleError(res, err); }
    return res.json(200, coords);
  });
};

// Get a single coord
exports.show = function(req, res) {
  Coord.findById(req.params.id, function (err, coord) {
    if(err) { return handleError(res, err); }
    if(!coord) { return res.send(404); }
    return res.json(coord);
  });
};

// Creates a new coord in the DB.
exports.create = function(req, res) {
  var coord = {
    user: req.user._id,
    latitude: req.body.coords.latitude,
    longitude: req.body.coords.longitude,
    timestamp: new Date(),
    accuracy: req.body.coords.accuracy
  };
  Coord.create(coord, function(err, coord) {
    if(err) { return handleError(res, err); }
    return res.json(201, coord);
  });
};

// Updates an existing coord in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Coord.findById(req.params.id, function (err, coord) {
    if (err) { return handleError(res, err); }
    if(!coord) { return res.send(404); }
    var updated = _.merge(coord, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, coord);
    });
  });
};

// Deletes a coord from the DB.
exports.destroy = function(req, res) {
  Coord.findById(req.params.id, function (err, coord) {
    if(err) { return handleError(res, err); }
    if(!coord) { return res.send(404); }
    coord.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}