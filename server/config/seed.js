/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Event = require('../api/event/event.model');

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

User.find({}).remove(function() {
    Event.create({
        coords: [48.89670230000001, 2.3183781999999997],
        description: 'Description de l\'event',
        type: 'foo',
        area: 5000
    });
});