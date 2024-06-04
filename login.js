document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem('logins')) || [];
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        alert('Invalid email or password!');
    }
});
