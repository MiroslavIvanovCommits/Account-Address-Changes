var radioBturrons = document.querySelectorAll('.js-address-radion-button');
var businessAddressForm = document.querySelector('.js-business-address-form');

radioBturrons.forEach(radioButton => {
    radioButton.onchange = () => {
        var addressType = radioButton.value;

        if (addressType === "Private Address") {
            businessAddressForm.classList.add('d-none');
        }
        if (addressType === "Business Address") {
            businessAddressForm.classList.remove('d-none');
        }
    }
});
