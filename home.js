document.addEventListener("DOMContentLoaded", function() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const authLink = document.getElementById('auth-link');
    const authText = document.getElementById('auth-text');
    const authIcon = document.getElementById('auth-icon-img');
    const logoBox = document.querySelector('.logo-box');

    if (currentUser) {
        authText.textContent = "Profile";
        authLink.href = "profile.html";
        authIcon.src = "assets/profile.png";
        authIcon.alt = "Profile";
    } else {
        authText.textContent = "Sign In";
        authLink.href = "login.html";
        authIcon.src = "assets/profile.png"; 
        authIcon.alt = "Sign In";
    }

    logoBox.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'home.html';
    });
});
