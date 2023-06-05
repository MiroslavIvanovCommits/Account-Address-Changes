/**
 * Applies reCAPTCHA data to viewData by getting it from site preferences
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function configureRecaptcha(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var Site = require('dw/system/Site');

    var {
        reCaptchaSiteKey,
        reCaptchaSecretKey,
        reCaptchaThreshold
    } = Site.getCurrent().getPreferences().custom;

    var reCaptchaConfiguration = {
        siteKey: reCaptchaSiteKey,
        secretKey: reCaptchaSecretKey,
        threshold: reCaptchaThreshold,
        verifyUrl: URLUtils.url("ReCaptcha-Verify"),
    };

    var viewData = res.getViewData();
    viewData.reCaptcha = reCaptchaConfiguration;
    res.setViewData(viewData);

    next();
}

module.exports = {
    configureRecaptcha: configureRecaptcha
};
