var passwordInputsList = document.querySelectorAll('.js-password-input');
var eyeIconsList = document.querySelectorAll('.js-eye-icon');
var passwordInputsArr = Array.from(passwordInputsList);
var eyeIconsArr = Array.from(eyeIconsList);

eyeIconsArr.forEach((eyeIcon, index) => {
    var passwordInput = passwordInputsArr[index];

    eyeIcon.addEventListener('click', () => {
        passwordInput.type === 'password'
            ? passwordInput.type = 'text'
            : passwordInput.type = 'password';
    });
});
