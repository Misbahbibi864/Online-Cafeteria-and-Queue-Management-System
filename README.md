# 🍽️ CampusBite — Cafeteria Pre-Order and Queue Management System

CampusBite is a web-based cafeteria management system designed to simplify food ordering and reduce waiting time in university cafeterias. It allows students to browse food menus, place pre-orders, receive a unique order token, and track their order status. Staff can manage orders through a dedicated dashboard.

## ✨ Features

- **Customer Registration & Login:** Customers can create accounts and log in to access ordering features.
- **Food Menu:** Browse available food items and their prices.
- **Shopping Cart:** Sign in before adding items; update quantities and remove items from the cart.
- **Checkout:** Place orders and receive a unique order token.
- **Order Tracking:** Track orders through different preparation stages.
- **Staff Login:** Dedicated login for cafeteria staff.
- **Staff Dashboard:** View, search, filter, and manage customer orders.
- **Order Status Management:** Update orders from _Order Placed_ to _Preparing_, _Ready for Pickup_, and _Completed_.
- **Responsive Design:** User-friendly interface for different screen sizes.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Local Storage
- Session Storage
- Google Fonts (Poppins)

## 📂 Project Structure

```text
CampusBite/
│
├── index.html
│
├── pages/
│   ├── menu.html
│   ├── cart.html
│   ├── checkout.html
│   ├── tracking.html
│   ├── login.html
│   ├── register.html
│   └── staff-dashboard.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── menu.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── tracking.js
│   │   └── staff.js
│   │
│   └── images/          # Local food photos and CampusBite logo
│
├── data/
│   └── menu-data.js
│
└── README.md
```

## 🚀 How to Run

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if you do not already have it.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. Explore CampusBite in your browser.

## 🔐 Prototype Login

The project includes a prototype staff login:

- **Username:** `staff`
- **Password:** `12345`

Customer accounts can be created through the registration page. Customers must sign in before adding menu items to their cart; if they choose an item while signed out, they are sent to login and the selected item is added after a successful login.

## 🔮 Future Improvements

- Backend and database integration.
- Secure user authentication.
- Online payment integration.
- Real-time order notifications.
- Advanced queue management.

## 🎓 Project Information

**Project Name:** CampusBite — Cafeteria Pre-Order and Queue Management System

**Project Type:** University Software Engineering Project

**Developed By:** Misbah Bibi

**Degree Program:** BS Information Technology

This project is currently a frontend prototype. Local Storage and Session Storage are used to manage customer accounts, cart data, and orders within the browser. It does not yet include a backend database or production-level authentication.
