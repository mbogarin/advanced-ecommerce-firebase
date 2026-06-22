# Advanced React E-Commerce Web Application

---

## Author

**Magali Bogarin**

GitHub: https://github.com/mbogarin

---

## Project Description

This project is an advanced e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, **React Query**, and **React Router**. It retrieves product data from the FakeStore API, allowing users to browse products, filter by category, manage a shopping cart, and complete a simulated checkout.

I chose these technologies to strengthen my understanding of modern React development. React Query was used to efficiently fetch and cache API data, while Redux Toolkit was used to manage the application's shopping cart state. TypeScript helped improve code readability and maintainability by providing type safety throughout the application.

In the future, I hope to continue expanding this project by adding user authentication, product search and sorting, wishlist functionality, order history, and a backend database for persistent user data.

### Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Query
- React Router
- FakeStore API

---

## Table of Contents

- [Project Description](#project-description)

- [Installation & Setup](#installation--setup)

- [Usage](#usage)

- [Roadmap](#roadmap)

- [Collaborators](#collaborators)

- [Project Structure](#project-structure)

---

## Installation & Setup

### 1. Clone the repository

```bash

git clone https://github.com/mbogarin/advanced-ecommerce.git

```

### 2. Navigate into the project directory

```bash

cd advanced-ecommerce

```

### 3. Install dependencies

```bash

npm install

```

### 4. Start the development server

```bash

npm run dev

```

### 5. Open the application

Open your browser and navigate to:

```text

http://localhost:5173

```

---

## Usage

### How It Works

- Products are fetched using React Query from FakeStore API
- Cart state is managed using Redux Toolkit
- Cart data is synced with sessionStorage for persistence
- Users can add/remove items and simulate checkout

#### After starting the application, users can:

- Browse products retrieved from the FakeStore API.
- Filter products by category using the dynamic dropdown menu.
- View product details including title, description, category, rating, image, and price.
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove products from the shopping cart.
- View the total number of products and total purchase price.
- Refresh the browser while keeping the shopping cart saved during the current session.
- Complete a simulated checkout, which clears both the shopping cart and sessionStorage.

## Roadmap

### Current Features

- Browse products from the FakeStore API
- Dynamic category filtering
- Product listing with images, descriptions, prices, and ratings
- Shopping cart using Redux Toolkit
- Update product quantities
- Remove products from the cart
- Calculate total items and total price
- Persist shopping cart using sessionStorage
- Simulated checkout
- Client-side routing with React Router

### Future Improvements

- User authentication
- Product search functionality
- Product sorting
- Wishlist functionality
- Order histor
- Backend database integration
- Payment processing
- Inventory management
- Responsive design enhancements
- Dark mode

---

## Collaborators

Currently this project was developed independently.

Future collaborators can be listed here:

### Credits

- Classmates and mentors at Coding Temple

---

## Project Structure

```bash
src/
├── api/
│   └── fakeStoreApi.ts
│
├── components/
│   └── ProductCard.tsx
│
├── pages/
│   ├── Home.tsx
│   └── Cart.tsx
│
├── redux/
│   ├── cartSlice.ts
│   └── store.ts
│
├── App.tsx
└── main.tsx
```

---

## Notes

This project is for educational purposes.
