// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const wishlistContainer = document.getElementById("wishlist-items");

// Function to generate star ratings
const getStarRating = (rating) => {
  return "⭐".repeat(rating) + "☆".repeat(5 - rating); // 5-star system
};

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    console.log("User is logged in:", user.email);

    // Fetch user wishlist from Firestore
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const wishlist = userData.wishlist || [];

      if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
      } else {
        wishlistContainer.innerHTML = "";
        wishlist.forEach((item, index) => {
          const wishlistItem = document.createElement("div");
          wishlistItem.classList.add("wishlist-item");
          wishlistItem.setAttribute("data-index", index);

          wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <div class="rating">${getStarRating(item.rating || 4)}</div>
            <p class="price">${item.price}</p>
            <button class="add-to-cart" data-index="${index}">ADD TO CART</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
          `;

          wishlistContainer.appendChild(wishlistItem);
        });

        // Add event listeners for remove buttons
        document.querySelectorAll(".remove-btn").forEach((button) => {
          button.addEventListener("click", async (event) => {
            const itemIndex = event.target.getAttribute("data-index");
            wishlist.splice(itemIndex, 1);

            // Update Firestore
            await updateDoc(userRef, { wishlist });

            // Refresh the wishlist
            displayWishlist(wishlist);
          });
        });

        // Add event listeners for "Add to Cart" buttons
        document.querySelectorAll(".add-to-cart").forEach((button) => {
          button.addEventListener("click", async (event) => {
            const itemIndex = event.target.getAttribute("data-index");
            const itemToAdd = wishlist[itemIndex];

            // Fetch user cart from Firestore
            const cartRef = doc(db, "users", userId);
            const cartSnap = await getDoc(cartRef);
            const cartData = cartSnap.exists() ? cartSnap.data().cart || [] : [];

            // Add item to cart if not already in cart
            if (!cartData.some(cartItem => cartItem.name === itemToAdd.name)) {
              cartData.push(itemToAdd);
              await updateDoc(cartRef, { cart: cartData });
              alert(`${itemToAdd.name} added to cart.`);
            } else {
              alert(`${itemToAdd.name} is already in the cart.`);
            }
          });
        });
      }
    } else {
      console.log("No user data found.");
    }
  } else {
    console.log("No user is logged in.");
    window.location.href = "signup.html"; // Redirect to signup if not logged in
  }
});

// Function to update the wishlist UI without refreshing
function displayWishlist(wishlist) {
  wishlistContainer.innerHTML = "";
  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach((item, index) => {
    const wishlistItem = document.createElement("div");
    wishlistItem.classList.add("wishlist-item");
    wishlistItem.setAttribute("data-index", index);

    wishlistItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <div class="rating">${getStarRating(item.rating || 4)}</div>
      <p class="price">${item.price}</p>
      <button class="add-to-cart" data-index="${index}">ADD TO CART</button>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    wishlistContainer.appendChild(wishlistItem);
  });

  // Reattach event listeners for remove buttons
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const itemIndex = event.target.getAttribute("data-index");
      wishlist.splice(itemIndex, 1);

      // Update Firestore
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { wishlist });
      }

      // Refresh UI
      displayWishlist(wishlist);
    });
  });

  // Reattach event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const itemIndex = event.target.getAttribute("data-index");
      const itemToAdd = wishlist[itemIndex];

      // Fetch user cart from Firestore
      const user = auth.currentUser;
      if (user) {
        const cartRef = doc(db, "users", user.uid);
        const cartSnap = await getDoc(cartRef);
        const cartData = cartSnap.exists() ? cartSnap.data().cart || [] : [];

        // Add item to cart if not already in cart
        if (!cartData.some(cartItem => cartItem.name === itemToAdd.name)) {
          cartData.push(itemToAdd);
          await updateDoc(cartRef, { cart: cartData });
          alert(`${itemToAdd.name} added to cart.`);
        } else {
          alert(`${itemToAdd.name} is already in the cart.`);
        }
      }
    });
  });
}
