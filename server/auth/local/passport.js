var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose')
var ldap = require('ldapjs');
var User = mongoose.model('User');
var Coord = mongoose.model('Coord');

exports.setup = function (config) {
    passport.use(new LocalStrategy(
        function (login, password, done) {
            var client = ldap.createClient({
                url: 'ldaps://ldap.42.fr:636'
            });

            var opts = {
                filter: '(uid=' + login + ')',
                scope: 'sub'
            };

            var ldapres = null;

            client.search('ou=people,dc=42,dc=fr', opts, function (err, result) {
                result.on('searchEntry', function (entry) {
                    ldapres = entry.raw;
                });
                result.on('error', function (err) {
                    return done(err);
                });
                result.on('end', function (result) {
                    if (ldapres) {
                        client.bind(ldapres.dn, password, function (err) {
                            if (err) {
                                return done(err);
                            }
                            else {
                                User.findOne({login: login}, function (err, user) {
                                    if (err) { return done(err); }
                                    if (!user) {
                                        var coord = {
                                            latitude: 0,
                                            longitude: 0,
                                            timestamp: 0,
                                            accuracy: 0
                                        };

                                        Coord.create(coord, function(err, coord) {
                                            if(err) { return done(err); }

                                            newUser = new User({
                                                login: login,
                                                role: 'user',
                                                coord: coord._id
                                            });

                                            User.create(newUser, function (err, user) {
                                                if (err) { return done(err); }
                                                return done(null, user);
                                            });
                                        });  
                                    }
                                    return done(null, user);
                                });
                            }
                        });
                    }
                    else {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                });
            });
        }
    ));
};