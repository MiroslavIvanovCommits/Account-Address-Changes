var createErrorNotification = require('base/components/errorNotification');

/**
 * It validates the given reCAPTCHA token upon submission
 * @param {String} reCAPTCHA token
 */
function verifyReCaptcha(token) {
    console.log(token);
    var $form = $('form.js-registration');
    var $submitBtn = $form.find('.js-registration-submit');

    var verifyUrl = $submitBtn.data('verify-url');

    $form.spinner().start();

    $.ajax({
        url: verifyUrl,
        type: 'post',
        dataType: 'json',
        data: { token },
        success: function (data) {
            $form.spinner().stop();

            if (!data.success) {
                createErrorNotification($('.error-messaging'), data.errorMessage);
            } else {
                $form.trigger('submit');
            }
        },
        error: function (err) {
            $form.spinner().stop();
            createErrorNotification($('.error-messaging'), err.responseJSON.errorMessage);
        },
    });
}

/**
 * Makes reCaptcha sumbission function global so reCaptcha API can use it as callback
 */
function attachReCaptcha() {
    window.verifyReCaptcha = verifyReCaptcha;
}

module.exports = {
    attachReCaptcha,
};
