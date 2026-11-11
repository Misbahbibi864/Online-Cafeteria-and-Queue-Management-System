// Get cart from Local Storage
let cart = JSON.parse(localStorage.getItem("campusBiteCart")) || [];

// Get HTML elements
const checkoutForm = document.getElementById("checkout-form");
const checkoutItems = document.getElementById("checkout-items");

const checkoutQuantity = document.getElementById("checkout-quantity");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutTotal = document.getElementById("checkout-total");

const checkoutContent = document.getElementById("checkout-content");
const confirmationSection = document.getElementById("order-confirmation");

// Calculate total quantity
function getTotalQuantity() {
  return cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);
}

// Calculate subtotal
function getSubtotal() {
  return cart.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);
}

// Display order summary
function displayCheckoutSummary() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add food items first.");

    window.location.href = "menu.html";

    return;
  }

  checkoutItems.innerHTML = "";

  cart.forEach(function (item) {
    let product = document.createElement("div");

    product.className = "checkout-product";

    product.innerHTML = `
            <span class="checkout-product-name">
                ${item.name} × ${item.quantity}
            </span>

            <span class="checkout-product-price">
                Rs. ${item.price * item.quantity}
            </span>
        `;

    checkoutItems.appendChild(product);
  });

  checkoutQuantity.textContent = getTotalQuantity();

  checkoutSubtotal.textContent = "Rs. " + getSubtotal();

  checkoutTotal.textContent = "Rs. " + getSubtotal();
}

// Generate one unique order token
function generateOrderToken() {
  let date = new Date();

  let datePart =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  let randomPart = Math.floor(1000 + Math.random() * 9000);

  return "CB-" + datePart + "-" + randomPart;
}

// Place order
checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Get customer information
  let customerName = document.getElementById("customer-name").value.trim();
  let customerEmail = document.getElementById("customer-email").value.trim();
  let customerPhone = document.getElementById("customer-phone").value.trim();

  let pickupTime = document.getElementById("pickup-time").value;

  let orderNotes = document.getElementById("order-notes").value.trim();

  // Get payment method
  let paymentMethod = document.querySelector(
    'input[name="payment"]:checked',
  ).value;

  // Generate one token for the complete order
  let orderToken = generateOrderToken();

  // Create one combined order
  let order = {
    token: orderToken,

    customerName: customerName,

    customerEmail: customerEmail,

    customerPhone: customerPhone,

    items: cart,

    totalQuantity: getTotalQuantity(),

    totalAmount: getSubtotal(),

    pickupTime: pickupTime,

    paymentMethod: paymentMethod,

    notes: orderNotes,

    status: "Order Placed",

    orderDate: new Date().toLocaleString(),
  };

  // Save current order
  localStorage.setItem("campusBiteCurrentOrder", JSON.stringify(order));

  // Save order in order history
  let orderHistory =
    JSON.parse(localStorage.getItem("campusBiteOrderHistory")) || [];

  orderHistory.push(order);

  localStorage.setItem("campusBiteOrderHistory", JSON.stringify(orderHistory));

  // Clear cart after successful order placement
  localStorage.removeItem("campusBiteCart");

  // Display confirmation
  checkoutContent.style.display = "none";

  confirmationSection.style.display = "block";

  document.getElementById("generated-token").textContent = orderToken;

  document.getElementById("confirmation-details").textContent =
    "Thank you, " +
    customerName +
    "! Your order of " +
    getTotalQuantity() +
    " items has been placed. Please collect it at " +
    pickupTime +
    " and pay by " +
    paymentMethod +
    ".";

  // Scroll to confirmation
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Load checkout summary
displayCheckoutSummary();
