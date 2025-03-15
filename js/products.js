/*
=============
Cart Functionality
=============
*/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const updateCartIcon = () => {
  const cartIcon = document.querySelector("#cart__total");
  if (cartIcon) {
    cartIcon.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
};

const addToCart = (product) => {
  console.log("Adding product to cart:", product); // Debugging log
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart updated:", cart); // Debugging log
  updateCartIcon();
};

/*
=============
Load Products
=============
*/
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
Display Products
=============
*/
const categoryCenter = document.querySelector(".category__center");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
  updateCartIcon(); // Update cart icon on page load
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
          <a href="#"><button type="submit" class="product__btn" data-id="${product.id}">Add To Cart</button></a>
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

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".product__btn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = e.currentTarget.dataset.id;
        const product = items.find((item) => item.id === productId);
        if (product) {
          addToCart(product);
        }
      });
    });
  }
};
