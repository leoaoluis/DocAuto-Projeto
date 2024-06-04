document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Registration successful!');
});

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var repeatPasswordInput = document.getElementById("repeat-password");

    [passwordInput, repeatPasswordInput].forEach(input => {
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    });
}
