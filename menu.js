// Get HTML elements
const menuContainer = document.getElementById("menu-food-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("no-results");
const cartCount = document.getElementById("cart-count");

// Current selected category
let selectedCategory = "All";

// Get existing cart from Local Storage
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

// Display food items
function displayMenu(items) {
  menuContainer.innerHTML = "";

  if (items.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  items.forEach(function (item) {
    let foodCard = document.createElement("div");

    foodCard.className = "menu-food-card";

    foodCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="menu-food-details">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <div class="menu-food-bottom">

                    <span>Rs. ${item.price}</span>

                    <button class="add-cart-btn" data-id="${item.id}">
                        + Add to Cart
                    </button>

                </div>

            </div>
        `;

    menuContainer.appendChild(foodCard);
  });

  // Add click events to buttons
  const addButtons = document.querySelectorAll(".add-cart-btn");

  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let itemId = Number(this.dataset.id);

      addToCart(itemId);
    });
  });
}

// Add food to cart
function addToCart(itemId) {
  if (sessionStorage.getItem("campusBiteCustomerLoggedIn") !== "true") {
    sessionStorage.setItem("campusBitePendingCartItem", String(itemId));
    alert("Please log in to add items to your cart.");
    window.location.href = "login.html";
    return;
  }

  let selectedItem = menuData.find(function (item) {
    return item.id === itemId;
  });

  if (!selectedItem) {
    return;
  }

  let existingItem = cart.find(function (item) {
    return item.id === itemId;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...selectedItem,
      quantity: 1,
    });
  }

  // Save cart
  localStorage.setItem("campusBiteCart", JSON.stringify(cart));

  updateCartCount();
}

// Update cart count
function updateCartCount() {
  let totalItems = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}

// Filter food by category and search
function filterMenu() {
  let searchText = searchInput.value.toLowerCase();

  let filteredItems = menuData.filter(function (item) {
    let matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    let matchesSearch = item.name.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  displayMenu(filteredItems);
}

// Category buttons
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    this.classList.add("active");

    selectedCategory = this.dataset.category;

    filterMenu();
  });
});

// Search button
searchButton.addEventListener("click", filterMenu);

// Search while typing
searchInput.addEventListener("input", filterMenu);

// Initial display
displayMenu(menuData);

updateCartCount();

const pendingCartItem = sessionStorage.getItem("campusBitePendingCartItem");

if (pendingCartItem !== null) {
  sessionStorage.removeItem("campusBitePendingCartItem");
  addToCart(Number(pendingCartItem));
}
