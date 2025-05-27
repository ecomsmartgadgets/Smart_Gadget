// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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
const storage = getStorage(app);

// Select profile elements
const profileImage = document.getElementById("profile-pic");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profilePhone = document.getElementById("profile-phone");
const editProfileBtn = document.querySelector(".edit-btn");
const logoutBtn = document.querySelector(".logout-btn");

// Track current user
let currentUser = null;

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const userId = user.uid;
    console.log("User logged in:", user.email);

    try {
      // Fetch user details from Firestore
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        profileName.textContent = userData.name || "User";
        profileEmail.textContent = user.email;
        profilePhone.textContent = userData.phone || "Not provided";
        profileImage.src = userData.profileImage || "/images/default-avatar.png";
      } else {
        console.log("No user data found. Creating new profile...");
        await setDoc(userRef, {
          name: user.displayName || "User",
          email: user.email,
          phone: "",
          profileImage: "/images/default-avatar.png"
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("No user is logged in.");
    window.location.href = "signup.html"; // Redirect if not logged in
  }
});

// Handle Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "signup.html";
  } catch (error) {
    console.error("Logout Error:", error);
  }
});

// Edit Profile Functionality
editProfileBtn.addEventListener("click", async () => {
  if (!currentUser) return;

  // Create an input field for phone number
  const newPhone = prompt("Enter new phone number:", profilePhone.textContent);
  if (newPhone) {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { phone: newPhone });
      profilePhone.textContent = newPhone;
      alert("Phone number updated successfully!");
    } catch (error) {
      console.error("Error updating phone number:", error);
      alert("Failed to update phone number. Please try again.");
    }
  }

  // Create an input field for image upload
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
    try {
      // Upload the image
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      // Update Firestore with new image URL
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { profileImage: imageUrl });

      // Update the profile image in UI
      profileImage.src = imageUrl;
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  });
});
