var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ldap = require('ldapjs');

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
                                return done(null, { username: login });
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