// Mobile Navigation
let menuToggle = document.getElementById("menu-toggle");
let navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

// Staff Login
const staffLoginForm = document.getElementById("staff-login-form");

if (staffLoginForm) {
  staffLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("staff-username").value.trim();
    let password = document.getElementById("staff-password").value;

    let loginError = document.getElementById("login-error");

    if (username === "staff" && password === "12345") {
      sessionStorage.setItem("campusBiteStaffLoggedIn", "true");

      window.location.href = "staff-dashboard.html";
    } else {
      loginError.textContent = "Invalid username or password!";
    }
  });
}

// Customer Registration
const registerForm = document.getElementById("customer-register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    let name = document.getElementById("register-name").value.trim();
    let email = document
      .getElementById("register-email")
      .value.trim()
      .toLowerCase();
    let phone = document.getElementById("register-phone").value.trim();
    let password = document.getElementById("register-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    let registerError = document.getElementById("register-error");

    // Check password matching
    if (password !== confirmPassword) {
      registerError.textContent = "Passwords do not match!";
      return;
    }

    // Get existing customers
    let customers =
      JSON.parse(localStorage.getItem("campusBiteCustomers")) || [];

    // Check duplicate email
    let existingCustomer = customers.find(function (customer) {
      return customer.email === email;
    });

    if (existingCustomer) {
      registerError.textContent = "This email is already registered!";
      return;
    }

    // Create customer account
    let newCustomer = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    // Save customer account
    customers.push(newCustomer);

    localStorage.setItem("campusBiteCustomers", JSON.stringify(customers));

    alert("Account created successfully! Please log in.");

    window.location.href = "../pages/login.html";
  });
}

// Customer Login
const customerLoginForm = document.getElementById("customer-login-form");

if (customerLoginForm) {
  customerLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document
      .getElementById("customer-email")
      .value.trim()
      .toLowerCase();

    let password = document.getElementById("customer-password").value;

    let loginError = document.getElementById("login-error");

    // Get registered customers
    let customers =
      JSON.parse(localStorage.getItem("campusBiteCustomers")) || [];

    // Find matching account
    let customer = customers.find(function (account) {
      return account.email === email && account.password === password;
    });

    if (customer) {
      sessionStorage.setItem("campusBiteCustomerLoggedIn", "true");

      sessionStorage.setItem(
        "campusBiteCurrentCustomer",
        JSON.stringify({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        }),
      );

      const hasPendingCartItem = Boolean(
        sessionStorage.getItem("campusBitePendingCartItem"),
      );
      window.location.href = hasPendingCartItem
        ? "menu.html"
        : "../index.html";
    } else {
      loginError.textContent = "Invalid email or password!";
    }
  });
}

// Dynamic Customer Navigation
function updateCustomerNavigation() {
  const navActions = document.getElementById("nav-actions");

  if (!navActions) return;

  const isInsidePages = window.location.pathname.includes("/pages/");
  const pagePath = isInsidePages ? "" : "pages/";

  const isCartPage =
    window.location.pathname.endsWith("/menu.html") ||
    window.location.pathname.endsWith("/cart.html");

  const isLoggedIn =
    sessionStorage.getItem("campusBiteCustomerLoggedIn") === "true";

  const savedCustomer = sessionStorage.getItem("campusBiteCurrentCustomer");

  let cartLink = "";

  if (isCartPage) {
    cartLink = `
      <a href="cart.html" class="signup-btn">
        My Cart (<span id="cart-count">0</span>)
      </a>
    `;
  }

  if (isLoggedIn && savedCustomer) {
    const customer = JSON.parse(savedCustomer);

    navActions.innerHTML = `
      <span class="welcome-user">
        Welcome, ${customer.name}
      </span>

      ${cartLink}

      <button type="button" id="customer-logout" class="logout-btn">
        Logout
      </button>
    `;

    const logoutButton = document.getElementById("customer-logout");

    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("campusBiteCustomerLoggedIn");
      sessionStorage.removeItem("campusBiteCurrentCustomer");

      window.location.href = isInsidePages ? "../index.html" : "index.html";
    });
  } else {
    navActions.innerHTML = `
      <a href="${pagePath}login.html" class="login-btn">Login</a>
      ${cartLink}
      <a href="${pagePath}register.html" class="signup-btn">Sign Up</a>
    `;
  }
}

updateCustomerNavigation();
