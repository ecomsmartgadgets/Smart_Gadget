const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
=============
Load Category Products
=============
*/
const categoryCenter = document.querySelector(".category__center");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
  addToCartEventListeners(); // Add event listeners for "Add to Cart" buttons
});

const displayProductItems = (items) => {
  let displayProduct = items.map(
    (product) => ` 
                  <div class="product category__products">
                    <div class="product__header">
                      <img src=${product.image} alt="product">
                    </div>
                    <div class="product__footer">
                      <h3>${product.title}</h3>
                      <div class="rating">
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
                        </svg>
                      </div>
                      <div class="product__price">
                        <h4>$${product.price}</h4>
                      </div>
                      <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlink:href="./images/sprite.svg#icon-eye"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlink:href="./images/sprite.svg#icon-loop2"></use>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  `
  );

  displayProduct = displayProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
  }
};

/*
=============
Add to Cart Functionality
=============
*/
let cartTotal = 0;

// Function to update the cart total displayed in the icon
function updateCartTotal() {
  const cartTotalElement = document.getElementById("cart__total");
  cartTotalElement.textContent = cartTotal;
}

// Add event listeners to all "Add to Cart" buttons
function addToCartEventListeners() {
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
      const product = button.closest(".product");
      const productName = product.querySelector("h3").textContent;
      const productPrice = product.querySelector(".product__price h4").textContent;
      console.log(`Added ${productName} (${productPrice}) to cart.`);
    });
  });
}

// On page load, retrieve the cart total from localStorage (if it exists)
window.addEventListener("load", () => {
  const storedCartTotal = localStorage.getItem("cartTotal");
  if (storedCartTotal) {
    cartTotal = parseInt(storedCartTotal, 10);
    updateCartTotal();
  }
});

/*
=============
Filtering
=============
*/
const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter((product) => {
        if (product.category === id) {
          return product;
        }
      });

      if (id === "All Products") {
        displayProductItems(products);
      } else {
        displayProductItems(menuCategory);
      }

      // Reattach event listeners after filtering
      addToCartEventListeners();
    }
  });
}

/*
=============
Product Details Left
=============
*/
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;

["mouseover", "touchstart"].forEach((event) => {
  if (picContainer) {
    picContainer.addEventListener(event, (e) => {
      const target = e.target.closest("img");
      if (!target) return;
      const id = target.id.slice(3);
      changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
    });
  }
});

// Change active image
const changeImage = (imgSrc, n) => {
  // Change the main image
  pic.src = imgSrc;
  // Change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  // Remove the border from the previous active side image
  picList[picActive - 1].classList.remove("img-active");
  // Add to the active image
  picList[n - 1].classList.add("img-active");
  // Update the active side picture
  picActive = n;
};

/*
=============
Product Details Bottom
=============
*/
const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", (e) => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach((btn) => {
        // Remove active from all btn
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // Hide other active
      Array.from(contents).forEach((content) => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}
