// Get dashboard elements
const totalOrders = document.getElementById("total-orders");
const newOrders = document.getElementById("new-orders");
const preparingOrders = document.getElementById("preparing-orders");
const readyOrders = document.getElementById("ready-orders");

const ordersList = document.getElementById("staff-orders-list");
const refreshButton = document.getElementById("refresh-orders");

// Current selected order filter
let currentFilter = "All";
// Search text
let searchText = "";

// Available order statuses
const statuses = ["Order Placed", "Preparing", "Ready for Pickup", "Completed"];

// Get orders from Local Storage
function getOrders() {
  return JSON.parse(localStorage.getItem("campusBiteOrderHistory")) || [];
}

// Save updated orders
function saveOrders(orders) {
  localStorage.setItem("campusBiteOrderHistory", JSON.stringify(orders));
}

// Update dashboard statistics
function updateStatistics(orders) {
  totalOrders.textContent = orders.length;

  newOrders.textContent = orders.filter(function (order) {
    return order.status === "Order Placed";
  }).length;

  preparingOrders.textContent = orders.filter(function (order) {
    return order.status === "Preparing";
  }).length;

  readyOrders.textContent = orders.filter(function (order) {
    return order.status === "Ready for Pickup";
  }).length;
}

// Display orders
function displayOrders() {
  let orders = getOrders();

  // Update statistics
  updateStatistics(orders);

  // Apply selected filter
  // Apply status filter
  let filteredOrders = orders.filter(function (order) {
    let matchesStatus =
      currentFilter === "All" || order.status === currentFilter;

    // Search customer name, token or phone
    let searchValue = searchText.toLowerCase();

    let matchesSearch =
      (order.customerName || "").toLowerCase().includes(searchValue) ||
      (order.customerEmail || "").toLowerCase().includes(searchValue) ||
      (order.token || "").toLowerCase().includes(searchValue) ||
      (order.customerPhone || "").toLowerCase().includes(searchValue);

    return matchesStatus && matchesSearch;
  });

  // Clear previous orders
  ordersList.innerHTML = "";

  // Show empty message
  if (filteredOrders.length === 0) {
    let emptyMessage = document.createElement("div");

    emptyMessage.className = "no-orders";

    if (currentFilter === "All") {
      emptyMessage.innerHTML = `
        <h3>No Orders Yet</h3>
        <p>Customer orders will appear here after checkout.</p>
      `;
    } else {
      emptyMessage.innerHTML = `
        <h3>No ${currentFilter} Orders</h3>
        <p>There are currently no orders in this category.</p>
      `;
    }

    ordersList.appendChild(emptyMessage);
    return;
  }

  // Display latest orders first
  filteredOrders
    .slice()
    .reverse()
    .forEach(function (order) {
      let orderCard = document.createElement("div");
      orderCard.className = "staff-order-card";

      // Order heading
      let heading = document.createElement("div");
      heading.className = "staff-order-top";

      let token = document.createElement("h3");
      token.textContent = order.token;

      let status = document.createElement("span");
      status.className = "staff-status";
      status.textContent = order.status;

      heading.appendChild(token);
      heading.appendChild(status);

      // Customer information
      let customerInfo = document.createElement("div");
      customerInfo.className = "staff-customer-info";

      let customer = document.createElement("p");
      customer.textContent = "Customer: " + order.customerName;
      let email = document.createElement("p");
      email.textContent = "Email: " + (order.customerEmail || "Not provided");
      let phone = document.createElement("p");
      phone.textContent = "Phone: " + order.customerPhone;

      let pickup = document.createElement("p");
      pickup.textContent = "Pickup Time: " + order.pickupTime;

      customerInfo.appendChild(customer);
      customerInfo.appendChild(email);
      customerInfo.appendChild(phone);
      customerInfo.appendChild(pickup);

      // Ordered items
      let itemsHeading = document.createElement("h4");
      itemsHeading.textContent = "Ordered Items";

      let itemsList = document.createElement("div");
      itemsList.className = "staff-items-list";

      order.items.forEach(function (item) {
        let itemRow = document.createElement("p");

        itemRow.textContent =
          item.name +
          " × " +
          item.quantity +
          " — Rs. " +
          item.price * item.quantity;

        itemsList.appendChild(itemRow);
      });

      // Total amount
      let total = document.createElement("p");
      total.className = "staff-order-total";
      total.textContent = "Total: Rs. " + order.totalAmount;

      // Status update button
      let actionArea = document.createElement("div");
      actionArea.className = "staff-order-actions";

      let currentIndex = statuses.indexOf(order.status);

      let updateButton = document.createElement("button");
      updateButton.className = "status-update-btn";

      if (currentIndex === -1) {
        updateButton.textContent = "Unknown Status";
        updateButton.disabled = true;
      } else if (currentIndex === statuses.length - 1) {
        updateButton.textContent = "Order Completed";
        updateButton.disabled = true;
      } else {
        updateButton.textContent =
          "Move to " + statuses[currentIndex + 1] + " →";

        updateButton.addEventListener("click", function () {
          updateOrderStatus(order.token);
        });
      }

      actionArea.appendChild(updateButton);

      // Add all elements to order card
      orderCard.appendChild(heading);
      orderCard.appendChild(customerInfo);
      orderCard.appendChild(itemsHeading);
      orderCard.appendChild(itemsList);
      orderCard.appendChild(total);
      orderCard.appendChild(actionArea);

      ordersList.appendChild(orderCard);
    });
}

// Update individual order status
function updateOrderStatus(token) {
  let orders = getOrders();

  let orderIndex = orders.findIndex(function (order) {
    return order.token === token;
  });

  if (orderIndex === -1) {
    alert("Order not found!");
    return;
  }

  let currentIndex = statuses.indexOf(orders[orderIndex].status);

  if (currentIndex < 0 || currentIndex >= statuses.length - 1) {
    return;
  }

  // Move to next status
  orders[orderIndex].status = statuses[currentIndex + 1];

  // Save updated order history
  saveOrders(orders);

  // Update current order if it is the same order
  let currentOrder = JSON.parse(localStorage.getItem("campusBiteCurrentOrder"));

  if (currentOrder && currentOrder.token === token) {
    currentOrder.status = orders[orderIndex].status;

    localStorage.setItem(
      "campusBiteCurrentOrder",
      JSON.stringify(currentOrder),
    );
  }

  // Refresh dashboard
  displayOrders();
}

// Refresh button
refreshButton.addEventListener("click", function () {
  displayOrders();
});

// Filter buttons
let filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    displayOrders();
  });
});

// Search orders
const searchInput = document.getElementById("search-orders");

searchInput.addEventListener("input", function () {
  searchText = searchInput.value.trim();
  displayOrders();
});
// Load orders when dashboard opens
displayOrders();
// Staff Logout
const logoutButton = document.getElementById("staff-logout");

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem("campusBiteStaffLoggedIn");

    window.location.href = "login.html";
  });
}
