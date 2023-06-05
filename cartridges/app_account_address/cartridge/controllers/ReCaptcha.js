"use strict";

/**
 * @namespace ReCaptcha
 */

var server = require("server");
var reCaptcha = require('~/cartridge/scripts/middlewares/reCaptcha.js');

/**
 * ReCaptcha-Verify : This endpoint is called via ajax request when a reCAPTCHA token needs to be verified
 * @name Base/ReCaptcha-Verify
 * @function
 * @memberof ReCaptcha
 * @param {httpparameter} - token - reCAPTCHA response token
 * @param {middleware} - server.middleware.https
 * @param {middleware} - reCaptchaData.configureRecaptcha
 * @param {category} - sensitive
 * @param {renders} - json
 * @param {serverfunction} - post
 */
server.post("Verify", server.middleware.https, reCaptcha.configureRecaptcha, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var errorMessage = Resource.msg('error.message.account.create.error', 'forms', null);

    var token = req.form.token;

    if (!token) {
        res.json({
            success: false,
            errorMessage: errorMessage
        });

        return next();
    }

    var reCaptchaConfiguration = res.getViewData().reCaptcha;

    var reCaptchaService = require('~/cartridge/scripts/services/reCaptchaService');
    var response = reCaptchaService.call({
        secret: reCaptchaConfiguration.secretKey,
        token: token
    }).object;

    var siteTreshold = reCaptchaConfiguration.threshold;

    if (response.score >= siteTreshold) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
            errorMessage: errorMessage
        })
    }

    next();
});

module.exports = server.exports();
