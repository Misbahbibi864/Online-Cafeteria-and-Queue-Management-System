# 🍽️ CampusBite — Cafeteria Pre-Order and Queue Management System

CampusBite is a web-based cafeteria system for university campuses. Students pre-order food online, receive a unique order token, and track their order while it is prepared. Cafeteria staff manage incoming orders from a dedicated dashboard, so students spend less time waiting in line.

> **Note:** This is a frontend prototype. All data (accounts, carts, orders) is stored in the browser using Local Storage and Session Storage. There is no backend or database yet.

## ✨ Features

### Customers
- **Registration & Login:** Create an account (name, email, phone, password) and log in.
- **Food Menu:** Browse 9 items across 5 categories (Burgers, Pizza, Sandwiches, Snacks, Drinks), with category filters and live search.
- **Login-Gated Cart:** Adding an item while signed out redirects to login; the selected item is added automatically after a successful login.
- **Shopping Cart:** Increase, decrease, or remove items; live item count and totals.
- **Checkout:** Details are pre-filled from the account. Choose a pickup time (8:00 AM – 9:00 PM, 30-minute slots), add optional notes, and pay by **Cash on Pickup**.
- **Order Token:** Every order gets a unique token in the format `CB-YYYYMMDD-XXXX`.
- **Order Tracking:** Look up an order by token, see a progress timeline, and view your own order history when logged in.

### Staff
- **Staff Login:** Separate login for cafeteria staff.
- **Staff Dashboard:** Live counts for total, new, preparing, and ready orders.
- **Search & Filter:** Search by customer name, email, phone, or token; filter by status.
- **Status Management:** Move each order through **Order Placed → Preparing → Ready for Pickup → Completed**.

### General
- Responsive layout with a mobile navigation menu.
- Local food photos and the CampusBite logo.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (vanilla)
- Local Storage & Session Storage
- Google Fonts (Poppins)

## 📂 Project Structure

```text
Cafeteria-Management-System/
│
├── index.html                 # Home page
├── README.md
│
├── pages/
│   ├── menu.html              # Food menu
│   ├── cart.html              # Shopping cart
│   ├── checkout.html          # Checkout and order confirmation
│   ├── tracking.html          # Order tracking and history
│   ├── login.html             # Customer and staff login
│   ├── register.html          # Customer registration
│   └── staff-dashboard.html   # Staff order management
│
├── assets/
│   ├── css/
│   │   └── style.css          # All styling
│   ├── js/
│   │   ├── app.js             # Navigation, registration, customer and staff login
│   │   ├── menu.js            # Menu display, search, filters, add to cart
│   │   ├── cart.js            # Cart management
│   │   ├── checkout.js        # Order placement and token generation
│   │   ├── tracking.js        # Order tracking and customer history
│   │   └── staff.js           # Staff dashboard logic
│   └── images/                # Food photos and logo
│
└── data/
    └── menu-data.js           # Menu items (name, category, price, image)
```

## 🚀 How to Run

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if you do not have it.
4. Right-click `index.html` and choose **Open with Live Server**.

No installation or build step is needed. Opening `index.html` directly in a browser also works.

## 🔐 Prototype Login

| Role     | Credentials                                       |
| -------- | ------------------------------------------------- |
| Staff    | Username: `staff` · Password: `12345`             |
| Customer | Create an account on the **Sign Up** page         |

## 🔄 How It Works

1. A customer registers and logs in.
2. They add items to the cart and go to checkout.
3. They choose a pickup time and place the order, then receive a token such as `CB-20261111-4821`.
4. Staff open the dashboard and move the order from *Order Placed* to *Preparing*, *Ready for Pickup*, and *Completed*.
5. The customer tracks progress using the token or their order history.

## ⚠️ Limitations

- Data is stored only in the current browser, so orders placed on one device do not appear on another. Staff and customers must use the same browser to see the same data.
- Passwords are stored in plain text, and the staff login is a hardcoded check. This is for demonstration only.
- Payment is limited to Cash on Pickup.

## 🔮 Future Improvements

- Backend and database integration (for example Node.js with a database).
- Secure authentication with password hashing and role-based access.
- Online payment integration.
- Real-time order notifications.
- Advanced queue management, such as queue position and estimated wait time.
- Admin dashboard for managing the menu and staff accounts.

## 🎓 Project Information

**Project Name:** CampusBite — Cafeteria Pre-Order and Queue Management System
**Project Type:** University Software Engineering Project
**Developed By:** Misbah Bibi
**Degree Program:** BS Information Technology
