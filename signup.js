// Import Firebase modules 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Ensure the form exists before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.querySelector(".login-form");

    if (registerForm) {
        registerForm.addEventListener("submit", handleSignup);
    }
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
});

// ✅ Handle Signup Form
async function handleSignup(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("name")?.value.trim(); // Add name input field in HTML if needed

    // Check if fields are empty
    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    try {
        // Firebase Signup
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user details to Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name || "User",
            email: user.email,
            phone: "",
            profileImage: "default-avatar.png" // Default profile image
        });

        alert("Signup successful! ✅");
        console.log("User signed up:", user);
        window.location.href = "index.html"; // Redirect to homepage after signup
    } catch (error) {
        alert("Signup failed ❌: " + error.message);
        console.error("Error:", error);
    }
}

// ✅ Handle Login Form
async function handleLogin(event) {
    event.preventDefault();

    // Get input values
    const email = document.querySelector(".login-form input[placeholder='Email']").value.trim();
    const password = document.querySelector(".login-form input[placeholder='Password']").value.trim();

    // Check if fields are empty
    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    try {
        // Firebase Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful! ✅");
        console.log("User logged in:", userCredential.user);
        window.location.href = "index.html"; // Redirect after login
    } catch (error) {
        alert("Login failed ❌: " + error.message);
        console.error("Error:", error);
    }
}
