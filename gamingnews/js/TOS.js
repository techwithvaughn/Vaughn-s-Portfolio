const toggleButton = document.getElementById('toggleButton');
const hiddenSection = document.getElementById('hideSection');
const agreeButton = document.getElementById('agreeButton');
const declineButton = document.getElementById('declineButton');

toggleButton.addEventListener('click', () => {
    if (hiddenSection.classList.contains('hidden')) {
        hiddenSection.classList.remove('hidden');
        toggleButton.textContent = 'Hide Terms of Service';
    } else {
        hiddenSection.classList.add('hidden');
        toggleButton.textContent = 'Show Terms of Service';
    }
});

function agreeToTerms() {
    confirmationText.textContent = 'You have agreed to the Terms of Service.';
    confirmationText.classList.remove('hidden');
}

function declineTerms() {
    confirmationText.textContent = 'You have declined the Terms of Service.';
    confirmationText.classList.remove('hidden');
}