// Get cart from Local Storage
let cart = JSON.parse(localStorage.getItem("campusBiteCart")) || [];
cart = cart.map(function (item) {
  return {
    ...item,
    image:
      typeof item.image === "string"
        ? item.image.replace(/\.svg$/, ".jpg")
        : item.image,
  };
});
localStorage.setItem("campusBiteCart", JSON.stringify(cart));

// Get HTML elements
const cartItemsContainer = document.getElementById("cart-items");
const cartItemCount = document.getElementById("cart-item-count");

const summaryQuantity = document.getElementById("summary-quantity");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-btn");

// Save updated cart
function saveCart() {
  localStorage.setItem("campusBiteCart", JSON.stringify(cart));
}
// Update navbar cart count
function updateNavbarCartCount() {
  const navbarCount = document.getElementById("cart-count");

  if (!navbarCount) return;

  let totalQuantity = cart.reduce(function (total, item) {
    return total + Number(item.quantity);
  }, 0);

  navbarCount.textContent = totalQuantity;
}

// Display Cart Items
function displayCart() {
  updateNavbarCartCount();

  cartItemsContainer.innerHTML = "";

  // Check if cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">

                <div class="empty-icon">🛒</div>

                <h3>Your Cart is Empty!</h3>

                <p>
                    Looks like you haven't added anything
                    to your cart yet.
                </p>

                <a href="menu.html">
                    Explore Food Menu →
                </a>

            </div>
        `;

    cartItemCount.textContent = "0 items";
    summaryQuantity.textContent = "0";
    cartSubtotal.textContent = "Rs. 0";
    cartTotal.textContent = "Rs. 0";

    checkoutButton.disabled = true;

    return;
  }

  checkoutButton.disabled = false;

  // Display each cart item
  cart.forEach(function (item) {
    let cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-details">

                <h3>${item.name}</h3>

                <p>${item.category}</p>

               <div class="cart-item-price">
    Rs. ${item.price} each
</div>

<div class="cart-line-total">
    Item Total: Rs. ${item.price * item.quantity}
</div>

                <div class="quantity-controls">

                    <button class="decrease-btn" data-id="${item.id}">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button class="increase-btn" data-id="${item.id}">
                        +
                    </button>

                </div>

                <button class="remove-btn" data-id="${item.id}">
                    Remove Item
                </button>

            </div>

        `;

    cartItemsContainer.appendChild(cartItem);
  });
  updateNavbarCartCount();
  // Update Summary
  updateSummary();
}

// Calculate totals
function updateSummary() {
  // Total quantity of all food items
  let totalQuantity = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  // Calculate subtotal
  let subtotal = cart.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  cartItemCount.textContent = totalQuantity + " items";

  summaryQuantity.textContent = totalQuantity;

  cartSubtotal.textContent = "Rs. " + subtotal;

  cartTotal.textContent = "Rs. " + subtotal;
}

// Increase or decrease quantity
cartItemsContainer.addEventListener("click", function (event) {
  let itemId = Number(event.target.dataset.id);

  if (!itemId) {
    return;
  }

  // Increase quantity
  if (event.target.classList.contains("increase-btn")) {
    let selectedItem = cart.find(function (item) {
      return item.id === itemId;
    });

    selectedItem.quantity++;
  }

  // Decrease quantity
  else if (event.target.classList.contains("decrease-btn")) {
    let selectedItem = cart.find(function (item) {
      return item.id === itemId;
    });

    selectedItem.quantity--;

    // Remove item if quantity reaches zero
    if (selectedItem.quantity <= 0) {
      cart = cart.filter(function (item) {
        return item.id !== itemId;
      });
    }
  }

  // Remove item completely
  else if (event.target.classList.contains("remove-btn")) {
    cart = cart.filter(function (item) {
      return item.id !== itemId;
    });
  }

  saveCart();

  displayCart();
});

// Proceed to Checkout
checkoutButton.addEventListener("click", function () {
  if (cart.length > 0) {
    window.location.href = "checkout.html";
  }
});

// Display cart when page opens
displayCart();
