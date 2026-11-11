// Get HTML elements
const trackingForm = document.getElementById("tracking-form");
const trackingToken = document.getElementById("tracking-token");
const trackingError = document.getElementById("tracking-error");
const trackingResult = document.getElementById("tracking-result");
const customerOrdersList = document.getElementById("customer-orders-list");

// Order status sequence
const orderStatuses = [
  "Order Placed",
  "Preparing",
  "Ready for Pickup",
  "Completed",
];

// Load customer order history
function displayCustomerOrders() {
  const savedCustomer = sessionStorage.getItem("campusBiteCurrentCustomer");

  customerOrdersList.innerHTML = "";

  // Check whether customer is logged in
  if (!savedCustomer) {
    customerOrdersList.innerHTML = `
      <div class="history-message">
        <p>Please log in to view your order history.</p>
        <a href="login.html">Login to Your Account</a>
      </div>
    `;
    return;
  }

  const customer = JSON.parse(savedCustomer);

  // Get all saved orders
  const orderHistory =
    JSON.parse(localStorage.getItem("campusBiteOrderHistory")) || [];

  // Only show orders belonging to this customer
  const customerOrders = orderHistory.filter(function (order) {
    return (
      (order.customerEmail || "").toLowerCase() === customer.email.toLowerCase()
    );
  });

  // Show message if customer has no orders
  if (customerOrders.length === 0) {
    customerOrdersList.innerHTML = `
      <div class="history-message">
        <p>You haven't placed any orders yet.</p>
        <a href="menu.html">Explore Our Menu</a>
      </div>
    `;
    return;
  }

  // Show latest orders first
  customerOrders.reverse().forEach(function (order) {
    const orderCard = document.createElement("div");
    orderCard.className = "customer-order-card";

    // Order heading
    const orderHeader = document.createElement("div");
    orderHeader.className = "customer-order-header";

    const token = document.createElement("h3");
    token.textContent = "Token: " + order.token;

    const status = document.createElement("span");
    status.className = "history-status";
    status.textContent = order.status;

    orderHeader.appendChild(token);
    orderHeader.appendChild(status);

    // Order items
    const items = document.createElement("p");
    items.className = "history-items";
    items.textContent =
      "Items: " +
      order.items
        .map(function (item) {
          return item.name + " × " + item.quantity;
        })
        .join(", ");

    // Order information
    const total = document.createElement("p");
    total.textContent = "Total Amount: Rs. " + order.totalAmount;

    const pickup = document.createElement("p");
    pickup.textContent = "Pickup Time: " + order.pickupTime;

    const date = document.createElement("p");
    date.textContent = "Order Date: " + (order.orderDate || "Not available");

    // Track button
    const trackButton = document.createElement("button");
    trackButton.type = "button";
    trackButton.className = "history-track-btn";
    trackButton.textContent = "Track This Order →";

    trackButton.addEventListener("click", function () {
      trackingToken.value = order.token;
      displayOrder(order);

      trackingError.textContent = "";
      trackingResult.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    // Add everything to card
    orderCard.appendChild(orderHeader);
    orderCard.appendChild(items);
    orderCard.appendChild(total);
    orderCard.appendChild(pickup);
    orderCard.appendChild(date);
    orderCard.appendChild(trackButton);

    customerOrdersList.appendChild(orderCard);
  });
}

// Search for an order using its token
trackingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredToken = trackingToken.value.trim().toUpperCase();

  trackingError.textContent = "";
  trackingResult.style.display = "none";

  const orderHistory =
    JSON.parse(localStorage.getItem("campusBiteOrderHistory")) || [];

  const foundOrder = orderHistory.find(function (order) {
    return order.token.toUpperCase() === enteredToken;
  });

  if (!foundOrder) {
    trackingError.textContent =
      "Order not found! Please check your token and try again.";
    return;
  }

  displayOrder(foundOrder);
});

// Display individual order details
function displayOrder(order) {
  trackingResult.style.display = "block";

  document.getElementById("result-token").textContent = order.token;
  document.getElementById("result-name").textContent = order.customerName;
  document.getElementById("result-pickup").textContent = order.pickupTime;
  document.getElementById("result-total").textContent =
    "Rs. " + order.totalAmount;

  // Display current status
  const currentStatus = order.status;

  document.getElementById("order-status-badge").textContent = currentStatus;

  // Update progress timeline
  const currentIndex = orderStatuses.indexOf(currentStatus);
  const progressSteps = document.querySelectorAll(".progress-step");

  progressSteps.forEach(function (step, index) {
    step.classList.remove("completed", "active");

    if (currentIndex >= 0 && index < currentIndex) {
      step.classList.add("completed");
    } else if (index === currentIndex) {
      step.classList.add("active");
    }
  });

  // Display ordered items
  const itemsContainer = document.getElementById("tracked-items-list");
  itemsContainer.innerHTML = "";

  order.items.forEach(function (item) {
    const itemRow = document.createElement("div");
    itemRow.className = "tracked-item";

    const itemName = document.createElement("span");
    itemName.textContent = item.name + " × " + item.quantity;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = "Rs. " + item.price * item.quantity;

    itemRow.appendChild(itemName);
    itemRow.appendChild(itemPrice);

    itemsContainer.appendChild(itemRow);
  });

  trackingResult.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Load order history when page opens
displayCustomerOrders();
