'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/**
 * reCaptcha service
 * @returns {Object} returns service configuration
 */
var reCaptchaService = LocalServiceRegistry.createService('http.reCaptcha.verify', {
    createRequest: function (svc, args) {
        svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        svc.setRequestMethod('POST');

        var secret = encodeURIComponent(args.secret);
        var token = encodeURIComponent(args.token);

        return "secret=" + secret + "&response=" + token;
    },
    parseResponse: function (svc, client) {
        let result;

        try {
            result = JSON.parse(client.text);
        } catch (e) {
            result = client.text;
        }

        return result;
    },
    filterLogMessage: function (msg) {
        return msg;
    }
});

module.exports = reCaptchaService;
