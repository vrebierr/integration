/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Event = require('../api/event/event.model');
var Coord = require('../api/coord/coord.model');

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function() {
            console.log('finished populating users');
        }
    );
});

Event.find({}).remove(function() {
    Event.create({
        latitude: 48.89670230000001,
        longitude: 2.3183781999999997,
        description: 'Description de l\'event',
        type: 'foo',
        area: 5000
    });
});

Coord.find({}).remove(function() {
    Coord.create({
        latitude: 48.88,
        longitude: 2.3183781999999997,
        timestamp: new Date(),
        accuracy: 0
    });
    Coord.create({
        latitude: 48.89,
        longitude: 2.3183781999999997,
        timestamp: new Date() - 18000,
        accuracy: 0
    });
});