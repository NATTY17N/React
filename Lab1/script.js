// Utility functions
const getElement = (id) => document.getElementById(id);
const setLocalStorage = (key, value) => localStorage.setItem(key, value);
const getLocalStorage = (key) => localStorage.getItem(key);

// DOM elements
const elements = {
    inputNumber: getElement('inputNumber'),
    button100: getElement('button100'),
    button500: getElement('button500'),
    button1000: getElement('button1000'),
    monoPayButton: getElement('mono-pay-button'),
    googlePayButton: getElement('google-pay-button'),
    bankDepositSubmitButton: getElement('bank-deposit-submit-button'),
    accumulatedMoney: getElement('accumulated-money'),
    dollarIcon: getElement('dollar'),
    donorNameInput: getElement('donor-name-input'),
    donationCommentsInput: getElement('donation-comments-input'),
    cardNumberInput: getElement('card-number-input'),
    cardExpirationMonth: getElement('card-expiration-month'),
    cardExpirationYear: getElement('card-expiration-year'),
    cardCvvInput: getElement('card-cvv-input'),
    donationErrorMessage: getElement('donation-error-message'),
    toggleButton: getElement('toggleButton'),
    hiddenElement: getElement('hiddenElement'),
    hideHr: getElement('hideHr'),
    btnDonate: getElement('btn-donate'),
    glassImage: getElement('img')
};

// Constants
const MIN_DONATION = 10;
const MAX_DONATION = 29999;
const LAST_DONATION_KEY = 'lastDonationAmount';

// Event listeners
elements.button100.addEventListener('click', () => addMoney(100));
elements.button500.addEventListener('click', () => addMoney(500));
elements.button1000.addEventListener('click', () => addMoney(1000));

elements.monoPayButton.addEventListener('click', handlePaymentButtonClick);
elements.googlePayButton.addEventListener('click', handlePaymentButtonClick);
elements.bankDepositSubmitButton.addEventListener('click', handleBankDepositSubmit);
elements.toggleButton.addEventListener('click', toggleHiddenElement);
elements.btnDonate.addEventListener('click', toggleHiddenElement);

elements.cardNumberInput.addEventListener('input', handleCardNumberInput);
elements.cardExpirationMonth.addEventListener('input', handleCardExpirationMonthInput);
elements.cardExpirationYear.addEventListener('input', handleCardExpirationYearInput);
elements.cardCvvInput.addEventListener('input', handleCardCvvInput);


window.addEventListener('load', initializeApp);

// Event handler functions
function handlePaymentButtonClick() {
    displayMoney();
    displayJar();
    logDonationInfo();
}

function handleBankDepositSubmit() {
    displayMoney();
    logBankDepositInfo();
}

function handleCardNumberInput() {
    this.value = this.value.replace(/\D/g, '').slice(0, 16);
}

function handleCardExpirationMonthInput() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value < 1) {
        this.value = '';
    } else if (this.value > 12) {
        this.value = '12';
    }
}

function handleCardExpirationYearInput() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 3) {
        this.value = Math.max(2024, Math.min(parseInt(this.value), 2040));
    }
}

function handleCardCvvInput() {
    this.value = this.value.replace(/\D/g, '').slice(0, 3);
}

// Core functions
function addMoney(value) {
    const currentValue = parseInt(elements.inputNumber.value);
    elements.inputNumber.value = currentValue + value;
    updateInputColor('black');
}

function displayMoney() {
    const donationAmount = parseInt(elements.inputNumber.value);
    const currentTotal = parseInt(elements.accumulatedMoney.textContent) || 0;
    const newTotal = (donationAmount >= MIN_DONATION && donationAmount <= MAX_DONATION)
        ? currentTotal + donationAmount
        : currentTotal;

    elements.accumulatedMoney.textContent = `${newTotal} ₴`;
    setLocalStorage(LAST_DONATION_KEY, newTotal);
}

function displayJar() {
    const currentAmount = parseInt(getLocalStorage(LAST_DONATION_KEY));
    elements.glassImage.src = getJarImageSrc(currentAmount);
}

function getJarImageSrc(amount) {
    if (amount >= 25000) return "https://send.monobank.ua/img/jar/uah_100.png";
    if (amount >= 12500) return "https://send.monobank.ua/img/jar/uah_50.png";
    if (amount > 0) return "https://send.monobank.ua/img/jar/uah_33.png";
    return "https://send.monobank.ua/img/jar/0.png";
}

function changeColor() {
    const value = parseInt(elements.inputNumber.value);
    const isValidDonation = value >= MIN_DONATION && value <= MAX_DONATION;

    elements.inputNumber.value = Math.min(Math.max(value, 1), MAX_DONATION);
    updateInputColor(isValidDonation ? 'black' : '#d984a9');
    elements.donationErrorMessage.style.display = isValidDonation ? 'none' : 'flex';
    elements.btnDonate.style.marginTop = isValidDonation ? '25px' : '10px';
}

function updateInputColor(color) {
    elements.inputNumber.style.color = color;
    elements.dollarIcon.style.color = color;
}

function toggleHiddenElement() {
    const isHidden = elements.hiddenElement.style.display === 'none' || elements.hiddenElement.style.display === '';
    elements.hiddenElement.style.display = isHidden ? 'block' : 'none';
    elements.toggleButton.style.display = isHidden ? 'none' : 'block';
    elements.hideHr.style.display = isHidden ? 'none' : 'block';
}


function initializeApp() {
    const lastDonationAmount = getLocalStorage(LAST_DONATION_KEY);
    if (lastDonationAmount) {
        elements.accumulatedMoney.textContent = `${lastDonationAmount} ₴`;
        displayJar();
    }
}

// Logging functions
function logDonationInfo() {
    console.log(`Користувач: ${elements.donorNameInput.value};
Коментар: ${elements.donationCommentsInput.value};
Сума донату: ${elements.inputNumber.value} грн.`);
}

function logBankDepositInfo() {
    console.log(`Користувач: ${elements.donorNameInput.value};
Коментар: ${elements.donationCommentsInput.value};
Номер картки: ${elements.cardNumberInput.value};
Дані картки в форматі мм/рр/cvv2: ${elements.cardExpirationMonth.value}/${elements.cardExpirationYear.value}/${elements.cardCvvInput.value};
Сума донату: ${elements.inputNumber.value} грн.`);
}