/*
=============
Navigation
=============
*/
const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.classList.add("active");
  navContainer.style.left = "0";
  navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("active");
  navContainer.style.left = "-30rem";
  navContainer.style.width = "0";
});

/*
=============
<<<<<<< HEAD
=======
PopUp
=============
*/
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide__popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide__popup");
    }, 500);
  });
}

/*
=============
>>>>>>> 416c22bdbf1b9426cd0e93850022d946087360eb
Fixed Navigation
=============
*/
const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map((link) => {
  link.addEventListener("click", (e) => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = "-30rem";
    document.body.classList.remove("active");
  });
});

// Fix NavBar
window.addEventListener("scroll", (e) => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }

  if (scrollHeight > 300) {
    gotoTop.classList.add("show-top");
  } else {
    gotoTop.classList.remove("show-top");
  }
});

/*
=============
Add to Cart Functionality
=============
*/
// Initialize cart total
let cartTotal = 0;

// Function to update the cart total displayed in the icon
function updateCartTotal() {
  const cartTotalElement = document.getElementById("cart__total");
  cartTotalElement.textContent = cartTotal;
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".product__btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Increment the cart total
    cartTotal += 1;

    // Update the cart total displayed in the icon
    updateCartTotal();

    // Optionally, store the cart data in localStorage
    localStorage.setItem("cartTotal", cartTotal);

    // Optional: Add the product to the cart (you can expand this logic)
    // const product = button.closest(".product");
    // const productName = product.querySelector("h3").textContent;
    // const productPrice = product.querySelector(".product__price h4").textContent;
    // console.log(`Added ${productName} (${productPrice}) to cart.`);
  });
});

// On page load, retrieve the cart total from localStorage (if it exists)
window.addEventListener("load", () => {
  const storedCartTotal = localStorage.getItem("cartTotal");
  if (storedCartTotal) {
    cartTotal = parseInt(storedCartTotal, 10);
    updateCartTotal();
  }
});
