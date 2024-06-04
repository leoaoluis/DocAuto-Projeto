function getPaymentElements() {
    const nameElement = document.querySelector('.payment-container p:nth-child(2)');
    const numberElement = document.querySelector('.payment-container p:nth-child(3)');
    const dateElement = document.querySelector('.payment-container p:nth-child(4)');
    const cvvElement = document.querySelector('.payment-container p:nth-child(5)');

    return { nameElement, numberElement, dateElement, cvvElement };
}

window.onload = function() {
    const { nameElement, numberElement, dateElement, cvvElement } = getPaymentElements();

    const savedName = localStorage.getItem('name');
    const savedNumber = localStorage.getItem('number');
    const savedDate = localStorage.getItem('date');
    const savedCvv = localStorage.getItem('cvv');

    nameElement.innerHTML = `<strong>Name:</strong> ${savedName}`;
    numberElement.innerHTML = `<strong>Card Number:</strong> ${savedNumber}`;
    dateElement.innerHTML = `<strong>Expiration Date:</strong> ${savedDate}`;
    cvvElement.innerHTML = `<strong>CVV:</strong> ${savedCvv}`;
}

function completePurchase() {
    alert("Compra realizada com sucesso!");
    window.location.href = "home.html";
}

function editPaymentData() {
    const { nameElement, numberElement, dateElement, cvvElement } = getPaymentElements();

    const savedName = localStorage.getItem('name');
    const savedNumber = localStorage.getItem('number');
    const savedDate = localStorage.getItem('date');
    const savedCvv = localStorage.getItem('cvv');

    nameElement.innerHTML = `<strong>Name: </strong><input type="text" value="${savedName}">`;
    numberElement.innerHTML = `<strong>Card Number: </strong><input type="text" value="${savedNumber}">`;
    dateElement.innerHTML = `<strong>Expiration Date: </strong><input type="text" value="${savedDate}">`;
    cvvElement.innerHTML = `<strong>CVV: </strong><input type="text" value="${savedCvv}">`;

    document.querySelector('.edit-button').innerHTML = 'Save Changes';
    document.querySelector('.edit-button').onclick = savePaymentData;
}

function savePaymentData() {
    const { nameElement, numberElement, dateElement, cvvElement } = getPaymentElements();

    const nameInput = nameElement.querySelector('input');
    const numberInput = numberElement.querySelector('input');
    const dateInput = dateElement.querySelector('input');
    const cvvInput = cvvElement.querySelector('input');

    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('number', numberInput.value);
    localStorage.setItem('date', dateInput.value);
    localStorage.setItem('cvv', cvvInput.value);

    nameElement.innerHTML = `<strong>Name:</strong> ${nameInput.value}`;
    numberElement.innerHTML = `<strong>Card Number:</strong> ${numberInput.value}`;
    dateElement.innerHTML = `<strong>Expiration Date:</strong> ${dateInput.value}`;
    cvvElement.innerHTML = `<strong>CVV:</strong> ${cvvInput.value}`;

    document.querySelector('.edit-button').innerHTML = 'Edit Payment Data';
    document.querySelector('.edit-button').onclick = editPaymentData;
}

function remove() {
    localStorage.removeItem('name');
    localStorage.removeItem('number');
    localStorage.removeItem('date');
    localStorage.removeItem('cvv');
}
