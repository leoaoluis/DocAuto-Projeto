function getPersonalDataElements() {
    const usernameElement = document.getElementById('display-username');
    const passwordElement = document.getElementById('display-password');
    const emailElement = document.getElementById('display-email');
    const phoneElement = document.getElementById('display-phone');

    return { usernameElement, passwordElement, emailElement, phoneElement };
}

window.onload = function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameElement, passwordElement, emailElement, phoneElement } = getPersonalDataElements();

    if (currentUser) {
        document.getElementById('user-greeting').textContent = `Hi ${currentUser.name}`;
        usernameElement.innerHTML = `<strong>Username:</strong> ${currentUser.name}`;
        passwordElement.innerHTML = `<strong>Password:</strong> ${currentUser.password}`;
        emailElement.innerHTML = `<strong>Email:</strong> ${currentUser.email}`;
        phoneElement.innerHTML = `<strong>Phone:</strong> ${currentUser.phone || ''}`;
    } else {
        window.location.href = 'login.html';
    }
}

function editPersonalData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameElement, passwordElement, emailElement, phoneElement } = getPersonalDataElements();

    usernameElement.innerHTML = `<strong>Username: </strong><input type="text" value="${currentUser.name}">`;
    passwordElement.innerHTML = `<strong>Password: </strong><input type="password" value="${currentUser.password}">`;
    emailElement.innerHTML = `<strong>Email: </strong><input type="email" value="${currentUser.email}">`;
    phoneElement.innerHTML = `<strong>Phone: </strong><input type="tel" value="${currentUser.phone || ''}">`;

    const editButton = document.querySelector('.edit-button');
    editButton.innerHTML = 'Save Changes';
    editButton.onclick = savePersonalData;
}

function savePersonalData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameElement, passwordElement, emailElement, phoneElement } = getPersonalDataElements();

    const usernameInput = usernameElement.querySelector('input');
    const passwordInput = passwordElement.querySelector('input');
    const emailInput = emailElement.querySelector('input');
    const phoneInput = phoneElement.querySelector('input');

    currentUser.name = usernameInput.value;
    currentUser.password = passwordInput.value;
    currentUser.email = emailInput.value;
    currentUser.phone = phoneInput.value;

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem('logins')) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('logins', JSON.stringify(users));
    }

    usernameElement.innerHTML = `<strong>Username:</strong> ${currentUser.name}`;
    passwordElement.innerHTML = `<strong>Password:</strong> ${currentUser.password}`;
    emailElement.innerHTML = `<strong>Email:</strong> ${currentUser.email}`;
    phoneElement.innerHTML = `<strong>Phone:</strong> ${currentUser.phone || ''}`;

    const editButton = document.querySelector('.edit-button');
    editButton.innerHTML = 'Edit Personal Data';
    editButton.onclick = editPersonalData;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
