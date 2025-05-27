// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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

// ✅ Handle Login Form
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Firebase Login
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful! ✅");
            console.log("User logged in:", userCredential.user);
            window.location.href = "profile.html"; // Redirect to home page after login
        })
        .catch((error) => {
            alert("Login failed ❌: " + error.message);
            console.error("Error:", error);
        });
});
