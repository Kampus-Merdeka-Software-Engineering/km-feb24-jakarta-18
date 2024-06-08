    document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".login-button");

    loginButton.addEventListener("click", function () {
        const emailInput = document.querySelector(".input-email").value;
        const passwordInput = document.querySelector(".input-pass").value;

        // Dummy credentials
        const validEmail = "Admin";
        const validPassword = "admin12345";

        if (emailInput === validEmail && passwordInput === validPassword) {
        // Redirect to index.html if credentials are correct
        window.location.href = "index.html";
        } else {
        // Show an alert if credentials are incorrect
        alert("Invalid email or password. Please try again.");
        }
    });
    });
