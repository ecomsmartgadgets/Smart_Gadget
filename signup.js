// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5soHZ8xka6ebNJG5obmGVPjP5KEx5PxE",
  authDomain: "smart-gadget-7cf52.firebaseapp.com",
  projectId: "smart-gadget-7cf52",
  storageBucket: "smart-gadget-7cf52.appspot.com",
  messagingSenderId: "417332385631",
  appId: "1:417332385631:web:38aa5289b1d2dfc06308ea",
  measurementId: "G-C74RB4HFY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize authentication

// ✅ Handle Signup Form
document.getElementById("register-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Firebase Signup
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup successful! ✅");
            console.log("User signed up:", userCredential.user);
            window.location.href = "index.html"; // Redirect to index.html after signup
        })
        .catch((error) => {
            alert("Signup failed ❌: " + error.message);
            console.error("Error:", error);
        });
});

// ✅ Handle Login Form
document.querySelector(".login-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const email = document.querySelector(".login-form input[placeholder='Email']").value;
    const password = document.querySelector(".login-form input[placeholder='Password']").value;

    // Firebase Login
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful! ✅");
            console.log("User logged in:", userCredential.user);
            window.location.href = "index.html"; // Redirect to index.html after login
        })
        .catch((error) => {
            alert("Login failed ❌: " + error.message);
            console.error("Error:", error);
        });
});
