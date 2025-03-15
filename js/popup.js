
/*
=============
PopUp
=============
 */
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");
const subscribeForm = document.getElementById("subscribeForm");
const emailInput = document.getElementById("emailInput");
const message = document.getElementById("subscriptionMessage");

if (popup) {
  // Close pop-up when clicking the close button
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide__popup");
  });

  // Show pop-up after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide__popup");
    }, 500);
  });

  // Handle subscription form submission
  subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    let email = emailInput.value.trim();
    
    if (email !== "") {
      message.textContent = "✅ Thank you for subscribing! Check your email for updates.";
      message.style.display = "block";
      message.style.color = "green";

      // Hide the pop-up after 3 seconds
      setTimeout(() => {
        popup.classList.add("hide__popup");
        message.style.display = "none";
        emailInput.value = ""; // Clear input field
      }, 3000);
    } else {
      message.textContent = "⚠️ Please enter a valid email!";
      message.style.color = "red";
      message.style.display = "block";
    }
  });
}