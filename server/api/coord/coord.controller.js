'use strict';

var _ = require('lodash');
var Coord = require('./coord.model');
var User = require('../user/user.model');

// Get list of coords
exports.index = function(req, res) {
    Coord.find({'timestamp': {'$gt': new Date() - 120000}}, function (err, coords) {
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
    Coord.create(coord, function(err, coord) {
        if(err) { return handleError(res, err); }
        return res.json(201, coord);
    });
};

// Updates an existing coord in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }

    User.findById(req.user._id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);

        Coord.findById(user.coord, function (err, coord) {
            if (err) { return handleError(res, err); }
            if(!coord) { return res.send(404); }

            var now = new Date();
            var dist = Math.sqrt(Math.pow(req.body.latitude - coord.latitude, 2) + Math.pow(req.body.longitude - coord.longitude, 2)) * 100000000;
            var time = (now - coord.timestamp) * 3600;
            var speed = Math.round(dist / time * 100) / 100;

            if (speed > 90) {
                return res.json(200, 'Nice try. You\'ll be report');
            }
            else {
                coord.timestamp = now;
                coord.latitude = req.body.latitude;
                coord.longitude = req.body.longitude;
                coord.accuracy = req.body.accuracy;

                coord.save(function (err) {
                    if (err) { return handleError(res, err); }
                    return res.json(200, coord);
                });
            }
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