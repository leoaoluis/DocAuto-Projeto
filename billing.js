function getAddressElements() {
    const addressElement = document.querySelector('.content p:nth-child(2)');
    const nifElement = document.querySelector('.content p:nth-child(3)');
    const phoneElement = document.querySelector('.content p:nth-child(4)');

    return { addressElement, nifElement, phoneElement};
}

window.onload = function() {
    const { addressElement, nifElement, phoneElement} = getAddressElements();

    const savedAddress = localStorage.getItem('address');
    const savedNif = localStorage.getItem('nif');
    const savedPhone = localStorage.getItem('phone');
    const savedEmail = localStorage.getItem('email');

    const userInfoElement = document.getElementById('user-info');
    if (savedEmail) {
        userInfoElement.innerHTML = `<strong>User:</strong> ${savedEmail}`;
    }

    addressElement.innerHTML = `<strong>Address:</strong> ${savedAddress}`;
    nifElement.innerHTML = `<strong>Nif:</strong> ${savedNif}`;
    phoneElement.innerHTML = `<strong>Phone:</strong> ${savedPhone}`;
}

function editAddress() {
    const { addressElement, nifElement, phoneElement } = getAddressElements();

    const savedAddress = localStorage.getItem('address');
    const savedNif = localStorage.getItem('nif');
    const savedPhone = localStorage.getItem('phone');

    addressElement.innerHTML = `<strong>Address: </strong><input type="text" value="${savedAddress}">`;
    nifElement.innerHTML = `<strong>Nif: </strong><input type="text" value="${savedNif}">`;
    phoneElement.innerHTML = `<strong>Phone: </strong><input type="tel" value="${savedPhone}">`;

    document.querySelector('.edit-button').innerHTML = 'Save Changes';
    document.querySelector('.edit-button').onclick = saveAddress;
}

function saveAddress() {
    const { addressElement, nifElement, phoneElement } = getAddressElements();

    const addressInput = addressElement.querySelector('input');
    const nifInput = nifElement.querySelector('input');
    const phoneInput = phoneElement.querySelector('input');

    localStorage.setItem('address', addressInput.value);
    localStorage.setItem('nif', nifInput.value);
    localStorage.setItem('phone', phoneInput.value);

    addressElement.innerHTML = `<strong>Address:</strong> ${addressInput.value}`;
    nifElement.innerHTML = `<strong>Nif:</strong> ${nifInput.value}`;
    phoneElement.innerHTML = `<strong>Phone:</strong> ${phoneInput.value}`;

    document.querySelector('.edit-button').innerHTML = 'Edit Address';
    document.querySelector('.edit-button').onclick = editAddress;
}

function remove() {
    localStorage.removeItem('address');
    localStorage.removeItem('nif');
    localStorage.removeItem('phone');

    window.location.href = 'address.html';

}
