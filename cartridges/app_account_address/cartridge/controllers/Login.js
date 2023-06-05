'use strict';

/**
 * @namespace Login
 */

var server = require('server');
server.extend(module.superModule);

var reCaptcha = require('~/cartridge/scripts/middlewares/reCaptcha');

/**
 * Login-Show : This endpoint is called to attach the reCAPTHCA data and load the Login page
 * @name Base/Login-Show
 * @function
 * @memberof Login
 * @param {middleware} - reCaptcha.configureRecaptcha
 */
server.append('Show', reCaptcha.configureRecaptcha);

module.exports = server.exports();
